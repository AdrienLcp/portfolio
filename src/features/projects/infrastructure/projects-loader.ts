import { fetchProjects } from '@/features/projects/infrastructure/projects-api'
import { useRouteData } from '@/infrastructure/router/navigation'
import type { Locale } from '@/presentation/i18n/locale'

export const projectsLoader = (locale: Locale) => ({
  projects: fetchProjects(locale)
})

export const useProjectsData = () => useRouteData<typeof projectsLoader>()
