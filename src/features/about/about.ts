import { z } from 'zod'

import { localizedTextSchema } from '@/features/content/localized-text'
import type { Locale } from '@/presentation/i18n/locale'

const stepSchema = z.strictObject({
  mark: localizedTextSchema,
  text: localizedTextSchema,
  title: localizedTextSchema
})

export const aboutSchema = z.strictObject({
  steps: z.array(stepSchema).min(1)
})

type AboutContent = z.infer<typeof aboutSchema>

export type Step = { mark: string; text: string; title: string }

export type About = { steps: Step[] }

export const localizeAbout = (about: AboutContent, locale: Locale): About => ({
  steps: about.steps.map((step) => ({
    mark: step.mark[locale],
    text: step.text[locale],
    title: step.title[locale]
  }))
})
