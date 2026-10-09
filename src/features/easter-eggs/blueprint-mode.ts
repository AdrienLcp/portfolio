import { useSyncExternalStore } from 'react'

import {
  NO_STREAK,
  streakAfterSwitch,
  unlocksBlueprint
} from './theme-switch-streak'

type Listener = () => void

/**
 * Shared by every theme switch on the page (the header's and the footer's), so
 * switches on either count toward the same streak. Kept for the visit only: a
 * reload hands the theme back to the visitor's own choice.
 */
const createBlueprintMode = () => {
  let isOn = false
  let streak = NO_STREAK
  const listeners = new Set<Listener>()

  const setIsOn = (next: boolean): void => {
    isOn = next
    streak = NO_STREAK

    for (const listener of listeners) {
      listener()
    }
  }

  return {
    isOn: (): boolean => isOn,

    /** Any switch leaves the blueprint; ten quick ones in a row enter it. */
    recordThemeSwitch: (switchedAt: number): void => {
      if (isOn) {
        setIsOn(false)

        return
      }

      streak = streakAfterSwitch(streak, switchedAt)

      if (unlocksBlueprint(streak)) {
        setIsOn(true)
      }
    },

    subscribe: (listener: Listener): (() => void) => {
      listeners.add(listener)

      return () => listeners.delete(listener)
    }
  }
}

export const blueprintMode = createBlueprintMode()

const isOffOnTheServer = (): boolean => false

export const useIsBlueprintOn = (): boolean =>
  useSyncExternalStore(
    blueprintMode.subscribe,
    blueprintMode.isOn,
    isOffOnTheServer
  )
