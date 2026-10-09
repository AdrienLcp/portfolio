import type React from 'react'

import { Icon } from '@/presentation/components/icon'
import { useTranslate } from '@/presentation/i18n/i18n-provider'

import { VisuallyHidden } from './visually-hidden'

type NewTabMarkProps = {
  iconClassName: string
}

/** Warns before the jump, in the link's own name. */
export const NewTabMark: React.FC<NewTabMarkProps> = ({ iconClassName }) => {
  const translate = useTranslate()

  return (
    <>
      <Icon className={iconClassName} name='newTab' />
      <VisuallyHidden elementType='span'>{` ${translate('ui.newTab')}`}</VisuallyHidden>
    </>
  )
}
