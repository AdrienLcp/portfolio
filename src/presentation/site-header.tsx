import type React from 'react'
import { useState } from 'react'
import { Dialog, DialogTrigger, Popover } from 'react-aria-components'

import {
  aboutPathFor,
  contactPathFor,
  cvPathFor,
  homePathFor,
  projectsPathFor,
  useCurrentPath
} from '@/infrastructure/router/navigation'
import { Button } from '@/presentation/components/ui/button'
import { Link } from '@/presentation/components/ui/link'
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
    <Link
      href={page.path}
      isCurrent={currentPath === page.path}
      key={page.path}
      onPress={onNavigate}
    >
      {page.label}
    </Link>
  ))

const MenuSheet: React.FC<Omit<PageLinksProps, 'onNavigate'>> = (props) => {
  const { translate } = useI18n()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button className='menu-button' icon='menu'>
        {translate('header.menu')}
      </Button>
      <Popover className='menu-sheet' offset={10} placement='bottom end'>
        <Dialog aria-label={translate('header.navigation')} className='menu'>
          <PageLinks {...props} onNavigate={() => setIsOpen(false)} />
        </Dialog>
      </Popover>
    </DialogTrigger>
  )
}

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
      <Link
        aria-label={translate('header.home')}
        className='monogram'
        href={homePath}
        isCurrent={currentPath === homePath}
      >
        AL
      </Link>
      <nav aria-label={translate('header.navigation')} className='site-nav'>
        <div className='page-links'>
          <PageLinks currentPath={currentPath} pages={pages} />
        </div>
        <LocaleSwitch />
        <MenuSheet currentPath={currentPath} pages={pages} />
      </nav>
      <ThemeSwitch />
    </header>
  )
}
