import { useI18n } from '@/presentation/i18n/i18n-provider'
import type { Locale } from '@/presentation/i18n/locale'

import type { DRAWING_TEXT_EN } from './drawing-text-en'

type DrawingText = typeof DRAWING_TEXT_EN

type LocalizedDrawingText = {
  [Drawn in keyof DrawingText]: Record<keyof DrawingText[Drawn], string>
}

/**
 * Kept beside the drawings rather than in the site dictionary, and one chunk
 * per language, so their words download with them, in the page's language
 * only, and not on every page.
 */
const DRAWING_TEXT_LOADERS: Record<
  Locale,
  () => Promise<LocalizedDrawingText>
> = {
  en: async () => (await import('./drawing-text-en')).DRAWING_TEXT_EN,
  fr: async () => (await import('./drawing-text-fr')).DRAWING_TEXT_FR
}

const loadedDrawingText: Partial<Record<Locale, LocalizedDrawingText>> = {}

/** Awaited by every plate loader, so a drawing never renders before its words. */
export const loadDrawingText = async (locale: Locale): Promise<void> => {
  loadedDrawingText[locale] ??= await DRAWING_TEXT_LOADERS[locale]()
}

export const useDrawingText = <Drawn extends keyof DrawingText>(
  drawn: Drawn
): Record<keyof DrawingText[Drawn], string> => {
  const { locale } = useI18n()
  const text = loadedDrawingText[locale]

  if (text === undefined) {
    throw new Error(
      `Drawing texts for "${locale}" rendered before loadDrawingText`
    )
  }

  return text[drawn]
}
