import type React from 'react'

import { homePathFor, useCurrentPath } from '@/infrastructure/router/navigation'
import { Link } from '@/presentation/components/link'
import { useI18n } from '@/presentation/i18n/i18n-provider'

import './not-found-page.sass'

export const NotFoundPage: React.FC = () => {
  const { locale, translate } = useI18n()
  const path = useCurrentPath()

  return (
    <main className='not-found-page'>
      <div className='missing-piece'>
        <h1 className='missing-path'>
          {translate('notFound.message', { path })}
        </h1>
      </div>
      <div className='way-back'>
        <Link className='back-home' href={homePathFor(locale)}>
          {translate('notFound.backHome')}
        </Link>
      </div>
    </main>
  )
}
