import type React from 'react'

import { paths, useRouteFailure } from '@/infrastructure/router/navigation'
import { AppShell } from '@/presentation/app-shell'
import { Link } from '@/presentation/components/ui/link'
import { useTranslate } from '@/presentation/i18n/i18n-provider'

import './error-screen.sass'

/** Where the lid split: one jagged cut across the box. */
const CRACK_POINTS =
  '0,6 5.5,1 10.9,10 16.4,3 21.8,11 27.3,2 32.7,8 38.2,0 43.6,9 49.1,4 54.5,12 60,1 65.5,7 70.9,10 76.4,2 81.8,9 87.3,5 92.7,11 98.2,0 103.6,8 109.1,3 114.5,12 120,6'

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
        <div className='broken-box'>
          <svg
            aria-hidden='true'
            className='crack'
            focusable='false'
            preserveAspectRatio='none'
            viewBox='0 0 120 12'
          >
            <polyline points={CRACK_POINTS} />
          </svg>
          <h1 className='failure-title'>{translate('error.title')}</h1>
          <p className='failure-note'>{translate('error.note')}</p>
          <p className='failure'>
            <code>{failure}</code>
          </p>
        </div>
        <div className='way-out'>
          <Link href={paths.root} variant='accent'>
            {translate('error.reload')}
          </Link>
        </div>
      </main>
    </AppShell>
  )
}
