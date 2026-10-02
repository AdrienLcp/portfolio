import { fetchHousePackages } from '@/features/packages/house-packages-api'
import { fetchProject, fetchProjects } from '@/features/projects/projects-api'
import { useRouteData } from '@/infrastructure/router/navigation'
import type { Locale } from '@/presentation/i18n/locale'

/** The entry, and the rest of the register it is read against. */
export const projectLoader = ({
  locale,
  slug
}: {
  locale: Locale
  slug: string
}) => ({
  housePackages: fetchHousePackages(locale),
  project: fetchProject({ locale, slug }),
  projects: fetchProjects(locale)
})

export const useProjectData = () => useRouteData<typeof projectLoader>()
