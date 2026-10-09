import type React from 'react'
import { Link as ReactAriaLink } from 'react-aria-components'

import {
  aboutPathFor,
  contactPathFor,
  cvPathFor,
  homePathFor,
  projectsPathFor,
  useCurrentPath
} from '@/infrastructure/router/navigation'
import { ariaCurrentLeftOutOfLinkProps } from '@/presentation/components/ui/link-quirks'
import { useI18n } from '@/presentation/i18n/i18n-provider'
import { LocaleSwitch } from '@/presentation/locale-switch'
import { SkipLink } from '@/presentation/skip-link'
import { ThemeSwitch } from '@/presentation/theme/theme-switch'

import './site-header.sass'

type Page = {
  label: string
  path: string
}

/**
 * The name, four pages, then language and theme. Below 640px the pages drop to
 * a row of their own rather than into a menu: four short words still fit.
 */
export const SiteHeader: React.FC = () => {
  const { locale, translate } = useI18n()
  const currentPath = useCurrentPath()
  const homePath = homePathFor(locale)
  const pages: Page[] = [
    { label: translate('header.projects'), path: projectsPathFor(locale) },
    { label: translate('header.about'), path: aboutPathFor(locale) },
    { label: translate('header.contact'), path: contactPathFor(locale) },
    { label: translate('header.cv'), path: cvPathFor(locale) }
  ]

  return (
    <header className='site-header'>
      <SkipLink />
      <div className='site-header-bar'>
        <ReactAriaLink
          {...ariaCurrentLeftOutOfLinkProps(currentPath === homePath, 'page')}
          aria-label={translate('header.home')}
          className='site-brand'
          href={homePath}
        >
          {translate('header.name')}
        </ReactAriaLink>
        <nav aria-label={translate('header.navigation')} className='site-nav'>
          <ul>
            {pages.map((page) => (
              <li key={page.path}>
                <ReactAriaLink
                  {...ariaCurrentLeftOutOfLinkProps(
                    currentPath === page.path,
                    'page'
                  )}
                  className='site-nav-link'
                  href={page.path}
                >
                  {page.label}
                </ReactAriaLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className='site-controls'>
          <LocaleSwitch />
          <ThemeSwitch />
        </div>
      </div>
    </header>
  )
}
