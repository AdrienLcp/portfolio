import { localizeProfile } from '@/features/profile/profile'
import { PROFILE } from '@/features/profile/profile-content'
import type { Project } from '@/features/projects/project'
import { fetchProject } from '@/features/projects/projects-api'
import { PROJECTS } from '@/features/projects/projects-content'
import {
  localizedPaths,
  pagePathFor,
  projectPathFor
} from '@/infrastructure/router/navigation'
import { pageModuleFor } from '@/infrastructure/router/routes'
import { prerenderPath } from '@/infrastructure/router/static-router'
import {
  IMAGE_ALTS,
  INDEXED_PAGES,
  type IndexedPage,
  PAGE_HEADS,
  projectHead
} from '@/presentation/head/document-head'
import { projectNodeFor } from '@/presentation/head/project-structured-data'
import { structuredDataDocumentFor } from '@/presentation/head/structured-data'
import { LOCALES, type Locale } from '@/presentation/i18n/locale'
import { openGraphLocaleFor } from '@/presentation/i18n/regional-locales'

export type PrerenderedPage = {
  locale: Locale
  /** How Vite's build manifest keys the chunk this page renders. */
  module: string
  /** Listed in the sitemap; otherwise served but marked `noindex`. */
  indexed: boolean
  /** What pairs a page with itself in the other language, for `hreflang`. */
  page: IndexedPage | `project:${string}` | typeof PLAIN_CV_PAGE
  /** Where the document is served, from the site root: `/fr/about`. */
  path: string
}

export type RenderedPage = {
  /** The search snippet, and the line a link unfurls with. */
  description: string
  /**
   * What React rendered: the page's `<title>` and the resources it asks for
   * first, then what goes inside `#root`, so there is something to paint before
   * any script runs.
   */
  html: string
}

export { IMAGE_ALTS as imageAlts, openGraphLocaleFor }

const PROJECT_PAGE_PREFIX = 'project:'

/**
 * A printable copy of the CV page, marked `noindex`: prerendered anyway, so it
 * paints before any script runs like every other page.
 */
export const PLAIN_CV_PAGE = 'cvPlain'

const pagesFor = (locale: Locale): PrerenderedPage[] => [
  ...INDEXED_PAGES.map(
    (page): PrerenderedPage => ({
      indexed: true,
      locale,
      module: pageModuleFor(localizedPaths[page]),
      page,
      path: pagePathFor({ locale, page })
    })
  ),
  {
    indexed: false,
    locale,
    module: pageModuleFor(localizedPaths.cvPlain),
    page: PLAIN_CV_PAGE,
    path: pagePathFor({ locale, page: PLAIN_CV_PAGE })
  },
  ...PROJECTS.map(
    ({ slug }): PrerenderedPage => ({
      indexed: true,
      locale,
      module: pageModuleFor(localizedPaths.project),
      page: `${PROJECT_PAGE_PREFIX}${slug}`,
      path: projectPathFor({ locale, slug })
    })
  )
]

/** Read off the data, so a project added there gets its own document. */
export const prerenderedPages: PrerenderedPage[] = LOCALES.flatMap(pagesFor)

const isProjectPage = (
  page: PrerenderedPage['page']
): page is `project:${string}` => page.startsWith(PROJECT_PAGE_PREFIX)

const projectOf = async ({
  locale,
  page
}: {
  locale: Locale
  page: `project:${string}`
}): Promise<Project> => {
  const project = await fetchProject({
    locale,
    slug: page.slice(PROJECT_PAGE_PREFIX.length)
  })

  if (project.status === 'failure') {
    throw new Error(`${page} could not be read: ${project.error}`)
  }

  return project.data
}

const descriptionFor = async ({
  locale,
  page
}: PrerenderedPage): Promise<string> =>
  isProjectPage(page)
    ? projectHead(await projectOf({ locale, page })).description
    : PAGE_HEADS[locale][page === PLAIN_CV_PAGE ? 'cv' : page].description

export const renderPage = async (
  prerendered: PrerenderedPage
): Promise<RenderedPage> => {
  const html = await prerenderPath(prerendered)

  return { description: await descriptionFor(prerendered), html }
}

export const structuredDataFor = async ({
  origin,
  page: { locale, page, path }
}: {
  origin: string
  page: PrerenderedPage
}): Promise<object> => {
  return structuredDataDocumentFor({
    locale,
    origin,
    pageNodes: isProjectPage(page)
      ? [
          projectNodeFor({
            locale,
            origin,
            path,
            project: await projectOf({ locale, page })
          })
        ]
      : [],
    profile: localizeProfile(PROFILE, locale)
  })
}
