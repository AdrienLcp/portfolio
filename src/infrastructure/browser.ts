import { Result } from '@adrienlcp/result'

export const preferredLocales = (): readonly string[] => navigator.languages

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

export const selectContents = (element: HTMLElement): void => {
  const selection = getSelection()

  selection?.selectAllChildren(element)
}
