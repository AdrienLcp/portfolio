import { fetchAbout } from '@/features/about/infrastructure/about-api'
import { fetchCv } from '@/features/cv/cv-api'
import { fetchProjects } from '@/features/projects/projects-api'
import { useRouteData } from '@/infrastructure/router/navigation'
import type { Locale } from '@/presentation/i18n/locale'

export const aboutLoader = ({
  locale,
  signal
}: {
  locale: Locale
  signal: AbortSignal
}) => ({
  about: fetchAbout({ locale, signal }),
  cv: fetchCv({ locale, signal }),
  projects: fetchProjects({ locale, signal })
})

export const useAboutData = () => useRouteData<typeof aboutLoader>()
