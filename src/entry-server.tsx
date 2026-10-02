import { fetchProfile } from '@/features/profile/profile-api'
import type { Project } from '@/features/projects/project'
import { fetchProject } from '@/features/projects/projects-api'
import { PROJECTS } from '@/features/projects/projects-content'
import { DRAWN_SLUGS, plateModuleFor } from '@/features/register/plates'
import {
  localizedPaths,
  pagePathFor,
  projectPathFor
} from '@/infrastructure/router/navigation'
import { loaderModuleFor, pageModuleFor } from '@/infrastructure/router/routes'
import { prerenderPath } from '@/infrastructure/router/static-router'
import {
  IMAGE_ALTS,
  INDEXED_PAGES,
  type IndexedPage,
  PAGE_HEADS,
  type PageHead,
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
  /**
   * The modules its loader imports on demand, preloaded so the app takes over
   * the prerendered page without another round trip.
   */
  dataModules: string[]
  /** What pairs a page with itself in the other language, for `hreflang`. */
  page: IndexedPage | `project:${string}`
  /** Where the document is served, from the site root: `/fr/about`. */
  path: string
}

export type RenderedPage = PageHead & {
  /**
   * What goes inside `#root`, so there is something to paint before any script
   * runs.
   */
  html: string
}

export { IMAGE_ALTS as imageAlts, openGraphLocaleFor }

const PROJECT_PAGE_PREFIX = 'project:'

/** A prerender reads each page once; nothing ever supersedes it. */
const UNSUPERSEDED = new AbortController().signal

const platesModulesFor = (slugs: readonly string[]): string[] =>
  slugs.flatMap((slug) => plateModuleFor(slug) ?? [])

/**
 * The plain CV is left out on purpose: it is a printable copy of the CV page,
 * marked `noindex`, and served by the SPA fallback.
 */
const pagesFor = (locale: Locale): PrerenderedPage[] => [
  ...INDEXED_PAGES.map(
    (page): PrerenderedPage => ({
      dataModules: [
        loaderModuleFor(localizedPaths[page]),
        ...(page === 'home' ? platesModulesFor(DRAWN_SLUGS) : [])
      ],
      locale,
      module: pageModuleFor(localizedPaths[page]),
      page,
      path: pagePathFor({ locale, page })
    })
  ),
  ...PROJECTS.map(
    ({ slug }): PrerenderedPage => ({
      dataModules: [
        loaderModuleFor(localizedPaths.project),
        ...platesModulesFor([slug])
      ],
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
    signal: UNSUPERSEDED,
    slug: page.slice(PROJECT_PAGE_PREFIX.length)
  })

  if (project.status === 'failure') {
    throw new Error(`${page} could not be read: ${project.error}`)
  }

  return project.data
}

const headFor = async ({ locale, page }: PrerenderedPage): Promise<PageHead> =>
  isProjectPage(page)
    ? projectHead(await projectOf({ locale, page }))
    : PAGE_HEADS[locale][page]

export const renderPage = async (
  prerendered: PrerenderedPage
): Promise<RenderedPage> => {
  const html = await prerenderPath(prerendered)

  return { ...(await headFor(prerendered)), html }
}

export const structuredDataFor = async ({
  origin,
  page: { locale, page, path }
}: {
  origin: string
  page: PrerenderedPage
}): Promise<object> => {
  const profile = await fetchProfile({ locale, signal: UNSUPERSEDED })

  if (profile.status === 'failure') {
    throw new Error(`The profile could not be read: ${profile.error}`)
  }

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
    profile: profile.data
  })
}
