import { loadPlates } from '@/features/app-drawings/plates'
import { housePackagesIn } from '@/features/packages/house-packages-in-locale'
import { fetchProject, fetchProjects } from '@/features/projects/projects-api'
import { useRouteData } from '@/infrastructure/router/navigation'
import type { Locale } from '@/presentation/i18n/locale'

/** The project, its drawings, and the rest of the index it is read against. */
export const projectLoader = async ({
  locale,
  slug
}: {
  locale: Locale
  slug: string
}) => {
  const [plates, project, projects] = await Promise.all([
    loadPlates([slug], locale),
    fetchProject({ locale, slug }),
    fetchProjects(locale)
  ])

  return {
    housePackages: housePackagesIn(locale),
    plates,
    project,
    projects
  }
}

export const useProjectData = () => useRouteData<typeof projectLoader>()
