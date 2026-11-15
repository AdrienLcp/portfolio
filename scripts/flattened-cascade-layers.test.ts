import postcss from 'postcss'
import { describe, expect, it } from 'vitest'

import { flattenedCascadeLayers } from './flattened-cascade-layers'

const ID = ':not(#\\#)'

const flattened = (css: string): string =>
  postcss([flattenedCascadeLayers()]).process(css, { from: undefined }).css

const compact = (css: string): string => css.replaceAll(/\s+/g, ' ').trim()

describe('flattenedCascadeLayers', () => {
  it('weighs each layer two ids above the one below it, unlayered rules on top', () => {
    const css = flattened(`
      @layer reset { a { color: red } }
      @layer tokens { :root { --ink: black } }
      @layer base { #root { display: grid } }
      @layer components { .link { color: blue } }
      .unlayered { color: green }
    `)

    expect(compact(css)).toBe(
      compact(`
        a { color: red }
        ${ID.repeat(2)}:root { --ink: black }
        ${ID.repeat(4)}#root { display: grid }
        ${ID.repeat(6)}.link { color: blue }
        ${ID.repeat(8)}.unlayered { color: green }
      `)
    )
  })

  it('keeps a type selector first in its compound, and a pseudo-element last', () => {
    const css = flattened(`
      @layer components { button::before, *::after, ::view-transition-old(*) { content: '' } }
    `)

    expect(css).toContain(`button${ID.repeat(6)}::before`)
    expect(css).toContain(`*${ID.repeat(6)}::after`)
    expect(css).toContain(`${ID.repeat(6)}::view-transition-old(*)`)
  })

  it('reaches a layer through the media query around it, and the media query inside it', () => {
    const css = flattened(`
      @media print { @layer components { .sheet { margin: 0 } } }
      @layer base { @media print { body { color: black } } }
    `)

    expect(css).toContain(`${ID.repeat(6)}.sheet`)
    expect(css).toContain(`body${ID.repeat(4)}`)
    expect(css).not.toContain('@layer')
  })

  it('drops the order statement and leaves keyframes and anonymous layers alone', () => {
    const css = flattened(`
      @layer reset, tokens, base, components;
      @layer components { @keyframes in { from { opacity: 0 } } }
      @layer { [data-pressable] { touch-action: manipulation } }
    `)

    expect(css).not.toContain('@layer reset')
    expect(css).toContain('from { opacity: 0 }')
    expect(compact(css)).toContain(
      '@layer { [data-pressable] { touch-action: manipulation } }'
    )
  })

  it('refuses what the weights cannot reproduce', () => {
    expect(() => flattened('@layer widgets { .x { color: red } }')).toThrow(
      'Unknown cascade layer'
    )
    expect(() =>
      flattened('@layer base { .x { color: red !important } }')
    ).toThrow('!important')
    expect(() => flattened('@layer base { #a #b { color: red } }')).toThrow(
      'more ids'
    )
  })
})
