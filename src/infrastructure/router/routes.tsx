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

type LocalizedPath = (typeof localizedPaths)[keyof typeof localizedPaths]

/** Keyed by path, so a path with no page fails to compile. */
const pageFor = {
  [localizedPaths.about]: async () => ({
    Component: (await import('@/features/about/about-page')).AboutPage
  }),
  [localizedPaths.contact]: async () => ({
    Component: (await import('@/features/contact/contact-page')).ContactPage
  }),
  [localizedPaths.cv]: async () => ({
    Component: (await import('@/features/cv/cv-page')).CvPage
  }),
  [localizedPaths.cvPlain]: async () => ({
    Component: (await import('@/features/cv/cv-plain-page')).CvPlainPage
  }),
  [localizedPaths.home]: async () => ({
    Component: (await import('@/features/home/home-page')).HomePage
  }),
  [localizedPaths.project]: async () => ({
    Component: (await import('@/features/projects/project-page')).ProjectPage
  }),
  [localizedPaths.projects]: async () => ({
    Component: (await import('@/features/projects/projects-page')).ProjectsPage
  })
} satisfies Record<LocalizedPath, RouteObject['lazy']>

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
  lazy: pageFor[path],
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
