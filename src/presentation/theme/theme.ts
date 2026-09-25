export const THEMES = ['light', 'dark'] as const

export type Theme = (typeof THEMES)[number]

export const isTheme = (value: string): value is Theme =>
  THEMES.some((theme) => theme === value)
