import { fetchHousePackages } from '@/features/packages/house-packages-api'
import { fetchProject, fetchProjects } from '@/features/projects/projects-api'
import { loadPlates } from '@/features/register/plates'
import { useRouteData } from '@/infrastructure/router/navigation'
import type { Locale } from '@/presentation/i18n/locale'

/** The entry, its drawings, and the rest of the register it is read against. */
export const projectLoader = ({
  locale,
  signal,
  slug
}: {
  locale: Locale
  signal: AbortSignal
  slug: string
}) => ({
  housePackages: fetchHousePackages({ locale, signal }),
  plates: loadPlates([slug]),
  project: fetchProject({ locale, signal, slug }),
  projects: fetchProjects({ locale, signal })
})

export const useProjectData = () => useRouteData<typeof projectLoader>()
