import type React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'

import { routes } from './routes'

const router = createBrowserRouter(routes)

export const BrowserRouterProvider: React.FC = () => (
  <RouterProvider router={router} />
)

/**
 * Every route is `lazy`, so until its chunk and its loader resolve the router
 * renders the route fallback: over a prerendered page, that would replace the
 * paint the document already made with a blank field. An empty `#root` (the
 * SPA fallback) has nothing to keep, so it renders at once without waiting.
 */
export const routerReadyToReplacePrerender = (): Promise<void> =>
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
