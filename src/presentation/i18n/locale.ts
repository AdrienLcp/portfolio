export const LOCALES = ['en', 'fr'] as const

export type Locale = (typeof LOCALES)[number]

export const LOCALE_NAMES = {
  en: 'English',
  fr: 'Français'
} as const satisfies Record<Locale, string>

export const DEFAULT_LOCALE: Locale = 'en'

export const isLocale = (value: string): value is Locale =>
  LOCALES.some((locale) => locale === value)
