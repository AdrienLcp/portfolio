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
 * `use` suspends on a promise it has never seen, even one already resolved,
 * and React then holds the fallback for a few hundred milliseconds: over a
 * prerendered page, that blanks the paint and shifts everything below it.
 * Tagged the way React tracks a settled promise, the loaders' data reads at
 * once on the first render.
 */
const settleLoaderData = (): Promise<unknown> =>
  Promise.all(
    Object.values(router.state.loaderData)
      .flatMap((data: unknown) =>
        typeof data === 'object' && data !== null ? Object.values(data) : []
      )
      .filter((value): value is Promise<unknown> => value instanceof Promise)
      .map((promise) =>
        promise.then(
          (value) => Object.assign(promise, { status: 'fulfilled', value }),
          () => undefined
        )
      )
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
      void settleLoaderData().then(() => {
        root.render(<App />)
      })
    }
  })
} else {
  root.render(<App />)
}
