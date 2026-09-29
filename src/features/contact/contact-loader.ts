import { fetchCv } from '@/features/cv/cv-api'
import { fetchProfile } from '@/features/profile/profile-api'
import { useRouteData } from '@/infrastructure/router/navigation'
import type { Locale } from '@/presentation/i18n/locale'

export const contactLoader = (locale: Locale) => ({
  cv: fetchCv(locale),
  profile: fetchProfile(locale)
})

export const useContactData = () => useRouteData<typeof contactLoader>()
