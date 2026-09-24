import type React from 'react'

import { homePathFor, useCurrentPath } from '@/infrastructure/router/navigation'
import { Link } from '@/presentation/components/link'
import { useI18n } from '@/presentation/i18n/i18n-provider'

export const NotFoundPage: React.FC = () => {
  const { locale, translate } = useI18n()
  const path = useCurrentPath()

  return (
    <main className='not-found-page'>
      <h1>{translate('notFound.message', { path })}</h1>
      <Link href={homePathFor(locale)}>{translate('notFound.backHome')}</Link>
    </main>
  )
}
