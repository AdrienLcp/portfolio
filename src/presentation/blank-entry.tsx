import type React from 'react'

import { SiteLink } from '@/presentation/components/site-link/site-link'

import './blank-entry.sass'

type BlankEntryProps = {
  backHref: string
  backLabel: string
  /** Printed under the note: the address asked for, the failure caught. */
  detail?: React.ReactNode
  /** The sentence that explains the blank, and what to do about it. */
  note: string
  title: string
}

/**
 * What a page shows when there is nothing to show at its address, or what was
 * there could not be shown: a title, the reason, and the way back.
 */
export const BlankEntry: React.FC<BlankEntryProps> = ({
  backHref,
  backLabel,
  detail,
  note,
  title
}) => (
  <section aria-labelledby='blank-entry-title' className='blank-entry'>
    <div className='blank-entry-card'>
      <h1 className='blank-entry-title' id='blank-entry-title'>
        {title}
      </h1>
      <p className='blank-entry-note'>{note}</p>
      {detail !== undefined && <p className='blank-entry-detail'>{detail}</p>}
      <div className='blank-entry-actions'>
        <SiteLink href={backHref} icon='back' variant='ink'>
          {backLabel}
        </SiteLink>
      </div>
    </div>
  </section>
)
