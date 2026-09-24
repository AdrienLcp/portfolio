import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'

import { routes } from '@/infrastructure/router/routes'
import { AppProviders } from '@/presentation/app-providers'
import { applyInitialLocale } from '@/presentation/i18n/initial-locale'

const initialLocale = applyInitialLocale()

const container = document.getElementById('root')

if (container === null) {
  throw new Error('Missing #root in index.html')
}

createRoot(container).render(
  <StrictMode>
    <AppProviders locale={initialLocale}>
      <RouterProvider router={createBrowserRouter(routes)} />
    </AppProviders>
  </StrictMode>
)
