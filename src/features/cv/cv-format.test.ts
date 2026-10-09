import { beforeAll, describe, expect, it } from 'vitest'

import { i18n } from '@/presentation/i18n/i18n'

import { displayUrl, formatPeriod, formatPhone } from './cv-format'

/** Echoes the key and the month it was handed, for the cases about composition. */
function echoWords(key: 'cv.present'): string
function echoWords(
  key: 'cv.month',
  values: { month: Temporal.PlainDate }
): string
function echoWords(
  key: string,
  values?: { month: Temporal.PlainDate }
): string {
  return values === undefined ? key : `${key}(${values.month})`
}

describe('cv format', () => {
  it('[cv] spells a month through the dictionary, a year as written and an open end as present', () => {
    expect(formatPeriod({ from: '2023-03' }, echoWords)).toBe(
      'cv.month(2023-03-01) – cv.present'
    )
    expect(formatPeriod({ from: '2024', to: '2026' }, echoWords)).toBe(
      '2024 – 2026'
    )
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

describe('cv format in French', () => {
  /**
   * A worker's first `Intl.DateTimeFormat` loads ICU's locale data, seconds on
   * a loaded machine: paid once here with the French dictionary, so the case
   * only formats.
   */
  beforeAll(async () => {
    await i18n.load('fr')
    new Intl.DateTimeFormat('fr', { month: 'long', year: 'numeric' }).format(
      Temporal.PlainDate.from('2023-03-01')
    )
  })

  it('[cv] spells a month in French and an open end as present', () => {
    expect(formatPeriod({ from: '2023-03' }, i18n.translator('fr'))).toBe(
      'mars 2023 – aujourd’hui'
    )
  })
})
