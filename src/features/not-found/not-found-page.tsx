import type React from 'react'

import { homePathFor, useCurrentPath } from '@/infrastructure/router/navigation'
import { BlankEntry } from '@/presentation/blank-entry'
import { Main } from '@/presentation/components/main'
import { notFoundTitle } from '@/presentation/head/document-head'
import { DocumentTitle } from '@/presentation/head/document-title'
import { useI18n } from '@/presentation/i18n/i18n-provider'

export const NotFoundPage: React.FC = () => {
  const { locale, translate } = useI18n()
  const path = useCurrentPath()

  return (
    <Main className='blank-entry-page'>
      <DocumentTitle>
        {notFoundTitle(translate('notFound.title'))}
      </DocumentTitle>
      <BlankEntry
        backHref={homePathFor(locale)}
        backLabel={translate('notFound.backHome')}
        detail={translate('notFound.address', { path })}
        note={translate('notFound.note')}
        stamp={translate('notFound.stamp')}
        title={translate('notFound.title')}
      />
    </Main>
  )
}
