import type React from 'react'
import { useId } from 'react'

import { useDrawingText } from './drawing-text'

/** `counted` is the one ballot the deputy figure points at: it is drawn on top, in violet. */
type Ballot = 'for' | 'against' | 'absent' | 'counted'

const SHEET_TOP = 112
const ROW_PITCH = 27
const BALLOT_LEFT = 352
const BALLOT_PITCH = 17
const BALLOT_SIZE = 12
const OUTLINE_WIDTH = 1.5

const VOTE_ROWS: readonly (readonly Ballot[])[] = [
  [
    'against',
    'against',
    'against',
    'for',
    'for',
    'against',
    'against',
    'for',
    'absent',
    'for'
  ],
  [
    'for',
    'for',
    'absent',
    'for',
    'for',
    'absent',
    'for',
    'absent',
    'for',
    'for'
  ],
  [
    'for',
    'for',
    'for',
    'against',
    'against',
    'for',
    'for',
    'absent',
    'absent',
    'for'
  ],
  [
    'for',
    'against',
    'absent',
    'against',
    'for',
    'against',
    'counted',
    'for',
    'for',
    'absent'
  ],
  [
    'for',
    'against',
    'absent',
    'for',
    'for',
    'for',
    'for',
    'for',
    'against',
    'absent'
  ],
  [
    'for',
    'against',
    'against',
    'for',
    'against',
    'against',
    'against',
    'against',
    'absent',
    'for'
  ],
  [
    'against',
    'absent',
    'against',
    'for',
    'for',
    'for',
    'for',
    'for',
    'against',
    'absent'
  ],
  [
    'for',
    'for',
    'for',
    'absent',
    'for',
    'for',
    'absent',
    'for',
    'for',
    'absent'
  ]
]

type BallotCellProps = { ballot: Ballot; x: number; y: number }

const BallotCell: React.FC<BallotCellProps> = ({ ballot, x, y }) => {
  if (ballot === 'counted') {
    return null
  }
  if (ballot === 'against') {
    const inset = OUTLINE_WIDTH / 2
    return (
      <rect
        fill='none'
        height={BALLOT_SIZE - OUTLINE_WIDTH}
        stroke='var(--ink)'
        strokeWidth={OUTLINE_WIDTH}
        width={BALLOT_SIZE - OUTLINE_WIDTH}
        x={x + inset}
        y={y + inset}
      />
    )
  }
  return (
    <rect
      fill={ballot === 'for' ? 'var(--ink)' : 'var(--rule)'}
      height={BALLOT_SIZE}
      width={BALLOT_SIZE}
      x={x}
      y={y}
    />
  )
}

const VoteSheetRows: React.FC = () => (
  <g>
    {VOTE_ROWS.map((row, rowIndex) => {
      const top = SHEET_TOP + rowIndex * ROW_PITCH
      return (
        <g key={top}>
          <rect fill='var(--rule)' height='5' width='56' x='280' y={top + 4} />
          {row.map((ballot, column) => {
            const x = BALLOT_LEFT + column * BALLOT_PITCH
            return <BallotCell ballot={ballot} key={x} x={x} y={top} />
          })}
          <line
            stroke='var(--rule)'
            x1='280'
            x2='524'
            y1={top + 19.5}
            y2={top + 19.5}
          />
        </g>
      )
    })}
  </g>
)

/** Hand-drawn on-record screen: one figure about a deputy, wired to the ballot it counts on the official vote sheets. */
export const OnRecordDrawing: React.FC = () => {
  const text = useDrawingText('onRecord')
  const titleId = useId()

  return (
    <svg
      aria-labelledby={titleId}
      className='screen'
      role='img'
      viewBox='0 0 560 380'
    >
      <title id={titleId}>{text.title}</title>
      <g stroke='var(--ink)' strokeWidth='1.5'>
        <rect
          fill='var(--paper-sunk)'
          height='300'
          width='278'
          x='278'
          y='52'
        />
        <rect
          fill='var(--paper-sunk)'
          height='300'
          width='278'
          x='270'
          y='44'
        />
        <rect fill='var(--screen)' height='300' width='278' x='262' y='36' />
      </g>
      <g fontFamily='Sofia Sans Condensed'>
        <text
          fill='var(--ink-soft)'
          fontSize='10.5'
          fontWeight='700'
          letterSpacing='1.3'
          x='280'
          y='62'
        >
          {text.assembly}
        </text>
        <text
          fill='var(--ink)'
          fontSize='19'
          fontWeight='800'
          letterSpacing='0.5'
          x='280'
          y='86'
        >
          {text.publicVotes}
        </text>
        <line
          stroke='var(--ink)'
          strokeWidth='1.5'
          x1='280'
          x2='524'
          y1='98'
          y2='98'
        />
        <VoteSheetRows />
        <rect fill='var(--violet)' height='12' width='12' x='454' y='193' />
        <rect
          fill='none'
          height='21'
          stroke='var(--violet)'
          strokeWidth='1.5'
          width='21'
          x='449.5'
          y='188.5'
        />
      </g>
      <path
        d='M208 188 C 300 188, 460 150, 460 188'
        fill='none'
        stroke='var(--screen)'
        strokeLinecap='round'
        strokeWidth='6'
      />
      <path
        d='M208 188 C 300 188, 460 150, 460 188'
        fill='none'
        stroke='var(--ink)'
        strokeWidth='2'
      />
      <g>
        <rect
          fill='var(--screen)'
          height='120'
          stroke='var(--ink)'
          strokeWidth='2'
          width='184'
          x='24'
          y='128'
        />
        <circle cx='208' cy='188' fill='var(--ink)' r='4' />
        <g fontFamily='Sofia Sans Condensed'>
          <text
            fill='var(--ink-soft)'
            fontSize='10.5'
            fontWeight='700'
            letterSpacing='1.3'
            x='40'
            y='152'
          >
            {text.oneFigure}
          </text>
          <text
            fill='var(--violet)'
            fontSize='38'
            fontWeight='900'
            letterSpacing='1'
            x='40'
            y='198'
          >
            {text.for}
          </text>
          <text fill='var(--ink-soft)' fontSize='12' x='40' y='228'>
            {text.withGroup}
          </text>
        </g>
      </g>
      <g fill='currentColor' fontFamily='Sofia Sans Condensed' fontSize='13'>
        <path d='M216 62 H 262' stroke='currentColor' strokeWidth='1' />
        <circle cx='216' cy='62' r='3' />
        <text fontWeight='700' letterSpacing='1' x='24' y='58'>
          {text.officialRecord}
        </text>
        <text opacity='0.82' x='24' y='74'>
          {text.citesSource}
        </text>
        <text fontWeight='700' letterSpacing='1' x='24' y='292'>
          {text.everyFigure}
        </text>
        <text opacity='0.82' x='24' y='308'>
          {text.linksVotes}
        </text>
        <text fontWeight='700' letterSpacing='1' x='24' y='340'>
          {text.noRanking}
        </text>
      </g>
    </svg>
  )
}

