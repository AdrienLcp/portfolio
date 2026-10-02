import { flushSync } from 'react-dom'
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

/**
 * `createRoot` over the prerendered markup rather than `hydrateRoot`: the
 * document cannot know this device's theme, and hydrating would either
 * mismatch on every load or push the theme into an effect, which is a flash.
 */
/**
 * Resource hints React writes into the prerendered body but hoists into the
 * head on the client, so they never count as a position.
 */
const HOISTED_TAGS = new Set(['LINK', 'META', 'SCRIPT', 'STYLE', 'TITLE'])

const paintedChildrenOf = (parent: Element): Element[] =>
  Array.from(parent.children).filter(
    (child) => !HOISTED_TAGS.has(child.tagName)
  )

/**
 * Where focus sits under `#root`, as positions among painted children: the app
 * paints the same tree the prerender did, so the same path finds the same
 * element in it.
 */
const focusPathUnder = (ancestor: Element): number[] | null => {
  const path: number[] = []
  let node = document.activeElement

  while (node !== null && node !== ancestor) {
    const parent: Element | null = node.parentElement

    if (parent === null) {
      return null
    }

    path.unshift(paintedChildrenOf(parent).indexOf(node))
    node = parent
  }

  return node === ancestor ? path : null
}

const elementAt = (ancestor: Element, path: number[]): Element | undefined =>
  path.reduce<Element | undefined>(
    (node, index) =>
      node === undefined ? undefined : paintedChildrenOf(node)[index],
    ancestor
  )

const root = createRoot(container)

/**
 * The page is usable before the app takes it over: a visitor who tabbed into
 * the prerendered markup keeps their place when the app replaces it.
 */
const focusPath = hasPrerenderedPage ? focusPathUnder(container) : null

flushSync(() => root.render(<App locale={locale} />))

if (focusPath !== null && focusPath.length > 0) {
  const focused = elementAt(container, focusPath)

  if (focused instanceof HTMLElement) {
    focused.focus({ preventScroll: true })
  }
}
