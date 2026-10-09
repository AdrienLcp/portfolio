import type { Locale } from './locale'

/**
 * Writing `<html lang>`, even with the value it already holds, makes the
 * browser restyle the whole page, which a prerendered page already stamped.
 */
export const stampDocumentLanguage = (locale: Locale): void => {
  if (document.documentElement.lang !== locale) {
    document.documentElement.lang = locale
  }
}
