import { readFile } from 'node:fs/promises'

import type { Plugin } from 'vite'

import { highlightExcerpt } from './highlight-excerpt.ts'

const HIGHLIGHTED_QUERY = '?highlighted'

/**
 * `import excerpt from './x.excerpt.ts?highlighted'` reads the excerpt and
 * hands back its lines already split into coloured tokens: Shiki runs at build
 * time only, and the browser gets data.
 */
export const highlightedExcerpts = (): Plugin => ({
  enforce: 'pre',
  async load(id) {
    if (!id.endsWith(HIGHLIGHTED_QUERY)) {
      return null
    }

    const file = id.slice(0, -HIGHLIGHTED_QUERY.length)

    this.addWatchFile(file)

    const code = (await readFile(file, 'utf8'))
      .replaceAll('\r\n', '\n')
      .trimEnd()

    return `export default ${JSON.stringify(await highlightExcerpt(code))}`
  },
  name: 'highlighted-excerpts'
})
