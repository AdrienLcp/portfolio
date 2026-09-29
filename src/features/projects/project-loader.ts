import { fetchProject } from '@/infrastructure/api/portfolio-api'
import { useRouteData } from '@/infrastructure/router/navigation'
import type { Locale } from '@/presentation/i18n/locale'

export const projectLoader = ({
  locale,
  slug
}: {
  locale: Locale
  slug: string
}) => ({
  project: fetchProject({ locale, slug })
})

export const useProjectData = () => useRouteData<typeof projectLoader>()
