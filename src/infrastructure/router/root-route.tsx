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
import { currentYear } from '@/infrastructure/clock'
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

/**
 * A navigation superseded by the next one rejects with `AbortError`, more
 * often with view transitions on: expected control flow, not a failure.
 */
const ignoreSupersededNavigation = (error: unknown): void => {
  if (error instanceof Error && error.name === 'AbortError') {
    return
  }

  throw error
}

const ABSOLUTE_URL = /^[a-z][a-z\d+.-]*:/i

/**
 * react-router resolves every href against the current route, an external URL
 * included: `https://…` would come out as `/en/projects/https:/…`.
 */
const useRouterHref = (href: string): string => {
  const routeHref = useHref(href)

  return ABSOLUTE_URL.test(href) ? href : routeHref
}

const isBareHandle = (handle: unknown): boolean =>
  typeof handle === 'object' &&
  handle !== null &&
  'isBare' in handle &&
  handle.isBare === true

/**
 * A client-side navigation leaves focus on the link that started it, in a
 * header that did not change: the new page is announced by nothing, and the
 * next Tab walks the header again. Focus moves to the new page instead; the
 * first render is a full load, where it starts at the top on its own.
 */
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

/**
 * react-aria's `RouterProvider` is what turns an `href` on any react-aria
 * `Link`, `MenuItem` or `ListBoxItem` into a client-side navigation.
 */
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
        footer={isBare ? null : <SiteFooter year={currentYear()} />}
        header={isBare ? null : <SiteHeader />}
      >
        <Outlet />
      </AppShell>
      <ScrollRestoration />
    </RouterProvider>
  )
}
