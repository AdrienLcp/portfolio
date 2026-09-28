import { Result } from '@adrienlcp/result'
import { z } from 'zod'

import { env } from '@/infrastructure/env'

export type Message = {
  email: string
  message: string
  name: string
}

export type MessageError = 'refused' | 'unreachable'

const ENDPOINT = 'https://api.web3forms.com/submit'

const replySchema = z.object({ success: z.boolean() })

export const sendMessage = async (
  message: Message
): Promise<Result<void, MessageError>> => {
  try {
    const response = await fetch(ENDPOINT, {
      body: JSON.stringify({
        access_key: env.web3formsKey,
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
    const reply = replySchema.safeParse(await response.json())

    return reply.success && reply.data.success
      ? Result.success()
      : Result.failure('refused')
  } catch {
    return Result.failure('unreachable')
  }
}
