import { useI18n } from '@/presentation/i18n/i18n-provider'
import type { Locale } from '@/presentation/i18n/locale'

import { DRAWING_TEXT_EN } from './drawing-text-en'
import { DRAWING_TEXT_FR } from './drawing-text-fr'

type DrawingText = typeof DRAWING_TEXT_EN

/**
 * Kept beside the drawings rather than in the site dictionary, so their words
 * download with them and not on every page.
 */
const DRAWING_TEXT: Record<
  Locale,
  { [Drawn in keyof DrawingText]: Record<keyof DrawingText[Drawn], string> }
> = {
  en: DRAWING_TEXT_EN,
  fr: DRAWING_TEXT_FR
}

export const useDrawingText = <Drawn extends keyof DrawingText>(
  drawn: Drawn
): Record<keyof DrawingText[Drawn], string> =>
  DRAWING_TEXT[useI18n().locale][drawn]
