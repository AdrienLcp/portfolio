import { localizeCv } from '@/features/cv/cv'
import { CV } from '@/features/cv/cv-content'
import { localizeProfile } from '@/features/profile/profile'
import { PROFILE } from '@/features/profile/profile-content'
import { useRouteData } from '@/infrastructure/router/navigation'
import type { Locale } from '@/presentation/i18n/locale'

export const cvLoader = ({ locale }: { locale: Locale }) => ({
  cv: localizeCv(CV, locale),
  profile: localizeProfile(PROFILE, locale)
})

export const useCvData = () => useRouteData<typeof cvLoader>()
