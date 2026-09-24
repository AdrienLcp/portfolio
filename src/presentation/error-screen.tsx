import type React from 'react'

import { paths, useRouteFailure } from '@/infrastructure/router/navigation'
import { AppShell } from '@/presentation/app-shell'
import { Link } from '@/presentation/components/link'
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
      <main className='error-screen'>
        <h1>{translate('error.title')}</h1>
        <p>
          <code>{failure}</code>
        </p>
        <Link href={paths.root}>{translate('error.reload')}</Link>
      </main>
    </AppShell>
  )
}
