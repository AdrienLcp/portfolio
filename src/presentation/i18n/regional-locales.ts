import type { Locale } from './locale.ts'

export const REGIONAL_LOCALES = {
  en: 'en-US',
  fr: 'fr-FR'
} as const satisfies Record<Locale, string>

/**
 * `og:locale` is a POSIX-style tag with an underscore, not the BCP-47 one
 * react-aria is handed: a crawler reading `en-US` here treats it as absent.
 */
export const openGraphLocaleFor = (locale: Locale): string =>
  REGIONAL_LOCALES[locale].replace('-', '_')
