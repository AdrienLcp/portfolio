import { localizeAbout } from '@/features/about/domain/about'
import { ABOUT } from '@/features/about/domain/about-content'
import { localizeCv } from '@/features/cv/cv'
import { CV } from '@/features/cv/cv-content'
import { fetchProjects } from '@/features/projects/projects-api'
import { useRouteData } from '@/infrastructure/router/navigation'
import type { Locale } from '@/presentation/i18n/locale'

export const aboutLoader = async ({ locale }: { locale: Locale }) => ({
  about: localizeAbout(ABOUT, locale),
  cv: localizeCv(CV, locale),
  projects: await fetchProjects(locale)
})

export const useAboutData = () => useRouteData<typeof aboutLoader>()
