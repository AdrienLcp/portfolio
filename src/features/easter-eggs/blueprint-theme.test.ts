import { readFileSync } from 'node:fs'

import { findContrastFailures, WCAG_AA } from '@adrienlcp/styles/contrast'
import { describe, expect, it } from 'vitest'

const BLUEPRINT_TOKENS = readFileSync(
  new URL('blueprint-theme.sass', import.meta.url),
  'utf8'
)

const SURFACES = [
  '--paper',
  '--paper-sunk',
  '--surface',
  '--surface-strong',
  '--screen'
] as const

describe('blueprint theme', () => {
  it('[contrast] every ink reads on every blueprint surface', () => {
    expect(
      findContrastFailures(BLUEPRINT_TOKENS, [
        ...SURFACES.flatMap((background) => [
          { background, foreground: '--ink', minimum: WCAG_AA.text },
          { background, foreground: '--ink-soft', minimum: WCAG_AA.text },
          { background, foreground: '--violet', minimum: WCAG_AA.text }
        ]),
        {
          background: '--violet',
          foreground: '--on-violet',
          minimum: WCAG_AA.text
        }
      ])
    ).toEqual([])
  })
})
