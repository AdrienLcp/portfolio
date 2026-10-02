import { Result } from '@adrienlcp/result'

import {
  localizeProfile,
  type Profile,
  profileSchema
} from '@/features/profile/profile'
import { PROFILE } from '@/features/profile/profile-content'
import { type ApiError, serveContent } from '@/infrastructure/api/portfolio-api'
import type { Locale } from '@/presentation/i18n/locale'

export const fetchProfile = async ({
  locale,
  signal
}: {
  locale: Locale
  signal: AbortSignal
}): Promise<Result<Profile, ApiError>> => {
  const profile = await serveContent({
    content: PROFILE,
    schema: profileSchema,
    signal
  })

  return profile.status === 'failure'
    ? profile
    : Result.success(localizeProfile(profile.data, locale))
}
