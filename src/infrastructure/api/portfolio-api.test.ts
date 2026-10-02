import { describe, expect, it } from 'vitest'
import { z } from 'zod'

import { serveContent } from './portfolio-api'

describe('portfolio api', () => {
  it('[api] rejects with the abort reason when the request is superseded', async () => {
    const controller = new AbortController()
    const served = serveContent({
      content: 'register',
      schema: z.string(),
      signal: controller.signal
    })

    controller.abort()

    await expect(served).rejects.toBe(controller.signal.reason)
  })

  it('[api] rejects at once a request aborted before it starts', async () => {
    const signal = AbortSignal.abort()

    await expect(
      serveContent({ content: 'register', schema: z.string(), signal })
    ).rejects.toBe(signal.reason)
  })
})
