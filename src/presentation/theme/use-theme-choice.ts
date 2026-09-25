import { useState } from 'react'

import {
  readStoredTheme,
  writeStoredTheme
} from '@/infrastructure/storage/preferences-storage'

import { applyTheme } from './apply-theme'
import { isTheme, THEMES, type Theme } from './theme'

/** `auto` follows the system; it is a choice, not the absence of one. */
export const THEME_CHOICES = ['auto', ...THEMES] as const

export type ThemeChoice = (typeof THEME_CHOICES)[number]

export const isThemeChoice = (value: string): value is ThemeChoice =>
  THEME_CHOICES.some((choice) => choice === value)

const themeFor = (choice: ThemeChoice): Theme | null =>
  isTheme(choice) ? choice : null

export const useThemeChoice = (): {
  choice: ThemeChoice
  choose: (choice: ThemeChoice) => void
} => {
  const [choice, setChoice] = useState<ThemeChoice>(
    () => readStoredTheme() ?? 'auto'
  )

  const choose = (next: ThemeChoice): void => {
    setChoice(next)
    writeStoredTheme(themeFor(next))
    applyTheme(themeFor(next))
  }

  return { choice, choose }
}
