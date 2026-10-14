import { createThemePreferenceStore } from '@adrienlcp/theme-preference'

/** Where the theme a visitor picked is kept. */
export const THEME_STORAGE_KEY = 'portfolio:theme'

/** Shared by the switch and by the Vite plugin that inlines the pre-paint script. */
export const themeStore = createThemePreferenceStore({
  storageKey: THEME_STORAGE_KEY
})
