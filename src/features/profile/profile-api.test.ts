import { describe, expect, it } from 'vitest'

import { fetchProfile } from './profile-api'

describe('profile api', () => {
  it('[api] serves the profile in the requested locale', async () => {
    const profile = await fetchProfile({
      locale: 'en',
      signal: new AbortController().signal
    })

    expect(profile.status === 'success' && profile.data.role).toBe(
      'Full-stack developer'
    )
  })
})
