import type { LocalizedText } from '@/features/content/localized-text'
import type { Locale } from '@/presentation/i18n/locale'

/** A year, or a year and a month (`YYYY` or `YYYY-MM`): a CV rarely knows the day. */
type Month = string

/** No `to`: still going on. */
export type Period = { from: Month; to?: Month }

/** A tool name reads the same in every language; a phrase around it does not. */
type Term = string | LocalizedText

type MissionContent = {
  period?: Period
  points: LocalizedText[]
  summary: LocalizedText
  title: LocalizedText
}

export type CvContent = {
  contact: {
    email: string
    location: LocalizedText
    /** `+` and eleven digits. */
    phone: string
    website: string
  }
  education: {
    detail: LocalizedText
    school: string
    title: LocalizedText
    year: Month
  }[]
  extras: LocalizedText[]
  headline: string
  jobs: {
    employer: string
    missions: MissionContent[]
    period: Period
    place: string
    points: LocalizedText[]
    title: LocalizedText
  }[]
  projects: {
    /** One URL, or a page per locale for a site that has one in each. */
    link: string | LocalizedText
    name: string
    summary: LocalizedText
    year: Month
  }[]
  skills: { group: LocalizedText; terms: Term[] }[]
  specs: { label: LocalizedText; value: LocalizedText }[]
  summary: LocalizedText
  title: LocalizedText
}

type Mission = {
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
  const inLocale = (value: string | LocalizedText): string =>
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
      link: inLocale(project.link),
      summary: text(project.summary)
    })),
    skills: cv.skills.map((skill) => ({
      group: text(skill.group),
      terms: skill.terms.map(inLocale)
    })),
    specs: cv.specs.map((spec) => ({
      label: text(spec.label),
      value: text(spec.value)
    })),
    summary: text(cv.summary),
    title: text(cv.title)
  }
}
