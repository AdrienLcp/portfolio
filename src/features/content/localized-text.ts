import { z } from 'zod'

import { textSchema } from '@/features/content/text'
import type { Locale } from '@/presentation/i18n/locale'

/**
 * `satisfies` over every locale: adding one fails to compile until the schema
 * carries it.
 */
export const localizedTextSchema = z.strictObject({
  en: textSchema,
  fr: textSchema
}) satisfies z.ZodType<Record<Locale, string>>

export type LocalizedText = z.infer<typeof localizedTextSchema>
