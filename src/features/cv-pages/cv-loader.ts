import { fetchCv } from '@/features/cv/cv-api'
import { fetchProfile } from '@/features/profile/profile-api'
import { useRouteData } from '@/infrastructure/router/navigation'
import type { Locale } from '@/presentation/i18n/locale'

export const cvLoader = ({
  locale,
  signal
}: {
  locale: Locale
  signal: AbortSignal
}) => ({
  cv: fetchCv({ locale, signal }),
  profile: fetchProfile({ locale, signal })
})

export const useCvData = () => useRouteData<typeof cvLoader>()
