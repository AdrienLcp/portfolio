import { readFileSync } from 'node:fs'

import { findContrastFailures, WCAG_AA } from '@adrienlcp/styles/contrast'
import { describe, expect, it } from 'vitest'

const TOKENS = readFileSync(new URL('_tokens.sass', import.meta.url), 'utf8')

const SURFACES = ['--paper', '--paper-sunk', '--screen'] as const

describe('colour tokens', () => {
  it('[contrast] every ink reads on every surface, in both themes', () => {
    expect(
      findContrastFailures(TOKENS, [
        ...SURFACES.flatMap((background) => [
          { background, foreground: '--ink', minimum: WCAG_AA.text },
          { background, foreground: '--ink-soft', minimum: WCAG_AA.text },
          { background, foreground: '--violet', minimum: WCAG_AA.text },
          { background, foreground: '--focus', minimum: WCAG_AA.nonText },
          { background, foreground: '--rule-strong', minimum: WCAG_AA.nonText }
        ]),
        {
          background: '--selection',
          foreground: '--ink',
          minimum: WCAG_AA.text
        },
        {
          background: '--violet',
          foreground: '--on-violet',
          minimum: WCAG_AA.text
        }
      ])
    ).toEqual([])
  })
})
