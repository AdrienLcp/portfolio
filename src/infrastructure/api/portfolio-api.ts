import { Result } from '@adrienlcp/result'
import type { z } from 'zod'

import { type Cv, cvSchema, localizeCv } from '@/features/cv/cv'
import {
  localizeProfile,
  type Profile,
  profileSchema
} from '@/features/profile/profile'
import {
  localizeProject,
  type Project,
  projectsSchema
} from '@/features/projects/project'
import type { Locale } from '@/presentation/i18n/locale'

import { CV } from './data/cv'
import { PROFILE } from './data/profile'
import { PROJECTS } from './data/projects'

export type ApiError = 'invalid_content' | 'not_found'

/** Development only, where it makes pending states visible; a prerendered page must not pay it. */
const SIMULATED_LATENCY_MS = import.meta.env.DEV ? 300 : 0

const simulateLatency = (): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, SIMULATED_LATENCY_MS)
  })

const parseContent = async <T>(
  schema: z.ZodType<T>,
  content: unknown
): Promise<Result<T, ApiError>> => {
  await simulateLatency()
  const parsed = schema.safeParse(content)

  return parsed.success
    ? Result.success(parsed.data)
    : Result.failure('invalid_content')
}

export const fetchProfile = async (
  locale: Locale
): Promise<Result<Profile, ApiError>> => {
  const profile = await parseContent(profileSchema, PROFILE)

  return profile.status === 'failure'
    ? profile
    : Result.success(localizeProfile(profile.data, locale))
}

export const fetchCv = async (
  locale: Locale
): Promise<Result<Cv, ApiError>> => {
  const cv = await parseContent(cvSchema, CV)

  return cv.status === 'failure'
    ? cv
    : Result.success(localizeCv(cv.data, locale))
}

export const fetchProjects = async (
  locale: Locale
): Promise<Result<Project[], ApiError>> => {
  const projects = await parseContent(projectsSchema, PROJECTS)

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
  const projects = await parseContent(projectsSchema, PROJECTS)

  if (projects.status === 'failure') {
    return projects
  }

  const project = projects.data.find((candidate) => candidate.slug === slug)

  return project === undefined
    ? Result.failure('not_found')
    : Result.success(localizeProject(project, locale))
}
