import { describe, expect, it } from 'vitest'

import { excerptOf, tokensOf } from './code-excerpt'

describe('excerptOf', () => {
  it('folds refusals and results into the line above', () => {
    const excerpt = excerptOf(
      [
        "translate('greeting')",
        '// ✗ Expected 2 arguments, but got 1',
        'result.data',
        '  // → number',
        '// a plain comment'
      ].join('\n')
    )

    expect(excerpt.refusalCount).toBe(1)
    expect(excerpt.lines).toEqual([
      {
        refusals: ['Expected 2 arguments, but got 1'],
        results: [],
        text: "translate('greeting')"
      },
      { refusals: [], results: ['number'], text: 'result.data' },
      { refusals: [], results: [], text: '// a plain comment' }
    ])
  })

  it('keeps an annotation with no line above it as code', () => {
    expect(excerptOf('// → orphan').lines).toEqual([
      { refusals: [], results: [], text: '// → orphan' }
    ])
  })
})

describe('tokensOf', () => {
  it('colours keywords, calls, strings and types, and keeps every character', () => {
    const line = "const value: Result<number> = parse('7') // done"
    const tokens = tokensOf(line)

    expect(tokens.map((token) => token.text).join('')).toBe(line)
    expect(tokens.filter((token) => token.kind !== 'plain')).toEqual([
      { kind: 'keyword', text: 'const' },
      { kind: 'type', text: 'Result' },
      { kind: 'type', text: 'number' },
      { kind: 'call', text: 'parse' },
      { kind: 'string', text: "'7'" },
      { kind: 'comment', text: '// done' }
    ])
  })
})
