import type React from 'react'
import { useEffect, useRef } from 'react'
import {
  type NavigateOptions,
  Outlet,
  ScrollRestoration,
  useHref,
  useLocation,
  useMatches,
  useNavigate
} from 'react-router'

import { prefersReducedMotion } from '@/infrastructure/browser'
import { AppShell } from '@/presentation/app-shell'
import { focusMain } from '@/presentation/components/main'
import { RouterProvider } from '@/presentation/components/ui/router-provider'
import { SiteFooter } from '@/presentation/site-footer'
import { SiteHeader } from '@/presentation/site-header'

declare module 'react-aria-components' {
  interface RouterConfig {
    routerOptions: NavigateOptions
  }
}

const ignoreSupersededNavigation = (error: unknown): void => {
  if (error instanceof Error && error.name === 'AbortError') {
    return
  }

  throw error
}

const ABSOLUTE_URL = /^[a-z][a-z\d+.-]*:/i

const useRouterHref = (href: string): string => {
  const routeHref = useHref(href)

  return ABSOLUTE_URL.test(href) ? href : routeHref
}

const isBareHandle = (handle: unknown): boolean =>
  typeof handle === 'object' &&
  handle !== null &&
  'isBare' in handle &&
  handle.isBare === true

const useFocusMainOnNavigation = (): void => {
  const { pathname } = useLocation()
  const previousPathname = useRef(pathname)

  useEffect(() => {
    if (previousPathname.current === pathname) {
      return
    }

    previousPathname.current = pathname
    focusMain({ preventScroll: true })
  }, [pathname])
}

export const RootRoute: React.FC = () => {
  const navigate = useNavigate()
  useFocusMainOnNavigation()
  const isBare = useMatches().some((match) => isBareHandle(match.handle))

  return (
    <RouterProvider
      navigate={(path, options) => {
        void Promise.resolve(
          navigate(path, {
            viewTransition: !prefersReducedMotion(),
            ...options
          })
        ).catch(ignoreSupersededNavigation)
      }}
      useHref={useRouterHref}
    >
      <AppShell
        footer={isBare ? null : <SiteFooter />}
        header={isBare ? null : <SiteHeader />}
      >
        <Outlet />
      </AppShell>
      <ScrollRestoration />
    </RouterProvider>
  )
}
