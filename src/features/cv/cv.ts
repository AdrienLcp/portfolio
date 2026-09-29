import { z } from 'zod'

import {
  type LocalizedText,
  localizedTextSchema
} from '@/features/content/localized-text'
import type { Locale } from '@/presentation/i18n/locale'

const textSchema = z.string().trim().min(1)

const monthSchema = z.string().regex(/^\d{4}(?:-(?:0[1-9]|1[0-2]))?$/)

const periodSchema = z.strictObject({
  from: monthSchema,
  to: monthSchema.optional()
})

const termSchema = z.union([textSchema, localizedTextSchema])

const missionSchema = z.strictObject({
  period: periodSchema.optional(),
  points: z.array(localizedTextSchema),
  summary: localizedTextSchema,
  title: localizedTextSchema
})

export const cvSchema = z.strictObject({
  contact: z.strictObject({
    email: z.email(),
    location: localizedTextSchema,
    phone: z.string().regex(/^\+\d{11}$/),
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
    .min(1),
  extras: z.array(localizedTextSchema),
  headline: textSchema,
  jobs: z
    .array(
      z.strictObject({
        employer: textSchema,
        missions: z.array(missionSchema).min(1),
        period: periodSchema,
        place: textSchema,
        points: z.array(localizedTextSchema),
        title: localizedTextSchema
      })
    )
    .min(1),
  projects: z.array(
    z.strictObject({
      link: z.url(),
      name: textSchema,
      summary: localizedTextSchema,
      year: monthSchema
    })
  ),
  skills: z
    .array(
      z.strictObject({
        group: localizedTextSchema,
        terms: z.array(termSchema).min(1)
      })
    )
    .min(1),
  specs: z.array(
    z.strictObject({ label: localizedTextSchema, value: localizedTextSchema })
  ),
  summary: localizedTextSchema,
  title: localizedTextSchema
})

export type CvContent = z.infer<typeof cvSchema>

export type Period = z.infer<typeof periodSchema>

export type Mission = {
  period?: Period
  points: string[]
  summary: string
  title: string
}

export type Cv = {
  contact: Omit<CvContent['contact'], 'location'> & { location: string }
  education: { detail: string; school: string; title: string; year: string }[]
  extras: string[]
  headline: string
  jobs: {
    employer: string
    missions: Mission[]
    period: Period
    place: string
    points: string[]
    title: string
  }[]
  projects: { link: string; name: string; summary: string; year: string }[]
  skills: { group: string; terms: string[] }[]
  specs: { label: string; value: string }[]
  summary: string
  title: string
}

export const localizeCv = (cv: CvContent, locale: Locale): Cv => {
  const text = (localized: LocalizedText): string => localized[locale]
  const term = (value: z.infer<typeof termSchema>): string =>
    typeof value === 'string' ? value : value[locale]

  return {
    contact: { ...cv.contact, location: text(cv.contact.location) },
    education: cv.education.map((entry) => ({
      ...entry,
      detail: text(entry.detail),
      title: text(entry.title)
    })),
    extras: cv.extras.map(text),
    headline: cv.headline,
    jobs: cv.jobs.map((job) => ({
      ...job,
      missions: job.missions.map((mission) => ({
        ...mission,
        points: mission.points.map(text),
        summary: text(mission.summary),
        title: text(mission.title)
      })),
      points: job.points.map(text),
      title: text(job.title)
    })),
    projects: cv.projects.map((project) => ({
      ...project,
      summary: text(project.summary)
    })),
    skills: cv.skills.map((skill) => ({
      group: text(skill.group),
      terms: skill.terms.map(term)
    })),
    specs: cv.specs.map((spec) => ({
      label: text(spec.label),
      value: text(spec.value)
    })),
    summary: text(cv.summary),
    title: text(cv.title)
  }
}
