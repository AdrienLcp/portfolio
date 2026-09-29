import type React from 'react'

const JOURNAL_ROWS = [
  { className: 'entry brick', top: 44, width: 34 },
  { className: 'entry marigold', top: 62, width: 26 },
  { className: 'entry brick', top: 80, width: 40 },
  { className: 'entry paper', top: 98, width: 30 }
] as const

/**
 * The phone keeps its own journal; the wire to the server is cut, and the
 * rack it led to was never installed.
 */
export const OfflineDiagram: React.FC = () => (
  <svg
    aria-hidden='true'
    className='offline-diagram'
    focusable='false'
    viewBox='0 0 320 150'
  >
    <rect
      className='device paper'
      height='130'
      rx='12'
      width='80'
      x='16'
      y='10'
    />
    <line className='slot' x1='44' x2='68' y1='26' y2='26' />
    {JOURNAL_ROWS.map(({ className, top, width }) => (
      <rect
        className={className}
        height='8'
        key={top}
        width={width}
        x='30'
        y={top}
      />
    ))}
    <line className='wire' x1='96' x2='150' y1='75' y2='75' />
    <line className='cut' x1='158' x2='170' y1='64' y2='86' />
    <line className='cut' x1='170' x2='182' y1='64' y2='86' />
    <rect className='rack absent' height='40' width='100' x='204' y='55' />
  </svg>
)
