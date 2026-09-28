import type React from 'react'

const RACK_ROWS = [20, 75, 130] as const

/** Phones on the left buzz in, the server broadcasts to the screens on the right. */
export const SocketDiagram: React.FC = () => (
  <svg
    aria-hidden='true'
    className='socket-diagram'
    focusable='false'
    viewBox='0 0 320 190'
  >
    {RACK_ROWS.map((top) => (
      <g key={top}>
        <line
          className='wire inbound'
          x1='32'
          x2='110'
          y1={top + 20}
          y2={top + 20}
        />
        <line
          className='wire outbound'
          x1='210'
          x2='288'
          y1={top + 20}
          y2={top + 20}
        />
      </g>
    ))}
    {RACK_ROWS.map((top, index) => (
      <g key={top}>
        <rect className='rack' height='40' width='100' x='110' y={top} />
        <circle
          className={index === 2 ? 'led marigold' : 'led brick'}
          cx='130'
          cy={top + 20}
          r='5'
        />
        <line className='slot' x1='146' x2='192' y1={top + 20} y2={top + 20} />
      </g>
    ))}
    <circle className='device brick' cx='22' cy='40' r='10' />
    <circle className='device paper' cx='22' cy='95' r='10' />
    <circle className='device marigold' cx='22' cy='150' r='10' />
    <circle className='device marigold' cx='298' cy='40' r='10' />
    <circle className='device brick' cx='298' cy='95' r='10' />
    <circle className='device paper' cx='298' cy='150' r='10' />
  </svg>
)
