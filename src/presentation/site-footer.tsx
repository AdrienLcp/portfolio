import type React from 'react'

import { Link } from '@/presentation/components/ui/link'
import { useTranslate } from '@/presentation/i18n/i18n-provider'
import { ThemeSwitch } from '@/presentation/theme/theme-switch'

import './site-footer.sass'

const GITHUB_URL = 'https://github.com/AdrienLcp'
const LINKEDIN_URL = 'https://www.linkedin.com/in/adrien-lacourpaille/'

export const SiteFooter: React.FC = () => {
  const translate = useTranslate()

  return (
    <footer className='site-footer'>
      <ThemeSwitch />
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
