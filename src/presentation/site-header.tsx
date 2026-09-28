import type React from 'react'

import {
  homePathFor,
  projectsPathFor,
  useCurrentPath,
  useLocalizedCurrentPath
} from '@/infrastructure/router/navigation'
import { Link } from '@/presentation/components/ui/link'
import { useI18n } from '@/presentation/i18n/i18n-provider'
import type { Locale } from '@/presentation/i18n/locale'
import { ThemeSwitch } from '@/presentation/theme/theme-switch'

import './site-header.sass'

const OTHER_LOCALE: Record<Locale, Locale> = { en: 'fr', fr: 'en' }

/** Printed on the lid's own field, so on the home page the two read as one. */
export const SiteHeader: React.FC = () => {
  const { locale, translate } = useI18n()
  const currentPath = useCurrentPath()
  const otherLocale = OTHER_LOCALE[locale]
  const otherLocalePath = useLocalizedCurrentPath(otherLocale)
  const homePath = homePathFor(locale)
  const projectsPath = projectsPathFor(locale)

  return (
    <header className='site-header'>
      <Link
        aria-label={translate('header.home')}
        className='monogram'
        href={homePath}
        isCurrent={currentPath === homePath}
      >
        AL
      </Link>
      <nav aria-label={translate('header.navigation')} className='site-nav'>
        <Link href={projectsPath} isCurrent={currentPath === projectsPath}>
          {translate('header.projects')}
        </Link>
        {otherLocalePath !== null && (
          <Link
            href={otherLocalePath}
            hrefLang={otherLocale}
            lang={otherLocale}
            routerOptions={{ replace: true }}
          >
            {translate('header.otherLocale')}
          </Link>
        )}
      </nav>
      <ThemeSwitch />
    </header>
  )
}
