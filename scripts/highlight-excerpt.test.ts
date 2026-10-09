import { beforeAll, describe, expect, it } from 'vitest'

import {
  createExcerptHighlighter,
  type ExcerptHighlighter
} from './highlight-excerpt'

/**
 * Loading the grammar and compiling its first patterns takes about a second,
 * several on a loaded machine: paid once here, so each case only highlights.
 */
let highlightExcerpt: ExcerptHighlighter

beforeAll(async () => {
  highlightExcerpt = await createExcerptHighlighter()
  highlightExcerpt(
    ['if (warm) {', "  const up: string = call('once') // ✓ ready", '}'].join(
      '\n'
    )
  )
})

describe('highlightExcerpt', () => {
  it('colours keywords, calls, strings, types and comments, and keeps every character', () => {
    const line = "const value: Result<number> = parse('7') // done"
    const [highlighted] = highlightExcerpt(line).lines

    expect(highlighted?.tokens.map((token) => token.text).join('')).toBe(line)
    expect(
      highlighted?.tokens
        .filter((token) => token.kind !== 'plain')
        .map(({ kind, text }) => [kind, text.trim()])
    ).toEqual([
      ['keyword', 'const'],
      ['type', 'Result'],
      ['type', 'number'],
      ['call', 'parse'],
      ['string', "'7'"],
      ['comment', '// done']
    ])
  })

  it('folds the annotations and keeps the indent apart', () => {
    const excerpt = highlightExcerpt(
      [
        'if (ok) {',
        "  translate('greeting')",
        '  // ✗ Expected 2 arguments, but got 1',
        '}'
      ].join('\n')
    )

    expect(excerpt.refusalCount).toBe(1)
    expect(excerpt.lines[1]).toMatchObject({
      indent: '  ',
      refusals: ['Expected 2 arguments, but got 1'],
      sourceLine: 2
    })
    expect(excerpt.lines[1]?.tokens[0]).toEqual({
      kind: 'call',
      start: 0,
      text: 'translate'
    })
  })
})
