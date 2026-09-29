import type { Theme } from './theme'

export const applyTheme = (theme: Theme | null): void => {
  const root = document.documentElement

  if (theme === null) {
    delete root.dataset.theme
  } else {
    root.dataset.theme = theme
  }

  for (const meta of document.querySelectorAll<HTMLMetaElement>(
    'meta[name="theme-color"][data-scheme]'
  )) {
    meta.media =
      theme === null
        ? `(prefers-color-scheme: ${meta.dataset.scheme})`
        : meta.dataset.scheme === theme
          ? 'all'
          : 'not all'
  }
}
