import type React from 'react'
import { useId } from 'react'

import { PROFILE } from '@/features/profile/profile-content'
import { contactPathFor } from '@/infrastructure/router/navigation'
import { ANALYTICS_OPT_OUT_KEY } from '@/infrastructure/storage/analytics-opt-out-storage'
import { LOCALE_STORAGE_KEY } from '@/infrastructure/storage/preferences-storage'
import { Main } from '@/presentation/components/main'
import { SiteLink } from '@/presentation/components/site-link/site-link'
import { IndexedPageTitle } from '@/presentation/head/indexed-page-title'
import { useI18n } from '@/presentation/i18n/i18n-provider'
import { RichText } from '@/presentation/i18n/rich-text'
import { THEME_STORAGE_KEY } from '@/presentation/theme/theme-store'

import {
  CNIL_COMPLAINT_HREF,
  HOST,
  MEASUREMENT_RETENTION_MONTHS,
  WEB3FORMS_PRIVACY_HREF
} from './legal-details'
import { MeasurementSwitch } from './measurement-switch'

import './legal-page.sass'

const externalLink =
  (href: string) =>
  (children: string): React.ReactNode => (
    <SiteLink href={href} target='_blank'>
      {children}
    </SiteLink>
  )

type LegalSectionProps = {
  children: React.ReactNode
  heading: string
}

const LegalSection: React.FC<LegalSectionProps> = ({ children, heading }) => {
  const headingId = useId()

  return (
    <section aria-labelledby={headingId} className='legal-section'>
      <h2 className='legal-heading' id={headingId}>
        {heading}
      </h2>
      <div className='legal-text'>{children}</div>
    </section>
  )
}

/**
 * The French LCEN's legal notice and the privacy policy, on one page every
 * footer links to: who publishes and hosts the site, what it keeps, who else
 * receives what, and the switch that refuses audience measurement.
 */
export const LegalPage: React.FC = () => {
  const { locale, translate } = useI18n()

  const contactLink = (children: string): React.ReactNode => (
    <SiteLink href={contactPathFor(locale)}>{children}</SiteLink>
  )

  return (
    <Main className='legal-page'>
      <IndexedPageTitle page='legal' />
      <header className='legal-masthead'>
        <h1 className='legal-title'>{translate('legal.title')}</h1>
        <p className='legal-intro'>{translate('legal.intro')}</p>
      </header>

      <LegalSection heading={translate('legal.publisher.heading')}>
        <p>
          <RichText
            parts={translate.rich('legal.publisher.body', {
              contact: contactLink,
              name: PROFILE.name
            })}
          />
        </p>
        <p className='legal-aside'>{translate('legal.publisher.address')}</p>
      </LegalSection>

      <LegalSection heading={translate('legal.host.heading')}>
        <p>{translate('legal.host.body')}</p>
        <address className='host-address'>
          {[HOST.name, ...HOST.addressLines].map((line) => (
            <span key={line}>{line}</span>
          ))}
        </address>
      </LegalSection>

      <LegalSection heading={translate('legal.storage.heading')}>
        <p>{translate('legal.storage.device')}</p>
        <dl className='legal-terms'>
          <div>
            <dt>
              <code>{THEME_STORAGE_KEY}</code>
            </dt>
            <dd>{translate('legal.storage.theme')}</dd>
          </div>
          <div>
            <dt>
              <code>{LOCALE_STORAGE_KEY}</code>
            </dt>
            <dd>{translate('legal.storage.locale')}</dd>
          </div>
          <div>
            <dt>
              <code>{ANALYTICS_OPT_OUT_KEY}</code>
            </dt>
            <dd>{translate('legal.storage.analyticsOptOut')}</dd>
          </div>
        </dl>
        <p>{translate('legal.storage.server')}</p>
      </LegalSection>

      <LegalSection heading={translate('legal.thirdParties.heading')}>
        <p>{translate('legal.thirdParties.body')}</p>
        <dl className='legal-terms named'>
          <div>
            <dt>Cloudflare</dt>
            <dd>{translate('legal.thirdParties.cloudflare')}</dd>
          </div>
          <div>
            <dt>Web3Forms</dt>
            <dd>
              <RichText
                parts={translate.rich('legal.thirdParties.web3forms', {
                  policy: externalLink(WEB3FORMS_PRIVACY_HREF)
                })}
              />
            </dd>
          </div>
        </dl>
      </LegalSection>

      <LegalSection heading={translate('legal.measurement.heading')}>
        <p>{translate('legal.measurement.body')}</p>
        <p>
          {translate('legal.measurement.retention', {
            months: MEASUREMENT_RETENTION_MONTHS
          })}{' '}
          {translate('legal.measurement.exemption')}
        </p>
        <MeasurementSwitch />
      </LegalSection>

      <LegalSection heading={translate('legal.rights.heading')}>
        <p>
          <RichText
            parts={translate.rich('legal.rights.body', {
              contact: contactLink
            })}
          />
        </p>
        <p>
          <RichText
            parts={translate.rich('legal.rights.complaint', {
              authority: externalLink(CNIL_COMPLAINT_HREF)
            })}
          />
        </p>
      </LegalSection>
    </Main>
  )
}
