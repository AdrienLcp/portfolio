import type React from 'react'

import './rubber-stamp.sass'

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

type RubberStampProps = {
  /** What the stamp says once read aloud, when the printed words are not enough. */
  description?: string
  /** Pressed onto the page as it loads: the one moment the page is for. */
  isFresh?: boolean
  isSmall?: boolean
  label: string
  /** Printed small under the label: a date, most of the time. */
  note?: string
}

/** A rubber stamp in violet ink, pressed slightly askew. */
export const RubberStamp: React.FC<RubberStampProps> = ({
  description,
  isFresh = false,
  isSmall = false,
  label,
  note
}) => {
  const className = ['rubber-stamp', isSmall && 'small', isFresh && 'fresh']
    .filter(Boolean)
    .join(' ')

  return (
    <span aria-label={description ?? label} className={className} role='img'>
      <b>{label}</b>
      {note !== undefined && <span>{note}</span>}
    </span>
  )
}
