import type React from 'react'
import { useEffect, useRef, useState } from 'react'

import { ProjectRow } from '@/features/home/project-row'
import { scrollToElement } from '@/infrastructure/browser'
import { SiteLink } from '@/presentation/components/site-link/site-link'
import { useTranslate } from '@/presentation/i18n/i18n-provider'

const GIFT_URL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'

/**
 * The index's off-the-books project, written in only once the Konami code is
 * typed: opened, scrolled to and focused, so the reward is never missed.
 */
export const GiftRow: React.FC = () => {
  const translate = useTranslate()
  const [isOpen, setIsOpen] = useState(true)
  const rowRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    const row = rowRef.current
    const toggle = row?.querySelector('button')

    if (row !== null && toggle instanceof HTMLButtonElement) {
      scrollToElement(row)
      toggle.focus({ preventScroll: true })
    }
  }, [])

  return (
    <ProjectRow
      isDimmed={false}
      isOpen={isOpen}
      name={translate('easterEggs.gift.title')}
      onToggle={() => setIsOpen((wasOpen) => !wasOpen)}
      ref={rowRef}
      tagline={translate('easterEggs.gift.category')}
    >
      <div className='project-details'>
        <p>{translate('easterEggs.gift.summary')}</p>
        <div className='project-actions'>
          <SiteLink href={GIFT_URL} target='_blank' variant='ink'>
            {translate('easterEggs.gift.open')}
          </SiteLink>
        </div>
      </div>
    </ProjectRow>
  )
}
