import { z } from 'zod/mini'

import {
  localizedTextSchema,
  localizedUrlSchema,
  textSchema
} from '@/features/content/content-schemas'
import type { CvContent } from '@/features/cv/cv'

const monthSchema = z.string().check(z.regex(/^\d{4}(?:-(?:0[1-9]|1[0-2]))?$/))

const periodSchema = z.strictObject({
  from: monthSchema,
  to: z.optional(monthSchema)
})

const termSchema = z.union([textSchema, localizedTextSchema])

const missionSchema = z.strictObject({
  period: z.optional(periodSchema),
  points: z.array(localizedTextSchema),
  summary: localizedTextSchema,
  title: localizedTextSchema
})

export const cvSchema = z.strictObject({
  contact: z.strictObject({
    email: z.email(),
    location: localizedTextSchema,
    phone: z.string().check(z.regex(/^\+\d{11}$/)),
    website: z.url()
  }),
  education: z
    .array(
      z.strictObject({
        detail: localizedTextSchema,
        school: textSchema,
        title: localizedTextSchema,
        year: monthSchema
      })
    )
    .check(z.minLength(1)),
  extras: z.array(localizedTextSchema),
  headline: textSchema,
  jobs: z
    .array(
      z.strictObject({
        employer: textSchema,
        missions: z.array(missionSchema).check(z.minLength(1)),
        period: periodSchema,
        place: textSchema,
        points: z.array(localizedTextSchema),
        title: localizedTextSchema
      })
    )
    .check(z.minLength(1)),
  projects: z.array(
    z.strictObject({
      link: z.union([z.url(), localizedUrlSchema]),
      name: textSchema,
      summary: localizedTextSchema,
      year: monthSchema
    })
  ),
  skills: z
    .array(
      z.strictObject({
        group: localizedTextSchema,
        terms: z.array(termSchema).check(z.minLength(1))
      })
    )
    .check(z.minLength(1)),
  specs: z.array(
    z.strictObject({ label: localizedTextSchema, value: localizedTextSchema })
  ),
  summary: localizedTextSchema,
  title: localizedTextSchema
}) satisfies z.ZodMiniType<CvContent>
