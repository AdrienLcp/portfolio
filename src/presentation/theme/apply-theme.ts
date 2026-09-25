import type { Theme } from './theme'

/**
 * The same stamp as the pre-paint script in `index.html`, applied live: an
 * explicit theme sets `data-theme` and pins the matching `theme-color` tag;
 * `null` hands both back to the system preference.
 */
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
