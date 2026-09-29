import { describe, expect, it } from 'vitest'

import { localizeProject, type ProjectContent, projectsSchema } from './project'

const project: ProjectContent = {
  highlights: [{ en: 'Buzzers', fr: 'Des buzzers' }],
  links: { repository: 'https://example.com/repository' },
  name: 'Example',
  slug: 'example-project',
  stack: ['TypeScript'],
  summary: { en: 'A summary', fr: 'Un résumé' },
  tagline: { en: 'A tagline', fr: 'Un slogan' }
}

const accepts = (candidate: unknown): boolean =>
  projectsSchema.safeParse([candidate]).success

describe('projectsSchema', () => {
  it('[content] accepts a complete project', () => {
    expect(accepts(project)).toBe(true)
  })

  it('[content] rejects a text missing a locale', () => {
    expect(accepts({ ...project, tagline: { en: 'A tagline' } })).toBe(false)
  })

  it('[content] rejects a blank text', () => {
    expect(accepts({ ...project, summary: { en: ' ', fr: 'Un résumé' } })).toBe(
      false
    )
  })

  it('[content] rejects a slug that is not kebab-case', () => {
    expect(accepts({ ...project, slug: 'Example Project' })).toBe(false)
  })

  it('[content] rejects a repository link that is not a URL', () => {
    expect(
      accepts({ ...project, links: { repository: 'github/example' } })
    ).toBe(false)
  })

  it('[content] rejects a field the model does not know', () => {
    expect(accepts({ ...project, year: 2026 })).toBe(false)
  })

  it('[content] rejects two projects sharing a slug', () => {
    expect(projectsSchema.safeParse([project, project]).success).toBe(false)
  })

  it('[content] rejects an empty catalogue', () => {
    expect(projectsSchema.safeParse([]).success).toBe(false)
  })
})

describe('localizeProject', () => {
  it('[content] keeps only the requested locale', () => {
    expect(localizeProject(project, 'fr')).toEqual({
      highlights: ['Des buzzers'],
      links: { repository: 'https://example.com/repository' },
      name: 'Example',
      slug: 'example-project',
      stack: ['TypeScript'],
      summary: 'Un résumé',
      tagline: 'Un slogan'
    })
  })
})
