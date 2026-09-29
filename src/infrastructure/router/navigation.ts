import {
  generatePath,
  isRouteErrorResponse,
  type PathParam,
  useLoaderData,
  useLocation,
  useRouteError
} from 'react-router'

import { isLocale, type Locale } from '@/presentation/i18n/locale'

export const localizedPaths = {
  about: '/:locale/about',
  contact: '/:locale/contact',
  cv: '/:locale/cv',
  cvPlain: '/:locale/cv/plain',
  home: '/:locale',
  project: '/:locale/projects/:slug',
  projects: '/:locale/projects'
} as const

export const paths = {
  ...localizedPaths,
  root: '/'
} as const

const pathFor = <TPath extends string>(
  path: TPath,
  params: Record<PathParam<TPath>, string>
): string => generatePath<string>(path, params)

export const homePathFor = (locale: Locale): string =>
  pathFor(paths.home, { locale })

export const aboutPathFor = (locale: Locale): string =>
  pathFor(paths.about, { locale })

export const contactPathFor = (locale: Locale): string =>
  pathFor(paths.contact, { locale })

export const cvPathFor = (locale: Locale): string =>
  pathFor(paths.cv, { locale })

export const cvPlainPathFor = (locale: Locale): string =>
  pathFor(paths.cvPlain, { locale })

export const projectsPathFor = (locale: Locale): string =>
  pathFor(paths.projects, { locale })

export const projectPathFor = ({
  locale,
  slug
}: {
  locale: Locale
  slug: string
}): string => pathFor(paths.project, { locale, slug })

export const useRouteData = <TLoader extends (...args: never[]) => unknown>() =>
  useLoaderData<TLoader>()

export const localizedPathFor = ({
  locale,
  pathname
}: {
  locale: Locale
  pathname: string
}): string =>
  pathname === paths.root ? homePathFor(locale) : `/${locale}${pathname}`

export const localeInPath = (pathname: string): Locale | null => {
  const segment = pathname.split('/')[1]

  return segment !== undefined && isLocale(segment) ? segment : null
}

export const pathInLocale = ({
  locale,
  pathname
}: {
  locale: Locale
  pathname: string
}): string | null => {
  const [, first, ...rest] = pathname.split('/')

  return first !== undefined && isLocale(first)
    ? ['', locale, ...rest].join('/')
    : null
}

export const useCurrentPath = (): string => useLocation().pathname

export const useRouteFailure = (): string => {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return `${error.status} ${error.statusText}`
  }

  return error instanceof Error ? error.message : String(error)
}
