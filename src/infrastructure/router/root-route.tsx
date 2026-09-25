import type React from 'react'
import {
  type NavigateOptions,
  Outlet,
  useHref,
  useNavigate
} from 'react-router'

import { AppShell } from '@/presentation/app-shell'
import { RouterProvider } from '@/presentation/components/ui/router-provider'

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

/**
 * react-aria's `RouterProvider` is what turns an `href` on any react-aria
 * `Link`, `MenuItem` or `ListBoxItem` into a client-side navigation.
 */
export const RootRoute: React.FC = () => {
  const navigate = useNavigate()

  return (
    <RouterProvider
      navigate={(path, options) => {
        void Promise.resolve(
          navigate(path, { viewTransition: true, ...options })
        ).catch(ignoreSupersededNavigation)
      }}
      useHref={useHref}
    >
      <AppShell>
        <Outlet />
      </AppShell>
    </RouterProvider>
  )
}
