import { z } from 'zod'

import { localizedTextSchema } from '@/features/content/localized-text'
import { textSchema } from '@/features/content/text'
import type { Locale } from '@/presentation/i18n/locale'

export const PROFILE_PHOTO = {
  path: '/images/adrien-lacourpaille.webp',
  size: 480
} as const

export const profileSchema = z.strictObject({
  links: z.strictObject({
    github: z.url(),
    linkedin: z.url()
  }),
  name: textSchema,
  role: localizedTextSchema
})

type ProfileContent = z.infer<typeof profileSchema>

export type Profile = Omit<ProfileContent, 'role'> & { role: string }

export const localizeProfile = (
  profile: ProfileContent,
  locale: Locale
): Profile => ({ ...profile, role: profile.role[locale] })
