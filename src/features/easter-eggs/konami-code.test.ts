import { describe, expect, it } from 'vitest'

import {
  isKonamiCodeComplete,
  KONAMI_CODE,
  konamiProgressAfter
} from './konami-code'

const progressAfterTyping = (keys: readonly string[]): number =>
  keys.reduce(konamiProgressAfter, 0)

describe('konamiProgressAfter', () => {
  it('[easter-eggs] completes on the whole code', () => {
    expect(isKonamiCodeComplete(progressAfterTyping(KONAMI_CODE))).toBe(true)
  })

  it('[easter-eggs] reads B and A whatever their case', () => {
    expect(
      isKonamiCodeComplete(
        progressAfterTyping([...KONAMI_CODE.slice(0, 8), 'B', 'A'])
      )
    ).toBe(true)
  })

  it('[easter-eggs] starts over on a wrong key', () => {
    expect(progressAfterTyping(['ArrowUp', 'ArrowUp', 'x'])).toBe(0)
  })

  it('[easter-eggs] keeps two keys in after a third up arrow', () => {
    expect(progressAfterTyping(['ArrowUp', 'ArrowUp', 'ArrowUp'])).toBe(2)
  })

  it('[easter-eggs] still completes when the code follows a false start', () => {
    expect(
      isKonamiCodeComplete(progressAfterTyping(['ArrowUp', ...KONAMI_CODE]))
    ).toBe(true)
  })
})
