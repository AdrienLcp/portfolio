import { Result } from '@adrienlcp/result'
import type { z } from 'zod'

export type ApiError = 'invalid_content' | 'not_found'

/**
 * Development only, where it makes pending states visible; a prerendered page
 * must not pay it.
 */
const SIMULATED_LATENCY_MS = import.meta.env.DEV ? 300 : 0

/** Settles like `fetch`: an aborted wait rejects with the signal's reason. */
const simulateLatency = (signal: AbortSignal): Promise<void> =>
  new Promise((resolve, reject) => {
    signal.throwIfAborted()

    const abort = () => {
      clearTimeout(timeout)
      reject(signal.reason)
    }
    const timeout = setTimeout(() => {
      signal.removeEventListener('abort', abort)
      resolve()
    }, SIMULATED_LATENCY_MS)

    signal.addEventListener('abort', abort, { once: true })
  })

/**
 * Stands where an HTTP call will: the signal is the one `fetch` will take, and
 * an aborted request rejects rather than becoming an `ApiError`, because a
 * superseded navigation is not a failure any page should show.
 */
export const serveContent = async <T>({
  content,
  schema,
  signal
}: {
  content: unknown
  schema: z.ZodType<T>
  signal: AbortSignal
}): Promise<Result<T, ApiError>> => {
  await simulateLatency(signal)
  const parsed = schema.safeParse(content)

  return parsed.success
    ? Result.success(parsed.data)
    : Result.failure('invalid_content')
}
