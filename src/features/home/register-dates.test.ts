import { describe, expect, it } from 'vitest'

import { registerSpanOf, stampDateOf } from './register-dates'

describe('stampDateOf', () => {
  it('[register] prints the month in Roman numerals', () => {
    expect(stampDateOf('2026-09-29')).toBe('29 · IX · 2026')
  })

  it('[register] drops the leading zero of the day', () => {
    expect(stampDateOf('2026-10-01')).toBe('1 · X · 2026')
  })
})

describe('registerSpanOf', () => {
  it('[register] finds the first and the last entry whatever the order', () => {
    expect(registerSpanOf(['2026-09-29', '2026-10-01', '2026-09-24'])).toEqual({
      first: '2026-09-24',
      last: '2026-10-01'
    })
  })

  it('[register] has no span without an entry', () => {
    expect(registerSpanOf([])).toBeNull()
  })
})
