import type { LocalizedText } from '@/features/content/localized-text'
import type { Locale } from '@/presentation/i18n/locale'

/**
 * Where a step stands today:
 * - `'paused'` — left off, and picked up again later
 * - `'closed'` — over for good
 * - `'current'` — where he stands now; the path holds one
 */
export type StepState = 'closed' | 'current' | 'paused'

/** One step of the path, oldest first. */
type StepContent = {
  /** How long, or when: the path rarely knows both. */
  mark: LocalizedText
  /** Printed small under the mark. */
  markNote?: LocalizedText
  paragraphs: LocalizedText[]
  state: StepState
  title: LocalizedText
  /** The place or the job, under the title. */
  where: LocalizedText
}

export type AboutContent = { steps: StepContent[] }

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
