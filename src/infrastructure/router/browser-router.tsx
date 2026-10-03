import type React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'

import { routes } from './routes'
import { markAsSettledForReactUse } from './settled-for-react-use'

const router = createBrowserRouter(routes)

export const BrowserRouterProvider: React.FC = () => (
  <RouterProvider router={router} />
)

const whenInitialized = (): Promise<void> =>
  new Promise((resolve) => {
    if (router.state.initialized) {
      resolve()
      return
    }

    const unsubscribe = router.subscribe((state) => {
      if (state.initialized) {
        unsubscribe()
        resolve()
      }
    })
  })

const pendingLoaderData = (): Promise<unknown>[] =>
  Object.values(router.state.loaderData)
    .flatMap((data: unknown) =>
      typeof data === 'object' && data !== null ? Object.values(data) : []
    )
    .filter((value): value is Promise<unknown> => value instanceof Promise)

/**
 * Every route is `lazy`, so until its chunk resolves the router renders the
 * route fallback: over a prerendered page, that would replace the paint the
 * document already made with a blank field. An empty `#root` (the SPA
 * fallback) has nothing to keep, so it renders at once without waiting.
 */
export const routerReadyToReplacePrerender = async (): Promise<void> => {
  await whenInitialized()
  // React would otherwise hold the fallback for a few hundred milliseconds over
  // the prerendered paint, shifting everything below it.
  await Promise.all(pendingLoaderData().map(markAsSettledForReactUse))
}
