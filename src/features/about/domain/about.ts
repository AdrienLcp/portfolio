import { z } from 'zod'

import { localizedTextSchema } from '@/features/content/localized-text'
import type { Locale } from '@/presentation/i18n/locale'

/**
 * Where a step stands today:
 * - `'paused'` — left off, and picked up again later
 * - `'closed'` — over for good
 * - `'current'` — where he stands now; the path holds one
 */
const stepStateSchema = z.enum(['closed', 'current', 'paused'])

/** One row of the path, oldest first. */
const stepSchema = z.strictObject({
  /** How long, or when: the path rarely knows both. */
  mark: localizedTextSchema,
  /** Printed small under the mark. */
  markNote: localizedTextSchema.optional(),
  paragraphs: z.array(localizedTextSchema).min(1),
  state: stepStateSchema,
  title: localizedTextSchema,
  /** The place or the job, under the title. */
  where: localizedTextSchema
})

export const aboutSchema = z.strictObject({
  steps: z.array(stepSchema).min(1)
})

type AboutContent = z.infer<typeof aboutSchema>

export type StepState = z.infer<typeof stepStateSchema>

export type Step = {
  mark: string
  markNote?: string
  paragraphs: string[]
  state: StepState
  title: string
  where: string
}

export type About = { steps: Step[] }

export const localizeAbout = (about: AboutContent, locale: Locale): About => ({
  steps: about.steps.map((step) => ({
    mark: step.mark[locale],
    markNote: step.markNote?.[locale],
    paragraphs: step.paragraphs.map((paragraph) => paragraph[locale]),
    state: step.state,
    title: step.title[locale],
    where: step.where[locale]
  }))
})
