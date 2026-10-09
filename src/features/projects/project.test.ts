import { describe, expect, it } from 'vitest'

import type { HighlightedExcerpt } from './code-excerpt'
import {
  type Project,
  type ProjectFacts,
  type ProjectText,
  projectInLocale
} from './project'
import { projectsSchema } from './project-schema'

const RUN_EXCERPT: HighlightedExcerpt = {
  lines: [
    {
      indent: '',
      refusals: [],
      results: [],
      sourceLine: 1,
      tokens: [
        { kind: 'call', start: 0, text: 'run' },
        { kind: 'plain', start: 3, text: '()' }
      ]
    }
  ],
  refusalCount: 0
}

const facts: ProjectFacts = {
  coverage: { lines: 87.5, readOn: '2026-10-02' },
  icon: '/images/icons/example-project.svg',
  kind: 'game',
  links: { repository: 'https://example.com/repository' },
  name: 'Example',
  slug: 'example-project',
  stack: ['TypeScript']
}

const text: ProjectText = {
  coverageScope: 'les tests unitaires',
  highlights: ['Des buzzers'],
  keyFacts: ['Un fait'],
  screenshotAlt: 'Une capture',
  summary: 'Un résumé',
  tagline: 'Un slogan'
}

const project: Project = {
  coverage: { ...facts.coverage, scope: text.coverageScope },
  highlights: text.highlights,
  icon: facts.icon,
  keyFacts: text.keyFacts,
  kind: facts.kind,
  links: facts.links,
  name: facts.name,
  screenshotAlt: text.screenshotAlt,
  slug: facts.slug,
  stack: facts.stack,
  summary: text.summary,
  tagline: text.tagline
}

const accepts = (candidate: unknown): boolean =>
  projectsSchema.safeParse([candidate]).success

describe('projectsSchema', () => {
  it('[content] accepts a complete project', () => {
    expect(accepts(project)).toBe(true)
  })

  it('[content] rejects a blank text', () => {
    expect(accepts({ ...project, summary: ' ' })).toBe(false)
  })

  it('[content] rejects a slug that is not kebab-case', () => {
    expect(accepts({ ...project, slug: 'Example Project' })).toBe(false)
  })

  it('[content] rejects a repository link that is not a URL', () => {
    expect(
      accepts({ ...project, links: { repository: 'github/example' } })
    ).toBe(false)
  })

  it('[content] accepts npm packages and code samples', () => {
    expect(
      accepts({
        ...project,
        links: { ...project.links, packages: ['@scope/name', 'plain'] },
        samples: [{ excerpt: RUN_EXCERPT, notes: [], title: 'Example' }]
      })
    ).toBe(true)
  })

  it('[content] rejects a package name npm would refuse', () => {
    expect(
      accepts({
        ...project,
        links: { ...project.links, packages: ['Not A Name'] }
      })
    ).toBe(false)
  })

  it('[content] rejects a documentation site missing a locale', () => {
    expect(
      accepts({
        ...project,
        links: {
          ...project.links,
          documentation: { en: 'https://example.com/docs' }
        }
      })
    ).toBe(false)
  })

  it('[content] rejects an icon outside the public icons', () => {
    expect(accepts({ ...project, icon: 'https://example.com/icon.svg' })).toBe(
      false
    )
  })

  it('[content] rejects a kind the pages cannot word', () => {
    expect(accepts({ ...project, kind: 'toy' })).toBe(false)
  })

  it('[content] rejects a field the model does not know', () => {
    expect(accepts({ ...project, year: 2026 })).toBe(false)
  })

  it('[content] rejects a coverage above a hundred percent', () => {
    expect(
      accepts({ ...project, coverage: { ...project.coverage, lines: 101 } })
    ).toBe(false)
  })

  it('[content] rejects two projects sharing a slug', () => {
    expect(projectsSchema.safeParse([project, project]).success).toBe(false)
  })

  it('[content] rejects an empty catalogue', () => {
    expect(projectsSchema.safeParse([]).success).toBe(false)
  })
})

describe('projectInLocale', () => {
  it('[content] lays the words over the facts', () => {
    expect(projectInLocale(facts, text)).toEqual({
      coverage: {
        lines: 87.5,
        readOn: '2026-10-02',
        scope: 'les tests unitaires'
      },
      highlights: ['Des buzzers'],
      icon: '/images/icons/example-project.svg',
      keyFacts: ['Un fait'],
      kind: 'game',
      links: { repository: 'https://example.com/repository' },
      name: 'Example',
      screenshotAlt: 'Une capture',
      slug: 'example-project',
      stack: ['TypeScript'],
      summary: 'Un résumé',
      tagline: 'Un slogan'
    })
  })

  it('[content] gives up on a project missing its words', () => {
    expect(projectInLocale(facts, undefined)).toBeUndefined()
  })

  it('[content] gives up on a released app missing its category', () => {
    const released: ProjectFacts = {
      ...facts,
      release: {
        entered: '2026-10-02',
        installs: ['result'],
        shortName: 'Ex.',
        state: 'live'
      }
    }

    expect(projectInLocale(released, text)).toBeUndefined()
    expect(
      projectInLocale(released, { ...text, releaseCategory: 'jeux' })?.release
        ?.category
    ).toBe('jeux')
  })

  it('[content] gives each sample the notes written under its title', () => {
    const samples = projectInLocale(
      {
        ...facts,
        samples: [
          { excerpt: RUN_EXCERPT, title: 'Noted' },
          { excerpt: RUN_EXCERPT, title: 'Bare' }
        ]
      },
      { ...text, sampleNotes: { Noted: ['Runs'] } }
    )?.samples

    expect(samples?.map(({ notes }) => notes)).toEqual([['Runs'], []])
  })
})
