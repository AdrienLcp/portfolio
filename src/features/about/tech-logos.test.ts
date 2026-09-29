import { siReact, siReactrouter, siVite, siVitest } from 'simple-icons'
import { describe, expect, it } from 'vitest'

import { logoFor } from './tech-logos'

describe('logoFor', () => {
  it('prefers the longer name that contains a shorter one', () => {
    expect(logoFor('React Router')).toBe(siReactrouter)
    expect(logoFor('Vitest')).toBe(siVitest)
    expect(logoFor('Vite')).toBe(siVite)
    expect(logoFor('React')).toBe(siReact)
  })

  it('finds a name wherever the locale puts it', () => {
    expect(logoFor('MCP servers')).toBe(logoFor('serveurs MCP'))
    expect(logoFor('GitLab CI/CD')).toBe(logoFor('CI/CD GitLab'))
  })

  it('leaves a term without a logo bare, even when it contains a known name', () => {
    expect(logoFor('React Aria')).toBeNull()
    expect(logoFor('Playwright')).toBeNull()
  })
})
