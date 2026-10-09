import { describe, expect, it } from 'vitest'

import { localizeCv } from './cv'
import { CV } from './cv-content'

describe('cv', () => {
  it('[cv] reads the CV in the requested locale', () => {
    expect(localizeCv(CV, 'fr').title).toBe('Développeur full-stack')
  })
})
