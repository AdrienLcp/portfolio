import type { LoaderFunction, Params, RouteObject } from 'react-router'

import { aboutLoader } from '@/features/about/about-loader'
import { contactLoader } from '@/features/contact/contact-loader'
import { cvLoader } from '@/features/cv/cv-loader'
import { homeLoader } from '@/features/home/home-loader'
import { NotFoundPage } from '@/features/not-found/not-found-page'
import { projectLoader } from '@/features/projects/project-loader'
import { projectsLoader } from '@/features/projects/projects-loader'
import { LocalePrefixedRoutes } from '@/infrastructure/router/locale-prefixed-routes'
import { localizedPaths } from '@/infrastructure/router/navigation'
import { NegotiatedLocaleRedirect } from '@/infrastructure/router/negotiated-locale-redirect'
import { RootRoute } from '@/infrastructure/router/root-route'
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
  module: string
}

const pageFor = {
  [localizedPaths.about]: {
    lazy: async () => ({
      Component: (await import('@/features/about/about-page')).AboutPage
    }),
    module: 'src/features/about/about-page.tsx'
  },
  [localizedPaths.contact]: {
    lazy: async () => ({
      Component: (await import('@/features/contact/contact-page')).ContactPage
    }),
    module: 'src/features/contact/contact-page.tsx'
  },
  [localizedPaths.cv]: {
    lazy: async () => ({
      Component: (await import('@/features/cv/cv-page')).CvPage
    }),
    module: 'src/features/cv/cv-page.tsx'
  },
  [localizedPaths.cvPlain]: {
    lazy: async () => ({
      Component: (await import('@/features/cv/cv-plain-page')).CvPlainPage
    }),
    module: 'src/features/cv/cv-plain-page.tsx'
  },
  [localizedPaths.home]: {
    lazy: async () => ({
      Component: (await import('@/features/home/home-page')).HomePage
    }),
    module: 'src/features/home/home-page.tsx'
  },
  [localizedPaths.project]: {
    lazy: async () => ({
      Component: (await import('@/features/projects/project-page')).ProjectPage
    }),
    module: 'src/features/projects/project-page.tsx'
  },
  [localizedPaths.projects]: {
    lazy: async () => ({
      Component: (await import('@/features/projects/projects-page'))
        .ProjectsPage
    }),
    module: 'src/features/projects/projects-page.tsx'
  }
} satisfies Record<LocalizedPath, LazyPage>

export const pageModuleFor = (path: LocalizedPath): string =>
  pageFor[path].module

const localeParam = ({ locale }: Params): Locale =>
  locale !== undefined && isLocale(locale) ? locale : DEFAULT_LOCALE

const loaderFor = {
  [localizedPaths.about]: ({ params }) => aboutLoader(localeParam(params)),
  [localizedPaths.contact]: ({ params }) => contactLoader(localeParam(params)),
  [localizedPaths.cv]: ({ params }) => cvLoader(localeParam(params)),
  [localizedPaths.cvPlain]: ({ params }) => cvLoader(localeParam(params)),
  [localizedPaths.home]: ({ params }) => homeLoader(localeParam(params)),
  [localizedPaths.project]: ({ params }) =>
    projectLoader({ locale: localeParam(params), slug: params.slug ?? '' }),
  [localizedPaths.projects]: ({ params }) => projectsLoader(localeParam(params))
} satisfies Record<LocalizedPath, LoaderFunction>

const BARE_PATHS: ReadonlySet<LocalizedPath> = new Set([localizedPaths.cvPlain])

const routeFor = (path: LocalizedPath): RouteObject => ({
  handle: { isBare: BARE_PATHS.has(path) },
  lazy: pageFor[path].lazy,
  loader: loaderFor[path],
  path
})

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
    HydrateFallback: RouteFallback
  }
]
