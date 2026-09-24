import type { RouteObject } from 'react-router'

import { NotFoundPage } from '@/features/not-found/not-found-page'
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
  })
} satisfies Record<LocalizedPath, RouteObject['lazy']>

const routeFor = (path: LocalizedPath): RouteObject => ({
  lazy: pageFor[path],
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
