import type { LocalizedText } from '@/features/content/localized-text'
import type { Locale } from '@/presentation/i18n/locale'

export const PROFILE_PHOTO = {
  path: '/images/adrien-lacourpaille.webp',
  size: 480
} as const

/** Downscaled copies for the 3.5rem hero avatar, at 2x and 3x density. */
export const PROFILE_THUMBNAILS = [
  { path: '/images/adrien-lacourpaille-112.webp', size: 112 },
  { path: '/images/adrien-lacourpaille-168.webp', size: 168 }
] as const

export type ProfileContent = {
  links: { github: string; linkedin: string }
  name: string
  role: LocalizedText
}

export type Profile = Omit<ProfileContent, 'role'> & { role: string }

export const localizeProfile = (
  profile: ProfileContent,
  locale: Locale
): Profile => ({ ...profile, role: profile.role[locale] })
