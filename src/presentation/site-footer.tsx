import type React from 'react'

import type { Profile } from '@/features/profile/profile'
import { SiteLink } from '@/presentation/components/site-link/site-link'
import { useI18n } from '@/presentation/i18n/i18n-provider'
import { ThemeSwitch } from '@/presentation/theme/theme-switch'

import './site-footer.sass'

type SiteFooterProps = {
  /** Where the network links come from. */
  profile: Profile
  /** Printed in the colophon; read from the clock by the caller. */
  year: number
}

const SITE_SOURCE_URL = 'https://github.com/AdrienLcp/portfolio'

const NetworkLinks: React.FC<{ profile: Profile }> = ({
  profile: { links }
}) => {
  const { translate } = useI18n()

  return (
    <>
      <li>
        <SiteLink href={links.github} icon='github' target='_blank'>
          {translate('common.github')}
        </SiteLink>
      </li>
      <li>
        <SiteLink href={links.linkedin} icon='linkedin' target='_blank'>
          {translate('common.linkedin')}
        </SiteLink>
      </li>
    </>
  )
}

/**
 * Who made the site, where else to find him, and how the site is made. On a
 * phone the theme switch lives here, the header having no room left for it.
 */
export const SiteFooter: React.FC<SiteFooterProps> = ({ profile, year }) => {
  const { translate } = useI18n()

  return (
    <footer className='site-footer'>
      <div className='footer-sheet'>
        <p className='keeper'>
          {translate('footer.keeper', { year: String(year) })}
        </p>
        <ul className='footer-links'>
          <NetworkLinks profile={profile} />
        </ul>
        <ThemeSwitch />
        <p className='colophon'>
          {translate('footer.colophon')}{' '}
          <SiteLink href={SITE_SOURCE_URL} target='_blank'>
            {translate('footer.source')}
          </SiteLink>
        </p>
      </div>
    </footer>
  )
}
