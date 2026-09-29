import { createRoot } from 'react-dom/client'

import { routerReadyToReplacePrerender } from '@/infrastructure/router/browser-router'
import { App } from '@/presentation/app'
import { applyInitialLocale } from '@/presentation/i18n/initial-locale'

import '@/presentation/styles/globals.sass'

const locale = applyInitialLocale()

const container = document.getElementById('root')

if (container === null) {
  throw new Error('Missing #root in index.html')
}

const hasPrerenderedPage = container.hasChildNodes()

if (hasPrerenderedPage) {
  await routerReadyToReplacePrerender()
}

createRoot(container).render(<App locale={locale} />)
