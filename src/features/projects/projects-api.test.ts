import { describe, expect, it } from 'vitest'

import { fetchProject, fetchProjects } from './projects-api'

describe('projects api', () => {
  it('[api] serves the embedded projects in the requested locale', async () => {
    const projects = await fetchProjects({
      locale: 'fr',
      signal: new AbortController().signal
    })

    expect(projects.status).toBe('success')
    if (projects.status === 'success') {
      expect(projects.data.map((project) => project.slug)).toEqual([
        'taverla',
        'on-record',
        'packages',
        'seance',
        'analytics'
      ])
      expect(projects.data[0]?.tagline).toBe(
        'Des jeux de soirée sur tous les téléphones de la pièce, au même instant.'
      )
    }
  })

  it('[api] finds a project by its slug', async () => {
    const project = await fetchProject({
      locale: 'en',
      signal: new AbortController().signal,
      slug: 'taverla'
    })

    expect(project.status === 'success' && project.data.name).toBe('Taverla')
  })

  it('[api] answers an unknown slug with a not_found failure', async () => {
    await expect(
      fetchProject({
        locale: 'en',
        signal: new AbortController().signal,
        slug: 'no-such-project'
      })
    ).resolves.toEqual({ error: 'not_found', status: 'failure' })
  })
})
