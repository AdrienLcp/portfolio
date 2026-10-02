import type React from 'react'

import type { ReleaseState } from '@/features/projects/project'
import { useTranslate } from '@/presentation/i18n/i18n-provider'

import { stampDateOf } from './register-dates'

import './release-stamp.sass'

const INK_BLEED_ID = 'ink-bleed'

/**
 * The filter that roughens a stamp's ink, defined once per page and read by
 * every stamp through `url(#ink-bleed)`.
 */
export const StampInk: React.FC = () => (
  <svg aria-hidden='true' className='stamp-ink' focusable='false'>
    <filter height='120%' id={INK_BLEED_ID} width='120%' x='-10%' y='-10%'>
      <feTurbulence
        baseFrequency='1.4'
        numOctaves={2}
        result='noise'
        seed={7}
        type='fractalNoise'
      />
      <feColorMatrix
        in='noise'
        result='holes'
        type='matrix'
        values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.3 1.55'
      />
      <feComposite
        in='SourceGraphic'
        in2='holes'
        operator='in'
        result='speckled'
      />
      <feTurbulence
        baseFrequency='0.05'
        numOctaves={1}
        result='warp'
        seed={3}
        type='fractalNoise'
      />
      <feDisplacementMap in='speckled' in2='warp' scale={1.6} />
    </filter>
  </svg>
)

type ReleaseStampProps = {
  /** Printed under the state, and read in the stamp's name. */
  entered?: string
  /** Pressed onto the page as it loads: the register's newest entry. */
  isFresh?: boolean
  isSmall?: boolean
  state: ReleaseState
}

/** A rubber stamp in violet ink: the state of an entry, at a glance. */
export const ReleaseStamp: React.FC<ReleaseStampProps> = ({
  entered,
  isFresh = false,
  isSmall = false,
  state
}) => {
  const translate = useTranslate()
  const stateLabel = translate(`home.state.${state}`)
  const className = ['release-stamp', isSmall && 'small', isFresh && 'fresh']
    .filter(Boolean)
    .join(' ')

  return (
    <span
      aria-label={
        entered === undefined
          ? stateLabel
          : translate('home.state.stamp', { date: entered, state: stateLabel })
      }
      className={className}
      role='img'
    >
      <b>{stateLabel}</b>
      {entered !== undefined && <span>{stampDateOf(entered)}</span>}
    </span>
  )
}
