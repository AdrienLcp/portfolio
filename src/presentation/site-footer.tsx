import type React from 'react'

import { cvPathFor } from '@/infrastructure/router/navigation'
import { Link } from '@/presentation/components/ui/link'
import { useI18n } from '@/presentation/i18n/i18n-provider'
import { ThemeSwitch } from '@/presentation/theme/theme-switch'

import './site-footer.sass'

const GITHUB_URL = 'https://github.com/AdrienLcp'
const LINKEDIN_URL = 'https://www.linkedin.com/in/adrien-lacourpaille/'

export const SiteFooter: React.FC = () => {
  const { locale, translate } = useI18n()

  return (
    <footer className='site-footer'>
      <ThemeSwitch />
      <Link href={cvPathFor(locale)}>{translate('header.cv')}</Link>
      <Link href={GITHUB_URL} target='_blank'>
        GitHub
      </Link>
      <Link href={LINKEDIN_URL} target='_blank'>
        LinkedIn
      </Link>
      <p className='colophon'>
        {translate('footer.colophon', {
          year: String(new Date().getFullYear())
        })}
      </p>
    </footer>
  )
}
