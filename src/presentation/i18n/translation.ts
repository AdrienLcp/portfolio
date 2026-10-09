import type { DotPath, PlainKey, Translator } from '@adrienlcp/i18n'

import type { ApiError } from '@/infrastructure/api/api-error'

import type { EN_DICTIONARY } from './dictionary-en'

export type TranslationKey = DotPath<typeof EN_DICTIONARY>

export type PlainTranslationKey = PlainKey<typeof EN_DICTIONARY>

export type Translate = Translator<typeof EN_DICTIONARY>

export const apiErrorKey = (error: ApiError): `error.api.${ApiError}` =>
  `error.api.${error}`
