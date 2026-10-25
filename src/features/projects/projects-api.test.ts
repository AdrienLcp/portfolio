import { describe, expect, it } from 'vitest'

import { fetchProject, fetchProjects } from './projects-api'

describe('projects api', () => {
  it('[api] serves the embedded projects in the requested locale', async () => {
    const projects = await fetchProjects('fr')

    expect(projects.status).toBe('success')
    if (projects.status === 'success') {
      expect(projects.data.map((project) => project.slug)).toEqual([
        'melee',
        'on-record',
        'scoreboard',
        'analytics',
        'seance',
        'pastime',
        'arbor',
        'list',
        'packages'
      ])
      expect(projects.data[0]?.tagline).toBe(
        'Une soirée de jeux sur mesure : une console, un mur, tous les téléphones de la pièce.'
      )
    }
  })

  it('[api] finds a project by its slug', async () => {
    const project = await fetchProject({
      locale: 'en',

      slug: 'melee'
    })

    expect(project.status === 'success' && project.data.name).toBe('Mêlée')
  })

  it('[api] answers an unknown slug with a not_found failure', async () => {
    await expect(
      fetchProject({
        locale: 'en',

        slug: 'no-such-project'
      })
    ).resolves.toEqual({ error: 'not_found', status: 'failure' })
  })
})
