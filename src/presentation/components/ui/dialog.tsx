import type React from 'react'
import {
  Heading,
  Modal,
  ModalOverlay,
  Dialog as ReactAriaDialog
} from 'react-aria-components'

import { useTranslate } from '@/presentation/i18n/i18n-provider'

import { Button } from './button'

import './dialog.sass'

export { DialogTrigger } from 'react-aria-components'

type DialogProps = {
  children: React.ReactNode
  title: React.ReactNode
}

/**
 * A printed sheet laid over the table, dismissable from its cross, from
 * Escape, or from a press on the table around it.
 */
export const Dialog: React.FC<DialogProps> = ({ children, title }) => {
  const translate = useTranslate()

  return (
    <ModalOverlay className='dialog-overlay' isDismissable>
      <Modal className='dialog-modal'>
        <ReactAriaDialog className='dialog'>
          <header className='dialog-header'>
            <Heading className='dialog-title' slot='title'>
              {title}
            </Heading>
            <Button
              aria-label={translate('ui.close')}
              icon='close'
              slot='close'
            />
          </header>
          {children}
        </ReactAriaDialog>
      </Modal>
    </ModalOverlay>
  )
}
