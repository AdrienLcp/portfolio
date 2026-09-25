import type React from 'react'

import { useLocalizedCurrentPath } from '@/infrastructure/router/navigation'
import { Link } from '@/presentation/components/link'
import { useI18n } from '@/presentation/i18n/i18n-provider'

import './home-page.sass'

export const HomePage: React.FC = () => {
  const { locale, translate } = useI18n()
  const otherLocalePath = useLocalizedCurrentPath(locale === 'en' ? 'fr' : 'en')

  return (
    <main className='home-page'>
      <div className='lid'>
        {otherLocalePath !== null && (
          <Link
            className='locale-switch'
            href={otherLocalePath}
            routerOptions={{ replace: true }}
          >
            {translate('home.otherLocale')}
          </Link>
        )}
        <h1 className='owner-name'>{translate('home.title')}</h1>
      </div>
      <div className='lid-band'>
        <p className='status'>{translate('home.status')}</p>
      </div>
    </main>
  )
}
