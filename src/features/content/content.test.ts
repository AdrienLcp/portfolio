import { describe, expect, it } from 'vitest'
import type { z } from 'zod/mini'

import { ABOUT } from '@/features/about/domain/about-content'
import { aboutSchema } from '@/features/about/domain/about-schema'
import { CV } from '@/features/cv/cv-content'
import { cvSchema } from '@/features/cv/cv-schema'
import { housePackagesSchema } from '@/features/packages/house-package-schema'
import { HOUSE_PACKAGES } from '@/features/packages/house-packages-content'
import { PROFILE } from '@/features/profile/profile-content'
import { profileSchema } from '@/features/profile/profile-schema'
import { type ProjectText, projectInLocale } from '@/features/projects/project'
import {
  projectsSchema,
  projectTextSchema
} from '@/features/projects/project-schema'
import { PROJECTS } from '@/features/projects/projects-content'
import { PROJECTS_TEXT_EN } from '@/features/projects/projects-content-en'
import { PROJECTS_TEXT_FR } from '@/features/projects/projects-content-fr'
import { LOCALES, type Locale } from '@/presentation/i18n/locale'

const PROJECTS_TEXT: Record<Locale, Record<string, ProjectText>> = {
  en: PROJECTS_TEXT_EN,
  fr: PROJECTS_TEXT_FR
}

/**
 * The app serves its content without parsing it, so a schema must find it
 * valid and leave it untouched: a trim or a default it applied here is one the
 * app would not have.
 */
const expectServedAsIs = (schema: z.ZodMiniType, content: unknown) => {
  const parsed = schema.safeParse(content)

  expect(parsed.error?.issues).toBeUndefined()
  expect(parsed.data).toEqual(content)
}

describe('site content', () => {
  it('[content] serves the about page as its schema reads it', () => {
    expectServedAsIs(aboutSchema, ABOUT)
  })

  it('[content] serves the CV as its schema reads it', () => {
    expectServedAsIs(cvSchema, CV)
  })

  it('[content] serves the house packages as their schema reads them', () => {
    expectServedAsIs(housePackagesSchema, HOUSE_PACKAGES)
  })

  it('[content] serves the profile as its schema reads it', () => {
    expectServedAsIs(profileSchema, PROFILE)
  })

  describe.each(LOCALES)('in %s', (locale) => {
    const text = PROJECTS_TEXT[locale]

    it('[content] writes every project word as its schema reads it', () => {
      for (const projectText of Object.values(text)) {
        expectServedAsIs(projectTextSchema, projectText)
      }
    })

    it('[content] gives every project its words, and only known projects', () => {
      expect(Object.keys(text).sort()).toEqual(
        PROJECTS.map(({ slug }) => slug).sort()
      )
    })

    it('[content] annotates only samples a project shows', () => {
      for (const { samples = [], slug } of PROJECTS) {
        const titles = samples.map(({ title }) => title)

        expect(titles).toEqual(
          expect.arrayContaining(Object.keys(text[slug]?.sampleNotes ?? {}))
        )
      }
    })

    it('[content] serves every project as its schema reads it', () => {
      expectServedAsIs(
        projectsSchema,
        PROJECTS.map((project) => projectInLocale(project, text[project.slug]))
      )
    })
  })
})
