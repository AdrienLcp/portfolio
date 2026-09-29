import { Result } from '@adrienlcp/result'

export const preferredLocales = (): readonly string[] => navigator.languages

/** Read without the router, which does not exist yet when `<html lang>` is set. */
export const servedPath = (): string => location.pathname

export const prefersReducedMotion = (): boolean =>
  matchMedia('(prefers-reduced-motion: reduce)').matches

const scrollBehavior = (): ScrollBehavior =>
  prefersReducedMotion() ? 'instant' : 'smooth'

export const scrollToTop = (): void => {
  scrollTo({ behavior: scrollBehavior(), top: 0 })
}

export const scrollToElement = (element: HTMLElement): void => {
  element.scrollIntoView({ behavior: scrollBehavior(), block: 'start' })
}

/** Fails with `refused` where the clipboard is denied, as over plain HTTP. */
export const copyText = async (
  text: string
): Promise<Result<void, 'refused'>> => {
  try {
    await navigator.clipboard.writeText(text)
    return Result.success()
  } catch {
    return Result.failure('refused')
  }
}

/** The fallback when copying fails: the text is selected, ready for a keystroke. */
export const selectContents = (element: HTMLElement): void => {
  const selection = getSelection()

  selection?.selectAllChildren(element)
}
