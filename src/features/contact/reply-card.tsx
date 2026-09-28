import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import {
  FieldError,
  Form,
  Input,
  Label,
  Text,
  TextArea,
  TextField
} from 'react-aria-components'
import { z } from 'zod'

import {
  type MessageError,
  sendMessage
} from '@/infrastructure/api/message-api'
import { Button } from '@/presentation/components/ui/button'
import { useI18n } from '@/presentation/i18n/i18n-provider'

import './reply-card.sass'

type Delivery =
  | { status: 'writing' }
  | { status: 'sending' }
  | { status: 'failed'; error: MessageError }
  | { status: 'posted' }

const emailSchema = z.email()

const fieldText = (data: FormData, name: string): string => {
  const value = data.get(name)

  return typeof value === 'string' ? value.trim() : ''
}

/** The reply card slipped in every game box: fill it in, post it. */
export const ReplyCard: React.FC = () => {
  const { translate } = useI18n()
  const [delivery, setDelivery] = useState<Delivery>({ status: 'writing' })
  const postedRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (delivery.status === 'posted') {
      postedRef.current?.focus()
    }
  }, [delivery.status])

  const post = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()

    if (delivery.status === 'sending') {
      return
    }

    const data = new FormData(event.currentTarget)

    // Only a bot fills a field nobody can see: it is told the card left.
    if (data.get('botcheck') !== null) {
      setDelivery({ status: 'posted' })
      return
    }

    setDelivery({ status: 'sending' })
    const sent = await sendMessage({
      email: fieldText(data, 'email'),
      message: fieldText(data, 'message'),
      name: fieldText(data, 'name')
    })

    setDelivery(
      sent.status === 'success'
        ? { status: 'posted' }
        : { error: sent.error, status: 'failed' }
    )
  }

  const heading = (
    <h2 className='reply-heading' id='contact-reply'>
      {translate('contact.form.title')}
    </h2>
  )

  if (delivery.status === 'posted') {
    return (
      <section aria-labelledby='contact-posted' className='reply-card posted'>
        <h2
          className='posted-stamp'
          id='contact-posted'
          ref={postedRef}
          tabIndex={-1}
        >
          {translate('contact.form.posted')}
        </h2>
        <p className='reply-note'>{translate('contact.form.postedNote')}</p>
        <Button onPress={() => setDelivery({ status: 'writing' })}>
          {translate('contact.form.again')}
        </Button>
      </section>
    )
  }

  const isSending = delivery.status === 'sending'

  return (
    <section aria-labelledby='contact-reply' className='reply-card'>
      {heading}
      <Form className='reply-form' onSubmit={(event) => void post(event)}>
        <div className='reply-row'>
          <TextField
            autoComplete='name'
            className='reply-field'
            isRequired
            name='name'
            validate={(value) =>
              value.trim() === '' ? translate('contact.form.nameMissing') : null
            }
          >
            <Label>{translate('contact.form.name')}</Label>
            <Input />
            <FieldError className='reply-error' />
          </TextField>
          <TextField
            autoComplete='email'
            className='reply-field'
            isRequired
            name='email'
            type='email'
            validate={(value) => {
              if (value.trim() === '') {
                return translate('contact.form.emailMissing')
              }
              return emailSchema.safeParse(value.trim()).success
                ? null
                : translate('contact.form.emailInvalid')
            }}
          >
            <Label>{translate('contact.form.email')}</Label>
            <Input />
            <Text className='reply-hint' slot='description'>
              {translate('contact.form.emailHint')}
            </Text>
            <FieldError className='reply-error' />
          </TextField>
        </div>
        <TextField
          className='reply-field'
          isRequired
          maxLength={5000}
          name='message'
          validate={(value) =>
            value.trim() === ''
              ? translate('contact.form.messageMissing')
              : null
          }
        >
          <Label>{translate('contact.form.message')}</Label>
          <TextArea rows={6} />
          <FieldError className='reply-error' />
        </TextField>
        <input
          aria-hidden='true'
          autoComplete='off'
          className='reply-trap'
          name='botcheck'
          tabIndex={-1}
          type='checkbox'
        />
        {delivery.status === 'failed' && (
          <p className='reply-failure' role='alert'>
            {translate(
              delivery.error === 'refused'
                ? 'contact.form.failure.refused'
                : 'contact.form.failure.unreachable'
            )}
          </p>
        )}
        <Button
          icon='send'
          isPending={isSending}
          pendingLabel={translate('contact.form.sending')}
          type='submit'
          variant='accent'
        >
          {translate('contact.form.send')}
        </Button>
      </Form>
    </section>
  )
}
