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

/** Room beside a list for a picture to follow the pointer: a hovering mouse, a wide window. */
export const canPreviewOnPointer = (): boolean =>
  matchMedia('(hover: hover) and (pointer: fine) and (width > 48rem)').matches

export const viewportSize = (): { height: number; width: number } => ({
  height: innerHeight,
  width: innerWidth
})

export const canObserveIntersections = (): boolean =>
  'IntersectionObserver' in window

const scrollBehavior = (): ScrollBehavior =>
  prefersReducedMotion() ? 'instant' : 'smooth'

export const scrollToTop = (): void => {
  scrollTo({ behavior: scrollBehavior(), top: 0 })
}

export const scrollToElement = (element: HTMLElement): void => {
  element.scrollIntoView({ behavior: scrollBehavior(), block: 'start' })
}
