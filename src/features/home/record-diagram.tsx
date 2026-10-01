import type React from 'react'

const BALLOT_ROWS = [
  ['marigold', 'marigold', 'brick', 'paper', 'marigold'],
  ['brick', 'marigold', 'brick', 'brick', 'paper'],
  ['marigold', 'paper', 'marigold', 'marigold', 'brick'],
  ['paper', 'brick', 'marigold', 'brick', 'marigold'],
  ['marigold', 'marigold', 'paper', 'brick', 'brick']
] as const

const TRACED_ROW = 2
const ROW_PITCH = 22
const FIRST_ROW_TOP = 30
const BALLOT_PITCH = 18
const BALLOT_SIZE = 12

const rowTop = (row: number): number => FIRST_ROW_TOP + row * ROW_PITCH

/**
 * A figure on the left is wired to the one vote it counts, on a stack of
 * official vote sheets: each row a vote, each square a ballot.
 */
export const RecordDiagram: React.FC = () => (
  <svg
    aria-hidden='true'
    className='record-diagram'
    focusable='false'
    viewBox='0 0 320 150'
  >
    <rect className='rack' height='40' width='76' x='10' y='55' />
    <text className='figure' textAnchor='middle' x='48' y='83'>
      42
    </text>
    <line
      className='wire flow'
      x1='86'
      x2='180'
      y1='75'
      y2={rowTop(TRACED_ROW) + BALLOT_SIZE / 2}
    />
    <rect className='sheet under' height='128' width='116' x='200' y='16' />
    <rect className='sheet under' height='128' width='116' x='194' y='12' />
    <rect className='sheet' height='128' width='116' x='188' y='8' />
    {BALLOT_ROWS.map((ballots, row) =>
      ballots.map((color, index) => (
        <rect
          className={`ballot ${color}`}
          height={BALLOT_SIZE}
          // biome-ignore lint/suspicious/noArrayIndexKey: the grid is fixed
          key={`${row}-${index}`}
          width={BALLOT_SIZE}
          x={202 + index * BALLOT_PITCH}
          y={rowTop(row)}
        />
      ))
    )}
    <rect
      className='trace'
      height='22'
      rx='3'
      width='98'
      x='196'
      y={rowTop(TRACED_ROW) - 5}
    />
  </svg>
)
