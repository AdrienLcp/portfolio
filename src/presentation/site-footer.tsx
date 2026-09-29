import type React from 'react'

import { PROFILE } from '@/features/profile/profile-content'
import { cvPathFor } from '@/infrastructure/router/navigation'
import { Link } from '@/presentation/components/ui/link'
import { useI18n } from '@/presentation/i18n/i18n-provider'
import { ThemeSwitch } from '@/presentation/theme/theme-switch'

import './site-footer.sass'

type SiteFooterProps = {
  /** Printed in the colophon; read from the clock by the caller. */
  year: number
}

export const SiteFooter: React.FC<SiteFooterProps> = ({ year }) => {
  const { locale, translate } = useI18n()

  return (
    <footer className='site-footer'>
      <ThemeSwitch />
      <Link href={cvPathFor(locale)}>{translate('header.cv')}</Link>
      <Link href={PROFILE.links.github} target='_blank'>
        {translate('common.github')}
      </Link>
      <Link href={PROFILE.links.linkedin} target='_blank'>
        {translate('common.linkedin')}
      </Link>
      <p className='colophon'>
        {translate('footer.colophon', { year: String(year) })}
      </p>
    </footer>
  )
}
