import type React from 'react'

import { paths, useRouteFailure } from '@/infrastructure/router/navigation'
import { AppShell } from '@/presentation/app-shell'
import { BlankEntry } from '@/presentation/blank-entry'
import { Main } from '@/presentation/components/main'
import { useTranslate } from '@/presentation/i18n/i18n-provider'

/**
 * Sits outside react-aria's `RouterProvider`, so its link reloads the whole
 * document — which is also what clears a half-broken state.
 */
export const ErrorScreen: React.FC = () => {
  const translate = useTranslate()
  const failure = useRouteFailure()

  return (
    <AppShell>
      <Main className='blank-entry-page'>
        <BlankEntry
          backHref={paths.root}
          backLabel={translate('error.reload')}
          detail={<code>{failure}</code>}
          note={translate('error.note')}
          stamp={translate('error.stamp')}
          title={translate('error.title')}
        />
      </Main>
    </AppShell>
  )
}
