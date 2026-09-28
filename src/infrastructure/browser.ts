export const preferredLocales = (): readonly string[] => navigator.languages

/** Read without the router, which does not exist yet when `<html lang>` is set. */
export const servedPath = (): string => location.pathname

const scrollBehavior = (): ScrollBehavior =>
  matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'

export const scrollToTop = (): void => {
  scrollTo({ behavior: scrollBehavior(), top: 0 })
}

export const scrollToElement = (element: HTMLElement): void => {
  element.scrollIntoView({ behavior: scrollBehavior(), block: 'start' })
}

/** Resolves `false` where the clipboard is denied, as over plain HTTP. */
export const copyText = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

/** The fallback when copying fails: the text is selected, ready for a keystroke. */
export const selectContents = (element: HTMLElement): void => {
  const selection = getSelection()

  selection?.selectAllChildren(element)
}
