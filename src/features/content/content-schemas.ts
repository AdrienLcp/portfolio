import { z } from 'zod/mini'

import type { LocalizedText } from '@/features/content/localized-text'

/**
 * Trims only to compare: content that comes out of a schema changed is
 * content the app would have served untrimmed.
 */
export const textSchema = z.string().check(z.trim(), z.minLength(1))

export const localizedTextSchema = z.strictObject({
  en: textSchema,
  fr: textSchema
}) satisfies z.ZodMiniType<LocalizedText>

/** A page per locale, for a site that has one in each. */
export const localizedUrlSchema = z.strictObject({
  en: z.url(),
  fr: z.url()
}) satisfies z.ZodMiniType<LocalizedText>
