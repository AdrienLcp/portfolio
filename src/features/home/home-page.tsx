import type React from 'react'

import { useLocalizedCurrentPath } from '@/infrastructure/router/navigation'
import { Link } from '@/presentation/components/link'
import { useI18n } from '@/presentation/i18n/i18n-provider'

export const HomePage: React.FC = () => {
  const { locale, translate } = useI18n()
  const otherLocalePath = useLocalizedCurrentPath(locale === 'en' ? 'fr' : 'en')

  return (
    <main className='home-page'>
      <h1>{translate('home.title')}</h1>
      <p>{translate('home.status')}</p>
      {otherLocalePath !== null && (
        <Link href={otherLocalePath} routerOptions={{ replace: true }}>
          {translate('home.otherLocale')}
        </Link>
      )}
    </main>
  )
}
