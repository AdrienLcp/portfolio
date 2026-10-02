import { fetchHousePackages } from '@/features/packages/house-packages-api'
import { fetchProject, fetchProjects } from '@/features/projects/projects-api'
import { loadPlates } from '@/features/register/plates'
import { useRouteData } from '@/infrastructure/router/navigation'
import type { Locale } from '@/presentation/i18n/locale'

/** The entry, its drawings, and the rest of the register it is read against. */
export const projectLoader = ({
  locale,
  slug
}: {
  locale: Locale
  slug: string
}) => ({
  housePackages: fetchHousePackages(locale),
  plates: loadPlates([slug]),
  project: fetchProject({ locale, slug }),
  projects: fetchProjects(locale)
})

export const useProjectData = () => useRouteData<typeof projectLoader>()
