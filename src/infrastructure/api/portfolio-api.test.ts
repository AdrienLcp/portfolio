import { describe, expect, it } from 'vitest'

import {
  fetchCv,
  fetchProfile,
  fetchProject,
  fetchProjects
} from './portfolio-api'

describe('portfolio api', () => {
  it('[api] serves the embedded projects in the requested locale', async () => {
    const projects = await fetchProjects('fr')

    expect(projects.status).toBe('success')
    if (projects.status === 'success') {
      expect(projects.data.map((project) => project.slug)).toEqual(['taverla'])
      expect(projects.data[0]?.tagline).toBe(
        'Des jeux de soirée sur tous les téléphones de la pièce, au même instant.'
      )
    }
  })

  it('[api] finds a project by its slug', async () => {
    const project = await fetchProject({ locale: 'en', slug: 'taverla' })

    expect(project.status === 'success' && project.data.name).toBe('Taverla')
  })

  it('[api] answers an unknown slug with a not_found failure', async () => {
    await expect(
      fetchProject({ locale: 'en', slug: 'no-such-project' })
    ).resolves.toEqual({ error: 'not_found', status: 'failure' })
  })

  it('[api] serves the profile in the requested locale', async () => {
    const profile = await fetchProfile('en')

    expect(profile.status === 'success' && profile.data.role).toBe(
      'Full-stack developer'
    )
  })

  it('[api] serves the CV in the requested locale', async () => {
    const cv = await fetchCv('fr')

    expect(cv.status === 'success' && cv.data.title).toBe(
      'Développeur full-stack'
    )
  })
})
