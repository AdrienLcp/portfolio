import { prefersReducedMotion } from '@adrienlcp/browser'
import { AriaRouterProvider } from '@adrienlcp/react-router'
import type React from 'react'
import { useEffect, useRef } from 'react'
import {
  Outlet,
  ScrollRestoration,
  useLocation,
  useMatches
} from 'react-router'

import { fetchProfile } from '@/features/profile/profile-api'
import { currentYear } from '@/infrastructure/clock'
import { useRouteData } from '@/infrastructure/router/navigation'
import { AppShell } from '@/presentation/app-shell'
import { focusMain } from '@/presentation/components/main'
import type { Locale } from '@/presentation/i18n/locale'
import { SiteFooter } from '@/presentation/site-footer'
import { SiteHeader } from '@/presentation/site-header'

/** What every page's frame shows, whichever page is inside it. */
export const rootLoader = (locale: Locale) => ({
  profile: fetchProfile(locale)
})

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

export const RootRoute: React.FC = () => {
  useFocusMainOnNavigation()
  const isBare = useMatches().some((match) => isBareHandle(match.handle))
  const { profile } = useRouteData<typeof rootLoader>()

  return (
    <AriaRouterProvider
      navigateDefaults={() => ({ viewTransition: !prefersReducedMotion() })}
    >
      <AppShell
        footer={
          isBare ? null : <SiteFooter profile={profile} year={currentYear()} />
        }
        header={isBare ? null : <SiteHeader />}
      >
        <Outlet />
      </AppShell>
      <ScrollRestoration />
    </AriaRouterProvider>
  )
}
