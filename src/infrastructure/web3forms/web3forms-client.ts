import { Result } from '@adrienlcp/result'
import { z } from 'zod/mini'

export type Message = {
  email: string
  message: string
  name: string
}

export type MessageError = 'refused' | 'unreachable'

const ENDPOINT = 'https://api.web3forms.com/submit'

/** Public by design: Web3Forms only ever forwards to the inbox this key belongs to. */
const WEB3FORMS_ACCESS_KEY = '9d961a61-ac0e-44cf-9d77-1cc4b2e008ab'

const acceptedReplySchema = z.object({ success: z.literal(true) })

export const sendMessage = async (
  message: Message
): Promise<Result<void, MessageError>> => {
  try {
    const response = await fetch(ENDPOINT, {
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        botcheck: false,
        email: message.email,
        from_name: message.name,
        message: message.message,
        name: message.name,
        subject: `Portfolio — ${message.name}`
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
    const isAccepted = acceptedReplySchema.safeParse(
      await response.json()
    ).success

    return isAccepted ? Result.success() : Result.failure('refused')
  } catch {
    return Result.failure('unreachable')
  }
}
