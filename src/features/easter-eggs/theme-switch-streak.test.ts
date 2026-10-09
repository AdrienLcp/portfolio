import { describe, expect, it } from 'vitest'

import {
  NO_STREAK,
  SWITCHES_TO_UNLOCK_BLUEPRINT,
  streakAfterSwitch,
  unlocksBlueprint
} from './theme-switch-streak'

const streakOfSwitchesAt = (times: readonly number[]) =>
  times.reduce(streakAfterSwitch, NO_STREAK)

const everyHalfSecond = (count: number): number[] =>
  Array.from({ length: count }, (_, index) => 10_000 + index * 500)

describe('streakAfterSwitch', () => {
  it('[easter-eggs] unlocks the blueprint after ten quick switches', () => {
    expect(
      unlocksBlueprint(
        streakOfSwitchesAt(everyHalfSecond(SWITCHES_TO_UNLOCK_BLUEPRINT))
      )
    ).toBe(true)
  })

  it('[easter-eggs] keeps it locked one switch short', () => {
    expect(
      unlocksBlueprint(
        streakOfSwitchesAt(everyHalfSecond(SWITCHES_TO_UNLOCK_BLUEPRINT - 1))
      )
    ).toBe(false)
  })

  it('[easter-eggs] starts over after a pause', () => {
    const quick = everyHalfSecond(9)
    const afterPause = (quick.at(-1) ?? 0) + 5000

    expect(streakOfSwitchesAt([...quick, afterPause]).count).toBe(1)
  })
})
