import { describe, expect, it } from 'vitest'

import { localizeProfile } from './profile'
import { PROFILE } from './profile-content'

describe('profile', () => {
  it('[profile] reads the profile in the requested locale', () => {
    expect(localizeProfile(PROFILE, 'en').role).toBe('Full-stack developer')
  })
})
