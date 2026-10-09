import { Result } from '@adrienlcp/result'

import {
  type Project,
  type ProjectText,
  projectInLocale
} from '@/features/projects/project'
import { PROJECTS } from '@/features/projects/projects-content'
import type { ApiError } from '@/infrastructure/api/api-error'
import type { Locale } from '@/presentation/i18n/locale'

type ProjectsText = Record<string, ProjectText>

/** One chunk per language, so a page downloads its own language's words only. */
const PROJECTS_TEXT_LOADERS: Record<Locale, () => Promise<ProjectsText>> = {
  en: async () => (await import('./projects-content-en')).PROJECTS_TEXT_EN,
  fr: async () => (await import('./projects-content-fr')).PROJECTS_TEXT_FR
}

const isProject = (project: Project | undefined): project is Project =>
  project !== undefined

/** Fails when a project has no words in the requested language. */
export const fetchProjects = async (
  locale: Locale
): Promise<Result<Project[], ApiError>> => {
  const text = await PROJECTS_TEXT_LOADERS[locale]()
  const projects = PROJECTS.map((project) =>
    projectInLocale(project, text[project.slug])
  ).filter(isProject)

  return projects.length === PROJECTS.length
    ? Result.success(projects)
    : Result.failure('invalid_content')
}

export const fetchProject = async ({
  locale,
  slug
}: {
  locale: Locale
  slug: string
}): Promise<Result<Project, ApiError>> => {
  const projects = await fetchProjects(locale)

  if (projects.status === 'failure') {
    return projects
  }

  const project = projects.data.find((candidate) => candidate.slug === slug)

  return project === undefined
    ? Result.failure('not_found')
    : Result.success(project)
}
