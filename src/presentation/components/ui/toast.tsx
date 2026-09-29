import type React from 'react'
import {
  UNSTABLE_ToastRegion as ReactAriaToastRegion,
  Text,
  UNSTABLE_Toast as Toast,
  UNSTABLE_ToastContent as ToastContent,
  UNSTABLE_ToastQueue as ToastQueue
} from 'react-aria-components'

import { Icon } from '@/presentation/components/icon'
import { useTranslate } from '@/presentation/i18n/i18n-provider'

import { Button } from './button'

import './toast.sass'

type ToastMessage = {
  title: string
}

const TOAST_TIMEOUT_MS = 4000

const toastQueue = new ToastQueue<ToastMessage>({ maxVisibleToasts: 1 })

export const showToast = (title: string): void => {
  toastQueue.add({ title }, { timeout: TOAST_TIMEOUT_MS })
}

export const ToastRegion: React.FC = () => {
  const translate = useTranslate()

  return (
    <ReactAriaToastRegion className='toast-region' queue={toastQueue}>
      {({ toast }) => (
        <Toast className='toast' toast={toast}>
          <Icon className='toast-icon' name='check' />
          <ToastContent className='toast-content'>
            <Text slot='title'>{toast.content.title}</Text>
          </ToastContent>
          <Button
            aria-label={translate('ui.close')}
            className='toast-close'
            icon='close'
            slot='close'
          />
        </Toast>
      )}
    </ReactAriaToastRegion>
  )
}
