import { z } from 'zod'

import { localizedTextSchema } from '@/features/content/localized-text'
import type { Locale } from '@/presentation/i18n/locale'

export const profileSchema = z.strictObject({
  links: z.strictObject({
    github: z.url(),
    linkedin: z.url()
  }),
  name: z.string().trim().min(1),
  role: localizedTextSchema
})

export type ProfileContent = z.infer<typeof profileSchema>

export type Profile = Omit<ProfileContent, 'role'> & { role: string }

export const localizeProfile = (
  profile: ProfileContent,
  locale: Locale
): Profile => ({ ...profile, role: profile.role[locale] })
