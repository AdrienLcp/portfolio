import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { z } from 'zod/mini'

import {
  type MessageError,
  sendMessage
} from '@/infrastructure/web3forms/web3forms-client'
import { Icon } from '@/presentation/components/icon'
import { SiteButton } from '@/presentation/components/site-link/site-button'
import { Form } from '@/presentation/components/ui/form'
import {
  FieldError,
  Input,
  Label,
  Text,
  TextArea,
  TextField
} from '@/presentation/components/ui/text-field'
import { useI18n } from '@/presentation/i18n/i18n-provider'

import './note-form.sass'

type Delivery =
  | { status: 'writing' }
  | { status: 'sending' }
  | { status: 'failed'; error: MessageError }
  | { status: 'sent' }

const emailSchema = z.email()

const HONEYPOT_FIELD = 'botcheck'

const fieldText = (data: FormData, name: string): string => {
  const value = data.get(name)

  return typeof value === 'string' ? value.trim() : ''
}

const NoteError: React.FC = () => (
  <FieldError className='note-error'>
    {({ validationErrors }) => (
      <>
        <Icon className='note-error-icon' name='warning' />
        {validationErrors.join(' ')}
      </>
    )}
  </FieldError>
)

/** A plain form that lands in the same inbox as the address above it. */
export const NoteForm: React.FC = () => {
  const { translate } = useI18n()
  const [delivery, setDelivery] = useState<Delivery>({ status: 'writing' })
  const sentRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (delivery.status === 'sent') {
      sentRef.current?.focus()
    }
  }, [delivery.status])

  const send = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()

    if (delivery.status === 'sending') {
      return
    }

    const data = new FormData(event.currentTarget)

    const isFilledByBot = data.get(HONEYPOT_FIELD) !== null

    if (isFilledByBot) {
      setDelivery({ status: 'sent' })
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
        ? { status: 'sent' }
        : { error: sent.error, status: 'failed' }
    )
  }

  return (
    <section aria-labelledby='note-title' className='note-section'>
      <div className='note-intro'>
        <h2 className='note-title' id='note-title'>
          {translate('contact.form.title')}
        </h2>
        <p>{translate('contact.form.intro')}</p>
      </div>
      {delivery.status === 'sent' ? (
        <div className='note-sent'>
          <Icon className='note-sent-icon' name='check' />
          <p ref={sentRef} tabIndex={-1}>
            {translate('contact.form.sent')}
          </p>
          <SiteButton
            onPress={() => setDelivery({ status: 'writing' })}
            variant='line'
          >
            {translate('contact.form.again')}
          </SiteButton>
        </div>
      ) : (
        <Form className='note-form' onSubmit={(event) => void send(event)}>
          <div className='note-pair'>
            <TextField
              autoComplete='name'
              className='note-field'
              isRequired
              name='name'
              validate={(value) =>
                value.trim() === ''
                  ? translate('contact.form.nameMissing')
                  : null
              }
            >
              <Label>{translate('contact.form.name')}</Label>
              <Input className='note-box' />
              <NoteError />
            </TextField>
            <TextField
              autoComplete='email'
              className='note-field'
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
              <Input className='note-box' spellCheck={false} />
              <Text className='note-hint' slot='description'>
                {translate('contact.form.emailHint')}
              </Text>
              <NoteError />
            </TextField>
          </div>
          <TextField
            className='note-field'
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
            <TextArea className='note-box' rows={7} />
            <NoteError />
          </TextField>
          <input
            aria-hidden='true'
            autoComplete='off'
            className='note-trap'
            name={HONEYPOT_FIELD}
            tabIndex={-1}
            type='checkbox'
          />
          {delivery.status === 'failed' && (
            <p className='note-failure' role='alert'>
              <Icon className='note-error-icon' name='warning' />
              {translate(
                delivery.error === 'refused'
                  ? 'contact.form.failure.refused'
                  : 'contact.form.failure.unreachable'
              )}
            </p>
          )}
          <div className='note-send'>
            <SiteButton
              icon='send'
              isPending={delivery.status === 'sending'}
              pendingLabel={translate('contact.form.sending')}
              type='submit'
              variant='ink'
            >
              {translate('contact.form.send')}
            </SiteButton>
          </div>
        </Form>
      )}
    </section>
  )
}
