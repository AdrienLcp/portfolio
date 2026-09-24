import type React from 'react'
import {
  type NavigateOptions,
  Outlet,
  useHref,
  useNavigate
} from 'react-router'

import { AppShell } from '@/presentation/app-shell'
import { RouterProvider } from '@/presentation/components/router-provider'

declare module 'react-aria-components' {
  interface RouterConfig {
    routerOptions: NavigateOptions
  }
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
        void navigate(path, options)
      }}
      useHref={useHref}
    >
      <AppShell>
        <Outlet />
      </AppShell>
    </RouterProvider>
  )
}
