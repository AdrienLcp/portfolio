import { describe, expect, it } from 'vitest'

import { displayUrl, formatPeriod, formatPhone } from './cv-format'

describe('cv format', () => {
  it('[cv] spells a month in the reader’s language and an open end as present', () => {
    expect(
      formatPeriod({
        locale: 'fr',
        period: { from: '2023-03' },
        present: 'aujourd’hui'
      })
    ).toBe('mars 2023 – aujourd’hui')
    expect(
      formatPeriod({
        locale: 'en',
        period: { from: '2024', to: '2026' },
        present: 'present'
      })
    ).toBe('2024 – 2026')
  })

  it('[cv] dials the national form in French and the international one elsewhere', () => {
    expect(formatPhone('+33650234020', 'fr')).toBe('06 50 23 40 20')
    expect(formatPhone('+33650234020', 'en')).toBe('+33 6 50 23 40 20')
  })

  it('[cv] prints a URL the way someone would type it', () => {
    expect(displayUrl('https://www.linkedin.com/in/adrien-lacourpaille/')).toBe(
      'linkedin.com/in/adrien-lacourpaille'
    )
  })
})
