import { Result } from '@adrienlcp/result'
import type { z } from 'zod'

export type ApiError = 'invalid_content' | 'not_found'

/**
 * Development only, where it makes pending states visible; a prerendered page
 * must not pay it.
 */
const SIMULATED_LATENCY_MS = import.meta.env.DEV ? 300 : 0

const simulateLatency = (): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, SIMULATED_LATENCY_MS)
  })

export const serveContent = async <T>(
  schema: z.ZodType<T>,
  content: unknown
): Promise<Result<T, ApiError>> => {
  await simulateLatency()
  const parsed = schema.safeParse(content)

  return parsed.success
    ? Result.success(parsed.data)
    : Result.failure('invalid_content')
}
