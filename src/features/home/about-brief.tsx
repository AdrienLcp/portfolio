import type React from 'react'

import { aboutPathFor } from '@/infrastructure/router/navigation'
import { SiteLink } from '@/presentation/components/site-link/site-link'
import { useI18n } from '@/presentation/i18n/i18n-provider'

/** The route in three sentences; the about page tells all of it. */
export const AboutBrief: React.FC = () => {
  const { locale, translate } = useI18n()

  return (
    <section
      aria-labelledby='about-title'
      className='home-section about-brief'
      id='about'
    >
      <h2 className='section-title' id='about-title'>
        {translate('home.about.title')}
      </h2>
      <div className='about-brief-text'>
        <p>{translate('home.about.path')}</p>
        <p>{translate('home.about.work')}</p>
        <p>{translate('home.about.off')}</p>
        <SiteLink href={aboutPathFor(locale)} variant='caps'>
          {translate('home.about.more')}
        </SiteLink>
      </div>
    </section>
  )
}
