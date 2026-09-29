import { fetchProfile } from '@/features/profile/profile-api'
import type { Project } from '@/features/projects/domain/project'
import { PROJECTS } from '@/features/projects/domain/projects-content'
import { fetchProject } from '@/features/projects/infrastructure/projects-api'
import { projectNodeFor } from '@/features/projects/presentation/project-structured-data'
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
  openGraphLocaleFor,
  PAGE_HEADS,
  type PageHead,
  projectHead
} from '@/presentation/head/document-head'
import { structuredDataDocumentFor } from '@/presentation/head/structured-data'
import { LOCALES, type Locale } from '@/presentation/i18n/locale'

export type PrerenderedPage = {
  locale: Locale
  module: string
  page: IndexedPage | `project:${string}`
  path: string
}

export type RenderedPage = PageHead & {
  html: string
}

export { IMAGE_ALTS as imageAlts, openGraphLocaleFor }

const PROJECT_PAGE_PREFIX = 'project:'

const pagesFor = (locale: Locale): PrerenderedPage[] => [
  ...INDEXED_PAGES.map(
    (page): PrerenderedPage => ({
      locale,
      module: pageModuleFor(localizedPaths[page]),
      page,
      path: pagePathFor({ locale, page })
    })
  ),
  ...PROJECTS.map(
    ({ slug }): PrerenderedPage => ({
      locale,
      module: pageModuleFor(localizedPaths.project),
      page: `${PROJECT_PAGE_PREFIX}${slug}`,
      path: projectPathFor({ locale, slug })
    })
  )
]

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
  const profile = await fetchProfile(locale)

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
