import { fetchHousePackages } from '@/features/packages/house-packages-api'
import { fetchProjects } from '@/features/projects/projects-api'
import { DRAWN_SLUGS, loadPlates } from '@/features/register/plates'
import { useRouteData } from '@/infrastructure/router/navigation'
import type { Locale } from '@/presentation/i18n/locale'

export const homeLoader = ({
  locale,
  signal
}: {
  locale: Locale
  signal: AbortSignal
}) => ({
  housePackages: fetchHousePackages({ locale, signal }),
  plates: loadPlates(DRAWN_SLUGS),
  projects: fetchProjects({ locale, signal })
})

export const useHomeData = () => useRouteData<typeof homeLoader>()
