import type React from 'react'

import { PROFILE_THUMBNAILS } from '@/features/profile/profile'
import { useI18n } from '@/presentation/i18n/i18n-provider'

/** Who this is, what he does by day and by night, and that he is looking. */
export const HomeHero: React.FC = () => {
  const { translate } = useI18n()

  return (
    <section aria-labelledby='hero-title' className='home-hero'>
      <h1 className='hero-title' id='hero-title'>
        {translate('home.title')}
        <span className='hero-role'>{translate('home.hero.role')}</span>
      </h1>
      <p className='hero-lead'>{translate('home.hero.lead')}</p>
      <div className='hero-status'>
        <img
          alt={translate('home.hero.photo')}
          className='hero-photo'
          height={56}
          sizes='3.5rem'
          src={PROFILE_THUMBNAILS[0].path}
          srcSet={PROFILE_THUMBNAILS.map(
            ({ path, size }) => `${path} ${size}w`
          ).join(', ')}
          width={56}
        />
        <p>
          <strong>
            <span aria-hidden='true' className='open-dot' />
            {translate('home.hero.openToWork')}
          </strong>
          {translate('home.hero.place')}
        </p>
      </div>
    </section>
  )
}
