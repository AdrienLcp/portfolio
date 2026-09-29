import { Result } from '@adrienlcp/result'

import {
  localizeProject,
  type Project,
  projectsSchema
} from '@/features/projects/project'
import { PROJECTS } from '@/features/projects/projects-content'
import { type ApiError, serveContent } from '@/infrastructure/api/portfolio-api'
import type { Locale } from '@/presentation/i18n/locale'

export const fetchProjects = async (
  locale: Locale
): Promise<Result<Project[], ApiError>> => {
  const projects = await serveContent(projectsSchema, PROJECTS)

  return projects.status === 'failure'
    ? projects
    : Result.success(
        projects.data.map((project) => localizeProject(project, locale))
      )
}

export const fetchProject = async ({
  locale,
  slug
}: {
  locale: Locale
  slug: string
}): Promise<Result<Project, ApiError>> => {
  const projects = await serveContent(projectsSchema, PROJECTS)

  if (projects.status === 'failure') {
    return projects
  }

  const project = projects.data.find((candidate) => candidate.slug === slug)

  return project === undefined
    ? Result.failure('not_found')
    : Result.success(localizeProject(project, locale))
}
