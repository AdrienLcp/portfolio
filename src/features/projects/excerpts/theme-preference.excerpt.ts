export const themeStore = createThemePreferenceStore({
  storageKey: 'app:theme'
})

// vite.config.ts: runs before the first paint
plugins: [themePreferencePlugin(themeStore)]

themeStore.setPreference('dark')
// → <html data-theme="dark">
// → dark theme-color: media="all"
// → light theme-color: media="not all"
