import { z } from 'zod'

import { localizedTextSchema } from '@/features/content/localized-text'
import { textSchema } from '@/features/content/text'
import { housePackageNameSchema } from '@/features/packages/house-package'
import type { Locale } from '@/presentation/i18n/locale'

const projectSlugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)

const npmPackageNameSchema = z
  .string()
  .regex(/^(?:@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/)

/**
 * An excerpt set the way an editor shows it, titled with what it is taken
 * from. A line `// ✗ message` is the compiler refusing the line above it; a
 * line `// → text` is what the compiler infers for the line above, or what
 * that line produces.
 */
const codeSampleSchema = z.strictObject({
  code: textSchema,
  /** What the excerpt proves, printed beside it. */
  notes: z.array(localizedTextSchema).min(1).optional(),
  title: textSchema
})

const historyLineSchema = z.strictObject({
  date: z.iso.date(),
  /** The commit's subject, as written in the log. */
  subject: textSchema
})

/** The project's git log, abridged by hand, counted on the day it was read. */
const historySchema = z.strictObject({
  /** Commits on the main branch on `readOn`. */
  commits: z.number().int().positive(),
  /** Newest first; the last line is the first commit. */
  lines: z.array(historyLineSchema).min(1),
  readOn: z.iso.date()
})

/**
 * The share of source lines the unit tests run, measured in the project's
 * repository by `pnpm coverage:read`.
 */
const coverageSchema = z.strictObject({
  lines: z.number().min(0).max(100),
  readOn: z.iso.date(),
  /** What the figure measures ("unit tests, server and game rules"). */
  scope: localizedTextSchema
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
  coverage: coverageSchema,
  highlights: z.array(localizedTextSchema).min(1),
  history: historySchema,
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

type CodeSampleContent = z.infer<typeof codeSampleSchema>

export type CodeSample = Omit<CodeSampleContent, 'notes'> & {
  notes: string[]
}

export type ProjectHistory = z.infer<typeof historySchema>

export type ProjectContent = z.infer<typeof projectSchema>

type RegisterEntryContent = z.infer<typeof registerEntrySchema>

export type RegisterEntry = Omit<RegisterEntryContent, 'category'> & {
  category: string
}

type CoverageContent = z.infer<typeof coverageSchema>

export type Coverage = Omit<CoverageContent, 'scope'> & { scope: string }

export type Project = Omit<
  ProjectContent,
  'coverage' | 'highlights' | 'register' | 'samples' | 'summary' | 'tagline'
> & {
  coverage: Coverage
  highlights: string[]
  register?: RegisterEntry
  samples?: CodeSample[]
  summary: string
  tagline: string
}

export const localizeProject = (
  { coverage, register, samples, ...project }: ProjectContent,
  locale: Locale
): Project => ({
  ...project,
  coverage: { ...coverage, scope: coverage.scope[locale] },
  highlights: project.highlights.map((highlight) => highlight[locale]),
  ...(register !== undefined && {
    register: { ...register, category: register.category[locale] }
  }),
  ...(samples !== undefined && {
    samples: samples.map(({ notes, ...sample }) => ({
      ...sample,
      notes: notes?.map((note) => note[locale]) ?? []
    }))
  }),
  summary: project.summary[locale],
  tagline: project.tagline[locale]
})

export const npmPageFor = (packageName: string): string =>
  `https://www.npmjs.com/package/${packageName}`
