import type React from 'react'

import { homePathFor, useCurrentPath } from '@/infrastructure/router/navigation'
import { useI18n } from '@/presentation/i18n/i18n-provider'
import { MissingPiece } from '@/presentation/missing-piece'

import './not-found-page.sass'

export const NotFoundPage: React.FC = () => {
  const { locale, translate } = useI18n()
  const path = useCurrentPath()

  return (
    <main className='not-found-page'>
      <MissingPiece
        backHref={homePathFor(locale)}
        backLabel={translate('notFound.backHome')}
        message={translate('notFound.message', { path })}
      />
    </main>
  )
}
