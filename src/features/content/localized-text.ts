import { z } from 'zod'

import type { Locale } from '@/presentation/i18n/locale'

const textSchema = z.string().trim().min(1)

/** `satisfies` over every locale: adding one fails to compile until the schema carries it. */
export const localizedTextSchema = z.strictObject({
  en: textSchema,
  fr: textSchema
}) satisfies z.ZodType<Record<Locale, string>>

export type LocalizedText = z.infer<typeof localizedTextSchema>
