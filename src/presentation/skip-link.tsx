import type React from 'react'

import { focusMain, MAIN_HREF } from '@/presentation/components/main'
import { useTranslate } from '@/presentation/i18n/i18n-provider'

import './skip-link.sass'

export const SkipLink: React.FC = () => {
  const translate = useTranslate()

  return (
    <a
      className='token skip-link'
      href={MAIN_HREF}
      onClick={(event) => {
        event.preventDefault()
        focusMain()
      }}
    >
      {translate('header.skip')}
    </a>
  )
}
