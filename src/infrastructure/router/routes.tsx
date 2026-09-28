import type { LoaderFunction, RouteObject } from 'react-router'

import { NotFoundPage } from '@/features/not-found/not-found-page'
import { projectLoader, projectsLoader } from '@/infrastructure/router/loaders'
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
  [localizedPaths.home]: projectsLoader,
  [localizedPaths.project]: projectLoader,
  [localizedPaths.projects]: projectsLoader
} satisfies Record<LocalizedPath, LoaderFunction>

const routeFor = (path: LocalizedPath): RouteObject => ({
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
