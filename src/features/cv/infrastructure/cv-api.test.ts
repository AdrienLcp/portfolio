import { describe, expect, it } from 'vitest'

import { fetchCv } from './cv-api'

describe('cv api', () => {
  it('[api] serves the CV in the requested locale', async () => {
    const cv = await fetchCv('fr')

    expect(cv.status === 'success' && cv.data.title).toBe(
      'Développeur full-stack'
    )
  })
})
