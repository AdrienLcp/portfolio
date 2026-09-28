import type { LoaderFunctionArgs, Params } from 'react-router'

import {
  fetchCv,
  fetchProfile,
  fetchProject,
  fetchProjects
} from '@/infrastructure/api/portfolio-api'
import {
  DEFAULT_LOCALE,
  isLocale,
  type Locale
} from '@/presentation/i18n/locale'

/**
 * A path whose first segment is no locale still runs its loader before
 * `LocalePrefixedRoutes` redirects it, so the loader needs a locale to use.
 */
const localeParam = ({ locale }: Params): Locale =>
  locale !== undefined && isLocale(locale) ? locale : DEFAULT_LOCALE

/**
 * Loaders hand back their promise unawaited: the navigation commits at once and
 * only the region that reads it suspends.
 */
export const projectsLoader = ({ params }: LoaderFunctionArgs) => ({
  projects: fetchProjects(localeParam(params))
})

export const projectLoader = ({ params }: LoaderFunctionArgs) => ({
  project: fetchProject({
    locale: localeParam(params),
    slug: params.slug ?? ''
  })
})

export const cvLoader = ({ params }: LoaderFunctionArgs) => {
  const locale = localeParam(params)

  return { cv: fetchCv(locale), profile: fetchProfile(locale) }
}
