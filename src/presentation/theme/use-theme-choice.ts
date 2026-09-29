import { useSyncExternalStore } from 'react'

import {
  readStoredTheme,
  writeStoredTheme
} from '@/infrastructure/storage/preferences-storage'

import { applyTheme } from './apply-theme'
import { isTheme, THEMES, type Theme } from './theme'

/** `auto` follows the system; it is a choice, not the absence of one. */
export const THEME_CHOICES = ['auto', ...THEMES] as const

export type ThemeChoice = (typeof THEME_CHOICES)[number]

const themeFor = (choice: ThemeChoice): Theme | null =>
  isTheme(choice) ? choice : null

/** One choice for the whole page: the header and the footer each hold a rail. */
let currentChoice: ThemeChoice | null = null
const listeners = new Set<() => void>()

const readChoice = (): ThemeChoice => {
  currentChoice ??= readStoredTheme() ?? 'auto'

  return currentChoice
}

const subscribe = (listener: () => void): (() => void) => {
  listeners.add(listener)

  return () => {
    listeners.delete(listener)
  }
}

/** A prerendered document cannot know the visitor's choice. */
const prerenderedChoice = (): ThemeChoice => 'auto'

const choose = (next: ThemeChoice): void => {
  currentChoice = next
  writeStoredTheme(themeFor(next))
  applyTheme(themeFor(next))

  for (const listener of listeners) {
    listener()
  }
}

export const useThemeChoice = (): {
  choice: ThemeChoice
  choose: (choice: ThemeChoice) => void
} => ({
  choice: useSyncExternalStore(subscribe, readChoice, prerenderedChoice),
  choose
})
