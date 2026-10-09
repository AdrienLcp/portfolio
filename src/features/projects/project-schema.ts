import { z } from 'zod/mini'

import {
  localizedUrlSchema,
  textSchema
} from '@/features/content/content-schemas'
import { housePackageNameSchema } from '@/features/packages/house-package-schema'
import type { Project, ProjectText } from '@/features/projects/project'

const projectSlugSchema = z
  .string()
  .check(z.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/))

const npmPackageNameSchema = z
  .string()
  .check(z.regex(/^(?:@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/))

const iconPathSchema = z
  .string()
  .check(z.regex(/^\/images\/icons\/[a-z0-9-]+\.(?:png|svg)$/))

const nonEmptyTextsSchema = z.array(textSchema).check(z.minLength(1))

const tokenSchema = z.strictObject({
  kind: z.enum(['call', 'comment', 'keyword', 'plain', 'string', 'type']),
  start: z.int().check(z.gte(0)),
  text: z.string().check(z.minLength(1))
})

const highlightedExcerptSchema = z.strictObject({
  lines: z
    .array(
      z.strictObject({
        indent: z.string(),
        refusals: z.array(textSchema),
        results: z.array(textSchema),
        sourceLine: z.int().check(z.positive()),
        tokens: z.array(tokenSchema)
      })
    )
    .check(z.minLength(1)),
  refusalCount: z.int().check(z.gte(0))
})

/** A sample with nothing to say has no notes in `ProjectText`, never an empty list. */
const codeSampleSchema = z.strictObject({
  excerpt: highlightedExcerptSchema,
  notes: z.array(textSchema),
  title: textSchema
})

const coverageSchema = z.strictObject({
  lines: z.number().check(z.gte(0), z.lte(100)),
  readOn: z.iso.date(),
  scope: textSchema
})

const appReleaseSchema = z.strictObject({
  category: textSchema,
  countedBy: z.optional(projectSlugSchema),
  entered: z.iso.date(),
  installs: z.array(housePackageNameSchema).check(z.minLength(1)),
  shortName: textSchema.check(z.maxLength(5)),
  state: z.enum(['live', 'shipped'])
})

const projectSchema = z.strictObject({
  coverage: coverageSchema,
  highlights: nonEmptyTextsSchema,
  icon: iconPathSchema,
  keyFacts: nonEmptyTextsSchema.check(z.maxLength(3)),
  kind: z.enum(['app', 'game', 'library']),
  links: z.strictObject({
    documentation: z.optional(localizedUrlSchema),
    live: z.optional(z.url()),
    packages: z.optional(z.array(npmPackageNameSchema).check(z.minLength(1))),
    repository: z.url()
  }),
  name: textSchema,
  release: z.optional(appReleaseSchema),
  samples: z.optional(z.array(codeSampleSchema).check(z.minLength(1))),
  screenshotAlt: textSchema,
  slug: projectSlugSchema,
  stack: nonEmptyTextsSchema,
  summary: textSchema,
  tagline: textSchema
}) satisfies z.ZodMiniType<Project>

const hasUniqueSlugs = (projects: readonly Project[]): boolean =>
  new Set(projects.map((project) => project.slug)).size === projects.length

export const projectsSchema = z
  .array(projectSchema)
  .check(z.minLength(1))
  .check(z.refine(hasUniqueSlugs, { message: 'Two projects share a slug' }))

export const projectTextSchema = z.strictObject({
  coverageScope: textSchema,
  highlights: nonEmptyTextsSchema,
  keyFacts: nonEmptyTextsSchema.check(z.maxLength(3)),
  releaseCategory: z.optional(textSchema),
  sampleNotes: z.optional(z.record(z.string(), nonEmptyTextsSchema)),
  screenshotAlt: textSchema,
  summary: textSchema,
  tagline: textSchema
}) satisfies z.ZodMiniType<ProjectText>
