export const SWITCHES_TO_UNLOCK_BLUEPRINT = 10

/** Longer than this between two switches, and the streak starts over. */
const LONGEST_PAUSE_IN_STREAK_MS = 1500

export type ThemeSwitchStreak = {
  count: number
  lastSwitchAt: number
}

export const NO_STREAK: ThemeSwitchStreak = { count: 0, lastSwitchAt: 0 }

export const streakAfterSwitch = (
  streak: ThemeSwitchStreak,
  switchedAt: number
): ThemeSwitchStreak => ({
  count:
    switchedAt - streak.lastSwitchAt <= LONGEST_PAUSE_IN_STREAK_MS
      ? streak.count + 1
      : 1,
  lastSwitchAt: switchedAt
})

export const unlocksBlueprint = (streak: ThemeSwitchStreak): boolean =>
  streak.count >= SWITCHES_TO_UNLOCK_BLUEPRINT
