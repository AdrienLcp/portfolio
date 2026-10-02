import type { Result } from '@adrienlcp/result'
import type React from 'react'
import { Suspense, use } from 'react'

import type { Profile } from '@/features/profile/profile'
import type { ApiError } from '@/infrastructure/api/portfolio-api'
import { cvPathFor } from '@/infrastructure/router/navigation'
import { RegisterLink } from '@/presentation/components/register/register-link'
import { useI18n } from '@/presentation/i18n/i18n-provider'
import { ThemeSwitch } from '@/presentation/theme/theme-switch'

import './site-footer.sass'

type ProfileResult = Promise<Result<Profile, ApiError>>

type SiteFooterProps = {
  /** Where the network links come from. */
  profile: ProfileResult
  /** Printed in the colophon; read from the clock by the caller. */
  year: number
}

/** A profile that cannot be read leaves the footer without its networks. */
const NetworkLinks: React.FC<{ profile: ProfileResult }> = ({ profile }) => {
  const { translate } = useI18n()
  const result = use(profile)

  if (result.status === 'failure') {
    return null
  }

  const { links } = result.data

  return (
    <>
      <li>
        <RegisterLink href={links.github} target='_blank'>
          {translate('common.github')}
        </RegisterLink>
      </li>
      <li>
        <RegisterLink href={links.linkedin} target='_blank'>
          {translate('common.linkedin')}
        </RegisterLink>
      </li>
    </>
  )
}

/** The register's closing rule: who keeps it, where else to find him. */
export const SiteFooter: React.FC<SiteFooterProps> = ({ profile, year }) => {
  const { locale, translate } = useI18n()

  return (
    <footer className='site-footer'>
      <div className='footer-sheet'>
        <p className='keeper'>{translate('footer.keeper')}</p>
        <ul className='footer-links'>
          <li>
            <RegisterLink href={cvPathFor(locale)}>
              {translate('header.cv')}
            </RegisterLink>
          </li>
          <Suspense fallback={null}>
            <NetworkLinks profile={profile} />
          </Suspense>
        </ul>
        <ThemeSwitch />
        <p className='colophon'>
          {translate('footer.colophon', { year: String(year) })}
        </p>
      </div>
    </footer>
  )
}
