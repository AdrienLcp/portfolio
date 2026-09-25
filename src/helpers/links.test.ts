import { describe, expect, it } from 'vitest'

import { relForTarget } from './links'

describe('relForTarget', () => {
  it('cuts the opener of a link that opens a new tab', () => {
    expect(relForTarget({ target: '_blank' })).toBe('noopener noreferrer')
  })

  it("keeps the caller's own rel", () => {
    expect(relForTarget({ rel: 'me', target: '_blank' })).toBe('me')
  })

  it('leaves a same-tab link alone', () => {
    expect(relForTarget({})).toBeUndefined()
    expect(relForTarget({ rel: 'me' })).toBe('me')
  })
})
