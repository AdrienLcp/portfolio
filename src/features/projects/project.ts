import { z } from 'zod'

import { localizedTextSchema } from '@/features/content/localized-text'
import { textSchema } from '@/features/content/text'
import type { Locale } from '@/presentation/i18n/locale'

const projectSlugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)

const npmPackageNameSchema = z
  .string()
  .regex(/^(?:@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/)

/** A snippet printed in the booklet, titled with what it is taken from. */
const codeSampleSchema = z.strictObject({
  code: textSchema,
  title: textSchema
})

const projectSchema = z.strictObject({
  highlights: z.array(localizedTextSchema).min(1),
  links: z.strictObject({
    live: z.url().optional(),
    packages: z.array(npmPackageNameSchema).min(1).optional(),
    repository: z.url()
  }),
  name: textSchema,
  samples: z.array(codeSampleSchema).min(1).optional(),
  slug: projectSlugSchema,
  stack: z.array(textSchema).min(1),
  summary: localizedTextSchema,
  tagline: localizedTextSchema
})

const hasUniqueSlugs = (projects: readonly ProjectContent[]): boolean =>
  new Set(projects.map((project) => project.slug)).size === projects.length

export const projectsSchema = z
  .array(projectSchema)
  .min(1)
  .refine(hasUniqueSlugs, { message: 'Two projects share a slug' })

export type CodeSample = z.infer<typeof codeSampleSchema>

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

export const npmPageFor = (packageName: string): string =>
  `https://www.npmjs.com/package/${packageName}`
