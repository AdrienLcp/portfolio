import {
  copyText,
  prefersReducedMotion,
  selectContents
} from '@adrienlcp/browser'

export { copyText, prefersReducedMotion, selectContents }

export const preferredLocales = (): readonly string[] => navigator.languages

/** Read without the router, which does not exist yet when `<html lang>` is set. */
export const servedPath = (): string => location.pathname

/** A mouse or trackpad that can hover, where pointing can preview. */
export const hasFinePointer = (): boolean =>
  matchMedia('(hover: hover) and (pointer: fine)').matches

const scrollBehavior = (): ScrollBehavior =>
  prefersReducedMotion() ? 'instant' : 'smooth'

export const scrollToTop = (): void => {
  scrollTo({ behavior: scrollBehavior(), top: 0 })
}

export const scrollToElement = (element: HTMLElement): void => {
  element.scrollIntoView({ behavior: scrollBehavior(), block: 'start' })
}
