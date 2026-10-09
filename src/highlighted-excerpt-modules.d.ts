/** What the `highlightedExcerpts` Vite plugin makes of an excerpt file. */
declare module '*.excerpt.ts?highlighted' {
  const excerpt: import('@/features/projects/code-excerpt').HighlightedExcerpt
  export default excerpt
}
