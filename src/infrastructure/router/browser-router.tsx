import type React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'

import { routes } from './routes'

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

const markAsSettledForReactUse = (promise: Promise<unknown>) =>
  promise.then(
    (value) => Object.assign(promise, { status: 'fulfilled', value }),
    () => undefined
  )

const pendingLoaderData = (): Promise<unknown>[] =>
  Object.values(router.state.loaderData)
    .flatMap((data: unknown) =>
      typeof data === 'object' && data !== null ? Object.values(data) : []
    )
    .filter((value): value is Promise<unknown> => value instanceof Promise)

export const routerReadyToReplacePrerender = async (): Promise<void> => {
  await whenInitialized()
  await Promise.all(pendingLoaderData().map(markAsSettledForReactUse))
}
