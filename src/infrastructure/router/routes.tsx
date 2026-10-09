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
}

/** Keyed by path, so a path with no page fails to compile. */
const pageFor = {
  [localizedPaths.about]: {
    lazy: async () => ({
      Component: (await import('@/features/about/presentation/about-page'))
        .AboutPage
    }),
    module: 'src/features/about/presentation/about-page.tsx'
  },
  [localizedPaths.contact]: {
    lazy: async () => ({
      Component: (await import('@/features/contact/contact-page')).ContactPage
    }),
    module: 'src/features/contact/contact-page.tsx'
  },
  [localizedPaths.cv]: {
    lazy: async () => ({
      Component: (await import('@/features/cv-pages/cv-page')).CvPage
    }),
    module: 'src/features/cv-pages/cv-page.tsx'
  },
  [localizedPaths.cvPlain]: {
    lazy: async () => ({
      Component: (await import('@/features/cv-pages/cv-plain-page')).CvPlainPage
    }),
    module: 'src/features/cv-pages/cv-plain-page.tsx'
  },
  [localizedPaths.home]: {
    lazy: async () => ({
      Component: (await import('@/features/home/home-page')).HomePage
    }),
    module: 'src/features/home/home-page.tsx'
  },
  [localizedPaths.project]: {
    lazy: async () => ({
      Component: (await import('@/features/project-pages/project-page'))
        .ProjectPage
    }),
    module: 'src/features/project-pages/project-page.tsx'
  }
} satisfies Record<LocalizedPath, LazyPage>

export const pageModuleFor = (path: LocalizedPath): string =>
  pageFor[path].module

/**
 * A path whose first segment is no locale still runs its loader before
 * `LocalePrefixedRoutes` redirects it, so the loader needs a locale to use.
 */
const localeParam = ({ locale }: Params): Locale =>
  locale !== undefined && isLocale(locale) ? locale : DEFAULT_LOCALE

/**
 * Outside `lazy`, so the data starts downloading beside the page's chunk.
 * Imported on demand rather than at the top, so each page downloads its own
 * content and not every other page's. A loader resolves its data before the
 * navigation commits, so a page renders it at once and never suspends.
 */
const loaderFor = {
  [localizedPaths.about]: async ({ params }) =>
    (await import('@/features/about/infrastructure/about-loader')).aboutLoader({
      locale: localeParam(params)
    }),
  [localizedPaths.contact]: async ({ params }) =>
    (await import('@/features/contact/contact-loader')).contactLoader({
      locale: localeParam(params)
    }),
  [localizedPaths.cv]: async ({ params }) =>
    (await import('@/features/cv-pages/cv-loader')).cvLoader({
      locale: localeParam(params)
    }),
  [localizedPaths.cvPlain]: async ({ params }) =>
    (await import('@/features/cv-pages/cv-loader')).cvLoader({
      locale: localeParam(params)
    }),
  [localizedPaths.home]: async ({ params }) =>
    (await import('@/features/home/home-loader')).homeLoader({
      locale: localeParam(params)
    }),
  [localizedPaths.project]: async ({ params }) =>
    (await import('@/features/project-pages/project-loader')).projectLoader({
      locale: localeParam(params),
      slug: params.slug ?? ''
    })
} satisfies Record<LocalizedPath, LoaderFunction>

/** Pages printed bare, without the site's header and footer. */
const BARE_PATHS: ReadonlySet<LocalizedPath> = new Set([localizedPaths.cvPlain])

const routeFor = (path: LocalizedPath): RouteObject => ({
  handle: { isBare: BARE_PATHS.has(path) },
  lazy: pageFor[path].lazy,
  loader: loaderFor[path],
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
    loader: ({ params }) => rootLoader({ locale: localeParam(params) }),
    shouldRevalidate: ({ currentParams, nextParams }) =>
      currentParams.locale !== nextParams.locale
  }
]
