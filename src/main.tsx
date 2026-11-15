import { startTransition } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'

import { greetDevelopersInConsole } from '@/features/easter-eggs/console-greeting'
import { installMissingFeatures } from '@/infrastructure/missing-features'
import { routerReadyToReplacePrerender } from '@/infrastructure/router/browser-router'
import { App } from '@/presentation/app'
import { i18n } from '@/presentation/i18n/i18n'
import { applyInitialLocale } from '@/presentation/i18n/initial-locale'

import '@/presentation/styles/globals.sass'

const locale = applyInitialLocale()

/**
 * Hydrating keeps the prerendered markup, and whatever focus or selection a
 * visitor already has in it. Values only this device knows, like the theme
 * preference, are read through `useSyncExternalStore`: they hydrate as the
 * prerender painted them, then update. As a transition, hydration yields to
 * the browser every few milliseconds instead of holding the main thread for
 * the whole page.
 */
const render = async (container: HTMLElement): Promise<void> => {
  if (container.hasChildNodes()) {
    await routerReadyToReplacePrerender()
    startTransition(() => {
      hydrateRoot(container, <App locale={locale} />)
    })
  } else {
    createRoot(container).render(<App locale={locale} />)
  }
}

/**
 * An async function rather than top-level awaits, which Chromium before 89
 * and Safari before 15 cannot parse.
 */
const start = async (): Promise<void> => {
  await installMissingFeatures()

  /**
   * The providers read the translator once, above the router: a page the app
   * renders from scratch, the not-found one, would otherwise keep English.
   */
  await i18n.load(locale)

  const container = document.getElementById('root')

  if (container === null) {
    throw new Error('Missing #root in index.html')
  }

  await render(container)

  greetDevelopersInConsole(locale)
}

void start()
