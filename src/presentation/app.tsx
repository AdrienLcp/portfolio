import { StrictMode } from 'react'
import { RouterProvider } from 'react-router'

import { router } from '@/infrastructure/router/browser-router'
import { AppProviders } from '@/presentation/app-providers'
import type { Locale } from '@/presentation/i18n/locale'

type AppProps = { locale: Locale }

export const App: React.FC<AppProps> = ({ locale }) => (
  <StrictMode>
    <AppProviders locale={locale}>
      <RouterProvider router={router} />
    </AppProviders>
  </StrictMode>
)