/** on-record mechanism: a nightly job asks the open data what changed, then rebuilds and deploys only that. */
export const OnRecordMechanism: React.FC = () => {
  const text = useDrawingText('onRecord')
  const titleId = useId()

  return (
    <svg
      aria-labelledby={titleId}
      className='diagram'
      role='img'
      viewBox='0 0 560 300'
    >
      <title id={titleId}>{text.mechanismTitle}</title>
      <g fill='none' stroke='currentColor' strokeWidth='1.6'>
        <rect
          className='draw'
          height='76'
          pathLength={1}
          style={{ '--d': 0 }}
          width='140'
          x='16'
          y='112'
        />
        <path
          className='draw'
          d='M156 150 H 210'
          pathLength={1}
          style={{ '--d': 1 }}
        />
        <rect
          className='draw'
          height='76'
          pathLength={1}
          style={{ '--d': 1 }}
          width='140'
          x='210'
          y='112'
        />
        <path
          className='draw'
          d='M350 132 C 382 132, 378 56, 404 56'
          pathLength={1}
          style={{ '--d': 2 }}
        />
        <rect
          className='draw'
          height='64'
          pathLength={1}
          style={{ '--d': 3 }}
          width='140'
          x='404'
          y='24'
        />
        <path
          className='draw'
          d='M474 88 V 120'
          pathLength={1}
          style={{ '--d': 4 }}
        />
        <rect
          className='draw'
          height='64'
          pathLength={1}
          style={{ '--d': 4 }}
          width='140'
          x='404'
          y='120'
        />
        <path
          className='draw'
          d='M350 168 C 382 168, 378 252, 404 252'
          pathLength={1}
          strokeDasharray='4 5'
          style={{ '--d': 3 }}
        />
        <rect
          className='draw'
          height='56'
          pathLength={1}
          strokeDasharray='4 4'
          style={{ '--d': 5 }}
          width='140'
          x='404'
          y='224'
        />
      </g>
      <text
        className='lbl-strong fade'
        style={{ '--d': 0 }}
        textAnchor='middle'
        x='86'
        y='146'
      >
        {text.nightly}
      </text>
      <text
        className='fade soft'
        style={{ '--d': 0 }}
        textAnchor='middle'
        x='86'
        y='166'
      >
        GitHub Actions
      </text>
      <text
        className='lbl-strong fade'
        style={{ '--d': 1 }}
        textAnchor='middle'
        x='280'
        y='146'
      >
        {text.openData}
      </text>
      <text
        className='fade soft'
        style={{ '--d': 1 }}
        textAnchor='middle'
        x='280'
        y='166'
      >
        {text.anythingChanged}
      </text>
      <text
        className='fade soft'
        style={{ '--d': 2 }}
        textAnchor='end'
        x='398'
        y='40'
      >
        {text.newVote}
      </text>
      <text
        className='lbl-strong fade'
        style={{ '--d': 3 }}
        textAnchor='middle'
        x='474'
        y='52'
      >
        {text.rebuild}
      </text>
      <text
        className='fade soft'
        style={{ '--d': 3 }}
        textAnchor='middle'
        x='474'
        y='72'
      >
        {text.onlyWhatChanged}
      </text>
      <text
        className='lbl-strong fade'
        style={{ '--d': 4 }}
        textAnchor='middle'
        x='474'
        y='148'
      >
        {text.deploy}
      </text>
      <text
        className='fade soft'
        style={{ '--d': 4 }}
        textAnchor='middle'
        x='474'
        y='168'
      >
        Cloudflare Pages
      </text>
      <text className='fade soft' style={{ '--d': 3 }} x='356' y='216'>
        {text.noNewVote}
      </text>
      <text
        className='lbl-strong fade'
        style={{ '--d': 5 }}
        textAnchor='middle'
        x='474'
        y='248'
      >
        {text.quietNight}
      </text>
      <text
        className='fade soft'
        style={{ '--d': 5 }}
        textAnchor='middle'
        x='474'
        y='268'
      >
        {text.nothingDeployed}
      </text>
      <text className='fade soft' style={{ '--d': 6 }} x='16' y='232'>
        {text.budgetLine1}
      </text>
      <text className='fade soft' style={{ '--d': 6 }} x='16' y='250'>
        {text.budgetLine2}
      </text>
      <text className='fade soft' style={{ '--d': 6 }} x='16' y='268'>
        {text.budgetLine3}
      </text>
    </svg>
  )
}
