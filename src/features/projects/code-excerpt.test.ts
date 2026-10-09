import { describe, expect, it } from 'vitest'

import { foldedLinesOf } from './code-excerpt'

describe('foldedLinesOf', () => {
  it('folds refusals and results into the line above', () => {
    const lines = foldedLinesOf(
      [
        "translate('greeting')",
        '// ✗ Expected 2 arguments, but got 1',
        'result.data',
        '  // → number',
        '// a plain comment'
      ].join('\n')
    )

    expect(lines).toEqual([
      {
        refusals: ['Expected 2 arguments, but got 1'],
        results: [],
        sourceLine: 1,
        text: "translate('greeting')"
      },
      {
        refusals: [],
        results: ['number'],
        sourceLine: 3,
        text: 'result.data'
      },
      {
        refusals: [],
        results: [],
        sourceLine: 5,
        text: '// a plain comment'
      }
    ])
  })

  it('keeps an annotation with no line above it as code', () => {
    expect(foldedLinesOf('// → orphan')).toEqual([
      { refusals: [], results: [], sourceLine: 1, text: '// → orphan' }
    ])
  })
})
