import { fetchHousePackages } from '@/features/packages/house-packages-api'
import { fetchProjects } from '@/features/projects/projects-api'
import { useRouteData } from '@/infrastructure/router/navigation'
import type { Locale } from '@/presentation/i18n/locale'

export const homeLoader = (locale: Locale) => ({
  housePackages: fetchHousePackages(locale),
  projects: fetchProjects(locale)
})

export const useHomeData = () => useRouteData<typeof homeLoader>()
