import {
  generatePath,
  isRouteErrorResponse,
  type PathParam,
  useLoaderData,
  useLocation,
  useRouteError
} from 'react-router'

import { isLocale, type Locale } from '@/presentation/i18n/locale'

/**
 * Every indexable page names its language, because a search index keeps one
 * document per URL and never varies `Accept-Language`.
 */
export const localizedPaths = {
  about: '/:locale/about',
  contact: '/:locale/contact',
  cv: '/:locale/cv',
  cvPlain: '/:locale/cv/plain',
  home: '/:locale',
  project: '/:locale/projects/:slug'
} as const

export const paths = {
  ...localizedPaths,
  /** What `hreflang="x-default"` points at: it negotiates and redirects. */
  root: '/'
} as const

/**
 * A record over `PathParam` rather than `generatePath`'s own params type, which
 * accepts any name in silence: a missing or misspelled param fails to compile.
 */
const pathFor = <TPath extends string>(
  path: TPath,
  params: Record<PathParam<TPath>, string>
): string => generatePath<string>(path, params)

export const pagePathFor = ({
  locale,
  page
}: {
  locale: Locale
  page: Exclude<keyof typeof localizedPaths, 'project'>
}): string => pathFor(localizedPaths[page], { locale })

export const homePathFor = (locale: Locale): string =>
  pathFor(paths.home, { locale })

export const aboutPathFor = (locale: Locale): string =>
  pathFor(paths.about, { locale })

export const contactPathFor = (locale: Locale): string =>
  pathFor(paths.contact, { locale })

export const cvPathFor = (locale: Locale): string =>
  pathFor(paths.cv, { locale })

/** The register on the home page, where every project has its row. */
export const registerPathFor = (locale: Locale): string =>
  `${homePathFor(locale)}#register`

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

/** The same page in another language, or `null` on a path that names none. */
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

/** The route error flattened to one line, whatever was thrown. */
export const useRouteFailure = (): string => {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return `${error.status} ${error.statusText}`
  }

  return error instanceof Error ? error.message : String(error)
}
