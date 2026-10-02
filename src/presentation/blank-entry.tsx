import type React from 'react'

import { RegisterLink } from '@/presentation/components/register/register-link'
import { RubberStamp } from '@/presentation/components/register/rubber-stamp'

import './blank-entry.sass'

type BlankEntryProps = {
  backHref: string
  backLabel: string
  /** Printed under the note: the address asked for, the failure caught. */
  detail?: React.ReactNode
  /** The sentence that explains the blank, and what to do about it. */
  note: string
  /** The word pressed across the empty row. */
  stamp: string
  title: string
}

/**
 * A row of the register with nothing written in it: what a page shows when
 * there is no entry to print, or the entry could not be printed.
 */
export const BlankEntry: React.FC<BlankEntryProps> = ({
  backHref,
  backLabel,
  detail,
  note,
  stamp,
  title
}) => (
  <section aria-labelledby='blank-entry-title' className='blank-entry'>
    <div className='blank-entry-grid'>
      <span aria-hidden='true' className='blank-entry-date' />
      <div className='blank-entry-text'>
        <h1 className='blank-entry-title' id='blank-entry-title'>
          {title}
        </h1>
        <p className='blank-entry-note'>{note}</p>
        {detail !== undefined && <p className='blank-entry-detail'>{detail}</p>}
        <div className='blank-entry-actions'>
          <RegisterLink href={backHref} icon='back' variant='ink'>
            {backLabel}
          </RegisterLink>
        </div>
      </div>
      <div className='blank-entry-stamp'>
        <RubberStamp isFresh label={stamp} />
      </div>
    </div>
  </section>
)
