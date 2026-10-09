import type { Locale } from '@/presentation/i18n/locale'

/**
 * A string in every locale: adding a locale fails to compile until every text
 * carries it.
 */
export type LocalizedText = Record<Locale, string>
