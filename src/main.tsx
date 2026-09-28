import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'

import { routes } from '@/infrastructure/router/routes'
import { AppProviders } from '@/presentation/app-providers'
import { applyInitialLocale } from '@/presentation/i18n/initial-locale'

import '@/presentation/styles/globals.sass'

const initialLocale = applyInitialLocale()

const container = document.getElementById('root')

if (container === null) {
  throw new Error('Missing #root in index.html')
}

const router = createBrowserRouter(routes)

/**
 * `createRoot` over the prerendered markup rather than `hydrateRoot`: the
 * document cannot know this device's theme, and hydrating would either
 * mismatch on every load or push the theme into an effect, which is a flash.
 */
const root = createRoot(container)

const App: React.FC = () => (
  <StrictMode>
    <AppProviders locale={initialLocale}>
      <RouterProvider router={router} />
    </AppProviders>
  </StrictMode>
)

/**
 * Every route is `lazy`, so until its chunk resolves the router renders the
 * route fallback: over a prerendered page, that would replace the paint the
 * document already made with a blank field. An empty `#root` (the SPA
 * fallback) has nothing to keep, so it renders at once.
 */
if (container.hasChildNodes() && !router.state.initialized) {
  const unsubscribe = router.subscribe((state) => {
    if (state.initialized) {
      unsubscribe()
      root.render(<App />)
    }
  })
} else {
  root.render(<App />)
}
