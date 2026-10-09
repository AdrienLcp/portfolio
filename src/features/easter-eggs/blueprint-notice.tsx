import type React from 'react'
import { useEffect, useState } from 'react'

import { useTranslate } from '@/presentation/i18n/i18n-provider'

import { useIsBlueprintOn } from './blueprint-mode'

import './blueprint-theme.sass'
import './blueprint-notice.sass'

const NOTICE_SHOWN_MS = 6000

/**
 * Sets `data-blueprint` on `<html>` while the hidden theme is on, and shows a
 * note in the corner for a few seconds to say how it got there and how to
 * leave it.
 */
export const BlueprintNotice: React.FC = () => {
  const translate = useTranslate()
  const isOn = useIsBlueprintOn()
  const [isNoticeShown, setIsNoticeShown] = useState(false)

  useEffect(() => {
    const root = document.documentElement

    if (!isOn) {
      delete root.dataset.blueprint
      setIsNoticeShown(false)

      return
    }

    root.dataset.blueprint = ''
    setIsNoticeShown(true)

    const hideNotice = setTimeout(
      () => setIsNoticeShown(false),
      NOTICE_SHOWN_MS
    )

    return () => clearTimeout(hideNotice)
  }, [isOn])

  return (
    <div className='blueprint-notice' role='status'>
      {isNoticeShown && (
        <div className='blueprint-notice-card'>
          <p className='blueprint-notice-title'>
            {translate('easterEggs.blueprint.title')}
          </p>
          <p>{translate('easterEggs.blueprint.unlocked')}</p>
          <p>{translate('easterEggs.blueprint.leave')}</p>
        </div>
      )}
    </div>
  )
}
