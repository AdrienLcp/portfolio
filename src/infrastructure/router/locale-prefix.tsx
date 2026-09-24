import type React from 'react'
import { useLayoutEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router'

import {
  localeInPath,
  localizedPathFor
} from '@/infrastructure/router/navigation'
import { useI18n } from '@/presentation/i18n/i18n-provider'

export const NegotiatedLocaleRedirect: React.FC = () => {
  const { locale } = useI18n()
  const { pathname } = useLocation()

  return <Navigate replace to={localizedPathFor({ locale, pathname })} />
}

/**
 * The URL decides the language. `useLocation` rather than `useParams`: a
 * pathless layout has matched no param yet, and would read the locale as
 * absent and redirect forever.
 */
export const LocalePrefixedRoutes: React.FC = () => {
  const { pathname } = useLocation()
  const localeInUrl = localeInPath(pathname)
  const { locale, setLocale } = useI18n()

  // Back across `/fr` → `/en` moves the URL without the switch that moved it;
  // before paint, or the language just left shows for a frame.
  useLayoutEffect(() => {
    if (localeInUrl !== null && localeInUrl !== locale) {
      setLocale(localeInUrl)
    }
  }, [locale, localeInUrl, setLocale])

  if (localeInUrl === null) {
    return <NegotiatedLocaleRedirect />
  }

  return <Outlet />
}
