import { createI18n } from '@adrienlcp/i18n'

import { EN_DICTIONARY } from './dictionary-en'
import { DEFAULT_LOCALE, type Locale } from './locale'

/**
 * English is the reference every key is typed from, so every page carries it.
 * French is fetched by the pages that read it: the root loader awaits it, so
 * nothing renders in French before its words are in hand.
 */
export const i18n = createI18n({
  defaultLocale: DEFAULT_LOCALE,
  dictionaries: {
    en: EN_DICTIONARY,
    fr: async () => ({
      default: (await import('./dictionary-fr')).FR_DICTIONARY
    })
  } satisfies Record<Locale, unknown>
})
