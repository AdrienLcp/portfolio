import { z } from 'zod'

import { localizedTextSchema } from '@/features/content/localized-text'
import { textSchema } from '@/features/content/text'
import { housePackageNameSchema } from '@/features/packages/house-package'
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

/** What the project is, which decides how its page talks about it. */
const projectKindSchema = z.enum(['app', 'game', 'library'])

/** Whether the app is a finished release or a service running in public. */
const releaseStateSchema = z.enum(['live', 'shipped'])

/** The project's row in the home page's register of releases. */
const registerEntrySchema = z.strictObject({
  /** What sort of app it is, printed after "App ·" ("party games · live"). */
  category: localizedTextSchema,
  /** The analytics project its page views are sent to, by slug. */
  countedBy: projectSlugSchema.optional(),
  entered: z.iso.date(),
  installs: z.array(housePackageNameSchema).min(1),
  /** Heads the project's column in the package matrix ("Tav."). */
  shortName: textSchema.max(5),
  state: releaseStateSchema
})

const projectSchema = z.strictObject({
  highlights: z.array(localizedTextSchema).min(1),
  kind: projectKindSchema,
  links: z.strictObject({
    live: z.url().optional(),
    packages: z.array(npmPackageNameSchema).min(1).optional(),
    repository: z.url()
  }),
  name: textSchema,
  register: registerEntrySchema.optional(),
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

export type ProjectKind = z.infer<typeof projectKindSchema>

export type ReleaseState = z.infer<typeof releaseStateSchema>

export type CodeSample = z.infer<typeof codeSampleSchema>

export type ProjectContent = z.infer<typeof projectSchema>

type RegisterEntryContent = z.infer<typeof registerEntrySchema>

export type RegisterEntry = Omit<RegisterEntryContent, 'category'> & {
  category: string
}

export type Project = Omit<
  ProjectContent,
  'highlights' | 'register' | 'summary' | 'tagline'
> & {
  highlights: string[]
  register?: RegisterEntry
  summary: string
  tagline: string
}

export const localizeProject = (
  { register, ...project }: ProjectContent,
  locale: Locale
): Project => ({
  ...project,
  highlights: project.highlights.map((highlight) => highlight[locale]),
  ...(register !== undefined && {
    register: { ...register, category: register.category[locale] }
  }),
  summary: project.summary[locale],
  tagline: project.tagline[locale]
})

export const npmPageFor = (packageName: string): string =>
  `https://www.npmjs.com/package/${packageName}`
