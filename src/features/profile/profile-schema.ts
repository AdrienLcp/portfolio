import { z } from 'zod/mini'

import {
  localizedTextSchema,
  textSchema
} from '@/features/content/content-schemas'
import type { ProfileContent } from '@/features/profile/profile'

export const profileSchema = z.strictObject({
  links: z.strictObject({
    github: z.url(),
    linkedin: z.url()
  }),
  name: textSchema,
  role: localizedTextSchema
}) satisfies z.ZodMiniType<ProfileContent>
