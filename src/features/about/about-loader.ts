import { fetchAbout } from '@/features/about/about-api'
import { fetchCv } from '@/features/cv/cv-api'
import { useRouteData } from '@/infrastructure/router/navigation'
import type { Locale } from '@/presentation/i18n/locale'

export const aboutLoader = (locale: Locale) => ({
  about: fetchAbout(locale),
  cv: fetchCv(locale)
})

export const useAboutData = () => useRouteData<typeof aboutLoader>()
