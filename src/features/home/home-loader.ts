import { housePackagesIn } from '@/features/packages/house-packages-in-locale'
import { fetchProjects } from '@/features/projects/projects-api'
import { useRouteData } from '@/infrastructure/router/navigation'
import type { Locale } from '@/presentation/i18n/locale'

export const homeLoader = async ({ locale }: { locale: Locale }) => ({
  housePackages: housePackagesIn(locale),
  projects: await fetchProjects(locale)
})

export const useHomeData = () => useRouteData<typeof homeLoader>()
