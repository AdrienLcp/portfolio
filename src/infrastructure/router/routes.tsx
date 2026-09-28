import type { LoaderFunction, RouteObject } from 'react-router'

import { NotFoundPage } from '@/features/not-found/not-found-page'
import {
  aboutLoader,
  cvLoader,
  projectLoader,
  projectsLoader
} from '@/infrastructure/router/loaders'
import {
  LocalePrefixedRoutes,
  NegotiatedLocaleRedirect
} from '@/infrastructure/router/locale-prefix'
import { localizedPaths } from '@/infrastructure/router/navigation'
import { RootRoute } from '@/infrastructure/router/root-route'
import { ErrorScreen } from '@/presentation/error-screen'
import { RouteFallback } from '@/presentation/route-fallback'

export type LocalizedPath = (typeof localizedPaths)[keyof typeof localizedPaths]

type LazyPage = {
  lazy: RouteObject['lazy']
  /** How Vite's build manifest keys the chunk, which the prerender reads to inline its stylesheet. */
  module: string
}

/** Keyed by path, so a path with no page fails to compile. */
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

/** Outside `lazy`, so the data starts downloading beside the page's chunk. */
const loaderFor = {
  [localizedPaths.about]: aboutLoader,
  [localizedPaths.contact]: cvLoader,
  [localizedPaths.cv]: cvLoader,
  [localizedPaths.cvPlain]: cvLoader,
  [localizedPaths.home]: projectsLoader,
  [localizedPaths.project]: projectLoader,
  [localizedPaths.projects]: projectsLoader
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
    HydrateFallback: RouteFallback
  }
]
