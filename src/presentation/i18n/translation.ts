import type { DotPath, PlainKey } from '@adrienlcp/i18n/dictionary'
import type { Translator } from '@adrienlcp/i18n/translator'

import type { EN_DICTIONARY } from './dictionary-en'

export type TranslationKey = DotPath<typeof EN_DICTIONARY>

export type PlainTranslationKey = PlainKey<typeof EN_DICTIONARY>

export type Translate = Translator<typeof EN_DICTIONARY>
