import { z } from 'zod'

import { localizedTextSchema } from '@/features/content/localized-text'
import type { Locale } from '@/presentation/i18n/locale'

export const projectSlugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)

export const projectSchema = z.strictObject({
  highlights: z.array(localizedTextSchema).min(1),
  links: z.strictObject({
    live: z.url().optional(),
    repository: z.url()
  }),
  name: z.string().trim().min(1),
  slug: projectSlugSchema,
  stack: z.array(z.string().trim().min(1)).min(1),
  summary: localizedTextSchema,
  tagline: localizedTextSchema
})

const hasUniqueSlugs = (projects: readonly ProjectContent[]): boolean =>
  new Set(projects.map((project) => project.slug)).size === projects.length

export const projectsSchema = z
  .array(projectSchema)
  .min(1)
  .refine(hasUniqueSlugs, { message: 'Two projects share a slug' })

export type ProjectContent = z.infer<typeof projectSchema>

export type Project = Omit<
  ProjectContent,
  'highlights' | 'summary' | 'tagline'
> & {
  highlights: string[]
  summary: string
  tagline: string
}

export const localizeProject = (
  project: ProjectContent,
  locale: Locale
): Project => ({
  ...project,
  highlights: project.highlights.map((highlight) => highlight[locale]),
  summary: project.summary[locale],
  tagline: project.tagline[locale]
})
