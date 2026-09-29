import type { LoaderFunctionArgs, Params } from 'react-router'

import {
  fetchAbout,
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

const localeParam = ({ locale }: Params): Locale =>
  locale !== undefined && isLocale(locale) ? locale : DEFAULT_LOCALE

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

export const aboutLoader = ({ params }: LoaderFunctionArgs) => {
  const locale = localeParam(params)

  return { about: fetchAbout(locale), cv: fetchCv(locale) }
}
