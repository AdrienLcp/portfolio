import { z } from 'zod/mini'

import type { AboutContent } from '@/features/about/domain/about'
import { localizedTextSchema } from '@/features/content/content-schemas'

const stepSchema = z.strictObject({
  mark: localizedTextSchema,
  markNote: z.optional(localizedTextSchema),
  paragraphs: z.array(localizedTextSchema).check(z.minLength(1)),
  state: z.enum(['closed', 'current', 'paused']),
  title: localizedTextSchema,
  where: localizedTextSchema
})

export const aboutSchema = z.strictObject({
  steps: z.array(stepSchema).check(z.minLength(1))
}) satisfies z.ZodMiniType<AboutContent>
