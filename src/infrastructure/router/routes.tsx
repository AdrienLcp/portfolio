import type { LoaderFunction, Params, RouteObject } from 'react-router'

import { NotFoundPage } from '@/features/not-found/not-found-page'
import { LocalePrefixedRoutes } from '@/infrastructure/router/locale-prefixed-routes'
import { localizedPaths } from '@/infrastructure/router/navigation'
import { NegotiatedLocaleRedirect } from '@/infrastructure/router/negotiated-locale-redirect'
import { RootRoute, rootLoader } from '@/infrastructure/router/root-route'
import { ErrorScreen } from '@/presentation/error-screen'
import {
  DEFAULT_LOCALE,
  isLocale,
  type Locale
} from '@/presentation/i18n/locale'
import { RouteFallback } from '@/presentation/route-fallback'

type LocalizedPath = (typeof localizedPaths)[keyof typeof localizedPaths]

type LazyPage = {
  lazy: RouteObject['lazy']
  /**
   * How Vite's build manifest keys the chunk, which the prerender reads to inline
   * its stylesheet.
   */
  module: string
  /** The loader's own module, imported on demand beside the page's chunk. */
  loaderModule: string
}

/** Keyed by path, so a path with no page fails to compile. */
const pageFor = {
  [localizedPaths.about]: {
    lazy: async () => ({
      Component: (await import('@/features/about/presentation/about-page'))
        .AboutPage
    }),
    loaderModule: 'src/features/about/infrastructure/about-loader.ts',
    module: 'src/features/about/presentation/about-page.tsx'
  },
  [localizedPaths.contact]: {
    lazy: async () => ({
      Component: (await import('@/features/contact/contact-page')).ContactPage
    }),
    loaderModule: 'src/features/contact/contact-loader.ts',
    module: 'src/features/contact/contact-page.tsx'
  },
  [localizedPaths.cv]: {
    lazy: async () => ({
      Component: (await import('@/features/cv-pages/cv-page')).CvPage
    }),
    loaderModule: 'src/features/cv-pages/cv-loader.ts',
    module: 'src/features/cv-pages/cv-page.tsx'
  },
  [localizedPaths.cvPlain]: {
    lazy: async () => ({
      Component: (await import('@/features/cv-pages/cv-plain-page')).CvPlainPage
    }),
    loaderModule: 'src/features/cv-pages/cv-loader.ts',
    module: 'src/features/cv-pages/cv-plain-page.tsx'
  },
  [localizedPaths.home]: {
    lazy: async () => ({
      Component: (await import('@/features/home/home-page')).HomePage
    }),
    loaderModule: 'src/features/home/home-loader.ts',
    module: 'src/features/home/home-page.tsx'
  },
  [localizedPaths.project]: {
    lazy: async () => ({
      Component: (await import('@/features/project-pages/project-page'))
        .ProjectPage
    }),
    loaderModule: 'src/features/project-pages/project-loader.ts',
    module: 'src/features/project-pages/project-page.tsx'
  }
} satisfies Record<LocalizedPath, LazyPage>

export const pageModuleFor = (path: LocalizedPath): string =>
  pageFor[path].module

export const loaderModuleFor = (path: LocalizedPath): string =>
  pageFor[path].loaderModule

/**
 * A path whose first segment is no locale still runs its loader before
 * `LocalePrefixedRoutes` redirects it, so the loader needs a locale to use.
 */
const localeParam = ({ locale }: Params): Locale =>
  locale !== undefined && isLocale(locale) ? locale : DEFAULT_LOCALE

/**
 * Outside `lazy`, so the data starts downloading beside the page's chunk.
 * Imported on demand rather than at the top, so each page downloads its own
 * content and not every other page's.
 *
 * Loaders hand back their promise unawaited: the navigation commits at once and
 * only the region that reads it suspends.
 */
/**
 * A superseded navigation's requests reject with its abort, and react-router
 * drops its data unread: without a handler, each rejection would be reported
 * as unhandled. The page that does read a request still sees how it settled.
 */
const settledUnread = <TRequests extends Record<string, Promise<unknown>>>(
  requests: TRequests
): TRequests => {
  for (const request of Object.values(requests)) {
    request.catch(() => undefined)
  }

  return requests
}

const loaderFor = {
  [localizedPaths.about]: async ({ params, request }) =>
    (await import('@/features/about/infrastructure/about-loader')).aboutLoader({
      locale: localeParam(params),
      signal: request.signal
    }),
  [localizedPaths.contact]: async ({ params, request }) =>
    (await import('@/features/contact/contact-loader')).contactLoader({
      locale: localeParam(params),
      signal: request.signal
    }),
  [localizedPaths.cv]: async ({ params, request }) =>
    (await import('@/features/cv-pages/cv-loader')).cvLoader({
      locale: localeParam(params),
      signal: request.signal
    }),
  [localizedPaths.cvPlain]: async ({ params, request }) =>
    (await import('@/features/cv-pages/cv-loader')).cvLoader({
      locale: localeParam(params),
      signal: request.signal
    }),
  [localizedPaths.home]: async ({ params, request }) =>
    (await import('@/features/home/home-loader')).homeLoader({
      locale: localeParam(params),
      signal: request.signal
    }),
  [localizedPaths.project]: async ({ params, request }) =>
    (await import('@/features/project-pages/project-loader')).projectLoader({
      locale: localeParam(params),
      signal: request.signal,
      slug: params.slug ?? ''
    })
} satisfies Record<LocalizedPath, LoaderFunction>

/** Pages printed bare, without the site's header and footer. */
const BARE_PATHS: ReadonlySet<LocalizedPath> = new Set([localizedPaths.cvPlain])

const routeFor = (path: LocalizedPath): RouteObject => ({
  handle: { isBare: BARE_PATHS.has(path) },
  lazy: pageFor[path].lazy,
  loader: async (args) => settledUnread(await loaderFor[path](args)),
  path
})

/** The tree, not a router: the prerender mounts the same one. */
export const routes: RouteObject[] = [
  {
    Component: RootRoute,
    children: [
      { Component: NegotiatedLocaleRedirect, index: true },
      {
        Component: LocalePrefixedRoutes,
        children: Object.values(localizedPaths).map(routeFor)
      },
      { Component: NotFoundPage, path: '*' }
    ],
    ErrorBoundary: ErrorScreen,
    HydrateFallback: RouteFallback,
    loader: ({ params, request }) =>
      settledUnread(
        rootLoader({ locale: localeParam(params), signal: request.signal })
      ),
    shouldRevalidate: ({ currentParams, nextParams }) =>
      currentParams.locale !== nextParams.locale
  }
]
