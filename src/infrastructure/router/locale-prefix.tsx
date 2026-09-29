import type React from 'react'
import { useLayoutEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router'

import {
  localeInPath,
  localizedPathFor
} from '@/infrastructure/router/navigation'
import { useI18n } from '@/presentation/i18n/i18n-provider'
import type { Locale } from '@/presentation/i18n/locale'

export const NegotiatedLocaleRedirect: React.FC = () => {
  const { locale } = useI18n()
  const { pathname } = useLocation()

  return <Navigate replace to={localizedPathFor({ locale, pathname })} />
}

const useAdoptUrlLocaleBeforePaint = (localeInUrl: Locale | null): void => {
  const { locale, setLocale } = useI18n()

  useLayoutEffect(() => {
    if (localeInUrl !== null && localeInUrl !== locale) {
      setLocale(localeInUrl)
    }
  }, [locale, localeInUrl, setLocale])
}

export const LocalePrefixedRoutes: React.FC = () => {
  const { pathname } = useLocation()
  const localeInUrl = localeInPath(pathname)

  useAdoptUrlLocaleBeforePaint(localeInUrl)

  if (localeInUrl === null) {
    return <NegotiatedLocaleRedirect />
  }

  return <Outlet />
}
