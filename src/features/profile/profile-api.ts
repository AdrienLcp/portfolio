import { Result } from '@adrienlcp/result'

import {
  localizeProfile,
  type Profile,
  profileSchema
} from '@/features/profile/profile'
import { PROFILE } from '@/features/profile/profile-content'
import { type ApiError, serveContent } from '@/infrastructure/api/portfolio-api'
import type { Locale } from '@/presentation/i18n/locale'

export const fetchProfile = async (
  locale: Locale
): Promise<Result<Profile, ApiError>> => {
  const profile = await serveContent(profileSchema, PROFILE)

  return profile.status === 'failure'
    ? profile
    : Result.success(localizeProfile(profile.data, locale))
}
