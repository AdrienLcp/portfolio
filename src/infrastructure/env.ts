import { z } from 'zod'

const envSchema = z.object({
  VITE_WEB3FORMS_KEY: z.uuid()
})

const parsed = envSchema.safeParse(import.meta.env)

if (!parsed.success) {
  throw new Error(`Invalid environment: ${z.prettifyError(parsed.error)}`)
}

export const env = {
  /** Public by design: Web3Forms only ever forwards to the inbox this key belongs to. */
  web3formsKey: parsed.data.VITE_WEB3FORMS_KEY
}
