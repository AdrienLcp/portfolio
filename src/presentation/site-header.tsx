import type React from 'react'
import { useState } from 'react'
import {
  Button as ReactAriaButton,
  Link as ReactAriaLink
} from 'react-aria-components'

import {
  aboutPathFor,
  contactPathFor,
  cvPathFor,
  homePathFor,
  projectsPathFor,
  useCurrentPath
} from '@/infrastructure/router/navigation'
import { DialogTrigger } from '@/presentation/components/ui/dialog-trigger'
import { ariaCurrentLeftOutOfLinkProps } from '@/presentation/components/ui/link-quirks'
import { Popover } from '@/presentation/components/ui/popover'
import { useI18n } from '@/presentation/i18n/i18n-provider'
import { LocaleSwitch } from '@/presentation/locale-switch'
import { SkipLink } from '@/presentation/skip-link'
import { ThemeSwitch } from '@/presentation/theme/theme-switch'

import './site-header.sass'

type Page = {
  label: string
  path: string
}

type PageLinksProps = {
  currentPath: string
  onNavigate?: () => void
  pages: Page[]
}

const PageLinks: React.FC<PageLinksProps> = ({
  currentPath,
  onNavigate,
  pages
}) =>
  pages.map((page) => (
    <ReactAriaLink
      {...ariaCurrentLeftOutOfLinkProps(currentPath === page.path, 'page')}
      className='running-link'
      href={page.path}
      key={page.path}
      onPress={onNavigate}
    >
      {page.label}
    </ReactAriaLink>
  ))

/** Below 900px the page links fold into a sheet dropped from the header. */
const MenuSheet: React.FC<Omit<PageLinksProps, 'onNavigate'>> = (props) => {
  const { translate } = useI18n()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
      <ReactAriaButton className='running-button menu-button'>
        {translate('header.menu')}
      </ReactAriaButton>
      <Popover
        aria-label={translate('header.navigation')}
        className='menu-sheet'
        dialogClassName='menu'
        offset={8}
        placement='bottom end'
      >
        <PageLinks {...props} onNavigate={() => setIsOpen(false)} />
      </Popover>
    </DialogTrigger>
  )
}

/** The running head of the register: who keeps it, and where else to go. */
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
      <div className='running'>
        <ReactAriaLink
          {...ariaCurrentLeftOutOfLinkProps(currentPath === homePath, 'page')}
          aria-label={translate('header.home')}
          className='running-link running-home'
          href={homePath}
        >
          {translate('header.name')}
        </ReactAriaLink>
        <nav aria-label={translate('header.navigation')} className='site-nav'>
          <div className='page-links'>
            <PageLinks currentPath={currentPath} pages={pages} />
          </div>
          <LocaleSwitch />
          <MenuSheet currentPath={currentPath} pages={pages} />
        </nav>
        <ThemeSwitch />
      </div>
    </header>
  )
}
