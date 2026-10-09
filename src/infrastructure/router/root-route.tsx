import { AriaRouterProvider } from '@adrienlcp/react-router'
import type React from 'react'
import { useEffect, useRef } from 'react'
import {
  Outlet,
  ScrollRestoration,
  useLocation,
  useMatches
} from 'react-router'

import { localizeProfile } from '@/features/profile/profile'
import { PROFILE } from '@/features/profile/profile-content'
import { currentYear } from '@/infrastructure/clock'
import { useRouteData } from '@/infrastructure/router/navigation'
import { AppShell } from '@/presentation/app-shell'
import { focusMain } from '@/presentation/components/main'
import { useHydrationMark } from '@/presentation/hydration-mark'
import { i18n } from '@/presentation/i18n/i18n'
import type { Locale } from '@/presentation/i18n/locale'
import { PageTransition } from '@/presentation/page-transition'
import { SiteFooter } from '@/presentation/site-footer'
import { SiteHeader } from '@/presentation/site-header'

/**
 * What every page's frame shows, whichever page is inside it, once the
 * locale's dictionary is in hand.
 */
export const rootLoader = async ({ locale }: { locale: Locale }) => {
  await i18n.load(locale)

  return { profile: localizeProfile(PROFILE, locale) }
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

export const RootRoute: React.FC = () => {
  useHydrationMark()
  useFocusMainOnNavigation()
  const isBare = useMatches().some((match) => isBareHandle(match.handle))
  const { profile } = useRouteData<typeof rootLoader>()

  return (
    <AriaRouterProvider>
      <AppShell
        footer={
          isBare ? null : <SiteFooter profile={profile} year={currentYear()} />
        }
        header={isBare ? null : <SiteHeader />}
      >
        <PageTransition>
          <Outlet />
        </PageTransition>
      </AppShell>
      <ScrollRestoration />
    </AriaRouterProvider>
  )
}
