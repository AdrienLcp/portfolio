import type React from 'react'
import { useId } from 'react'

import { useDrawingText } from './drawing-text'

const QR_SIZE = 21
const QR_CELL = 6
const QR_SEED = 20260929
const QR_FILL_THRESHOLD = 0.52
const QR_FINDER_ORIGINS = [
  [0, 0],
  [14, 0],
  [0, 14]
] as const

type QrCell = { x: number; y: number }

const isInFinder = (x: number, y: number): boolean =>
  (x < 8 && y < 8) || (x > 12 && y < 8) || (x < 8 && y > 12)

const buildQrCells = (): QrCell[] => {
  let seed = QR_SEED
  const random = (): number => {
    seed = (seed * 1103515245 + 12345) % 2147483648
    return seed / 2147483648
  }
  const cells: QrCell[] = []
  for (let y = 0; y < QR_SIZE; y++) {
    for (let x = 0; x < QR_SIZE; x++) {
      if (isInFinder(x, y)) {
        continue
      }
      if (random() > QR_FILL_THRESHOLD) {
        cells.push({ x: x * QR_CELL, y: y * QR_CELL })
      }
    }
  }
  return cells
}

const QR_CELLS = buildQrCells()

const QrCode: React.FC = () => (
  <g fill='#15161a' transform='translate(8 8)'>
    {QR_CELLS.map(({ x, y }) => (
      <rect height={QR_CELL} key={`${x}-${y}`} width={QR_CELL} x={x} y={y} />
    ))}
    {QR_FINDER_ORIGINS.map(([column, row]) => {
      const x = column * QR_CELL
      const y = row * QR_CELL
      return (
        <g key={`${column}-${row}`}>
          <rect height='42' width='42' x={x} y={y} />
          <rect fill='#ffffff' height='30' width='30' x={x + 6} y={y + 6} />
          <rect height='18' width='18' x={x + 12} y={y + 12} />
        </g>
      )
    })}
  </g>
)

/** Hand-drawn Taverla screen: the host screen with the room QR code and a phone buzzer. */
export const TaverlaDrawing: React.FC = () => {
  const text = useDrawingText('taverla')
  const titleId = useId()

  return (
    <svg
      aria-labelledby={titleId}
      className='screen'
      role='img'
      viewBox='0 0 560 380'
    >
      <title id={titleId}>{text.title}</title>
      <g>
        <rect fill='var(--ink)' height='248' rx='10' width='396' x='6' y='18' />
        <rect
          fill='var(--screen)'
          height='224'
          rx='3'
          width='372'
          x='18'
          y='30'
        />
        <rect fill='var(--ink)' height='26' width='68' x='170' y='266' />
        <rect fill='var(--ink)' height='8' rx='2' width='156' x='126' y='290' />
        <text
          fill='var(--ink)'
          fontFamily='Sofia Sans Condensed'
          fontSize='20'
          fontWeight='800'
          letterSpacing='1'
          x='38'
          y='62'
        >
          {text.buzzer}
        </text>
        <text
          fill='var(--ink-soft)'
          fontFamily='Sofia Sans'
          fontSize='11'
          x='38'
          y='80'
        >
          {text.scanToJoin}
        </text>
        <g transform='translate(38 92)'>
          <rect
            fill='#ffffff'
            height='142'
            stroke='var(--ink)'
            strokeWidth='1'
            width='142'
          />
          <QrCode />
        </g>
        <line stroke='var(--rule)' x1='206' x2='206' y1='50' y2='236' />
        <text
          fill='var(--ink-soft)'
          fontFamily='Sofia Sans Condensed'
          fontSize='11'
          fontWeight='700'
          letterSpacing='1.5'
          x='224'
          y='62'
        >
          {text.seated}
        </text>
        <g fill='var(--ink)' fontFamily='Sofia Sans Condensed' fontSize='15'>
          <rect fill='var(--violet)' height='30' width='148' x='224' y='74' />
          <text fill='var(--on-violet)' fontWeight='700' x='234' y='94'>
            Ada
          </text>
          <text
            fill='var(--on-violet)'
            fontWeight='700'
            textAnchor='end'
            x='362'
            y='94'
          >
            {text.first}
          </text>
          <line stroke='var(--rule)' x1='224' x2='372' y1='112' y2='112' />
          <text x='234' y='132'>
            Grace
          </text>
          <line stroke='var(--rule)' x1='224' x2='372' y1='142' y2='142' />
          <text x='234' y='162'>
            Linus
          </text>
          <line stroke='var(--rule)' x1='224' x2='372' y1='172' y2='172' />
          <text x='234' y='192'>
            Margaret
          </text>
          <line stroke='var(--rule)' x1='224' x2='372' y1='202' y2='202' />
          <text fill='var(--ink-soft)' fontSize='12' x='234' y='228'>
            {text.waiting}
          </text>
        </g>
      </g>
      <g transform='translate(378 70)'>
        <rect fill='var(--ink)' height='300' rx='24' width='160' x='0' y='0' />
        <rect
          fill='var(--screen)'
          height='276'
          rx='16'
          width='142'
          x='9'
          y='12'
        />
        <rect fill='var(--ink)' height='8' rx='4' width='44' x='58' y='18' />
        <text
          fill='var(--ink-soft)'
          fontFamily='Sofia Sans Condensed'
          fontSize='11'
          fontWeight='700'
          letterSpacing='1.3'
          x='22'
          y='52'
        >
          {text.roomBuzzer}
        </text>
        <text
          fill='var(--ink)'
          fontFamily='Sofia Sans Condensed'
          fontSize='20'
          fontWeight='800'
          x='22'
          y='74'
        >
          Ada
        </text>
        <circle cx='80' cy='166' fill='var(--violet)' r='56' />
        <circle
          cx='80'
          cy='166'
          fill='none'
          r='56'
          stroke='var(--ink)'
          strokeWidth='3'
        />
        <circle
          cx='80'
          cy='166'
          fill='none'
          r='66'
          stroke='var(--violet)'
          strokeDasharray='3 5'
          strokeWidth='1.5'
        />
        <text
          fill='var(--on-violet)'
          fontFamily='Sofia Sans Condensed'
          fontSize='24'
          fontWeight='900'
          letterSpacing='2'
          textAnchor='middle'
          x='80'
          y='174'
        >
          {text.buzz}
        </text>
        <text
          fill='var(--ink-soft)'
          fontFamily='Sofia Sans'
          fontSize='10.5'
          textAnchor='middle'
          x='80'
          y='262'
        >
          {text.firstTakesRound}
        </text>
      </g>
    </svg>
  )
}

/** Taverla mechanism: one server holds a socket to every screen and stamps each buzz. */
export const TaverlaMechanism: React.FC = () => {
  const text = useDrawingText('taverla')
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
          width='148'
          x='206'
          y='112'
        />
        <rect
          className='draw'
          height='84'
          pathLength={1}
          style={{ '--d': 1 }}
          width='140'
          x='20'
          y='20'
        />
        <path
          className='draw'
          d='M206 138 C 170 138, 160 90, 160 72'
          pathLength={1}
          strokeDasharray='1'
          style={{ '--d': 2 }}
        />
        <path
          className='draw'
          d='M354 132 C 400 132, 410 38, 452 38'
          pathLength={1}
          style={{ '--d': 3 }}
        />
        <path
          className='draw'
          d='M354 144 C 410 144, 420 108, 452 108'
          pathLength={1}
          style={{ '--d': 4 }}
        />
        <path
          className='draw'
          d='M354 156 C 410 156, 420 178, 452 178'
          pathLength={1}
          style={{ '--d': 5 }}
        />
        <path
          className='draw'
          d='M354 168 C 400 168, 410 248, 452 248'
          pathLength={1}
          style={{ '--d': 6 }}
        />
        <rect
          className='draw'
          height='44'
          pathLength={1}
          rx='5'
          style={{ '--d': 4 }}
          width='28'
          x='452'
          y='18'
        />
        <rect
          className='draw'
          height='44'
          pathLength={1}
          rx='5'
          style={{ '--d': 5 }}
          width='28'
          x='452'
          y='88'
        />
        <rect
          className='draw'
          height='44'
          pathLength={1}
          rx='5'
          style={{ '--d': 6 }}
          width='28'
          x='452'
          y='158'
        />
        <rect
          className='draw'
          height='44'
          pathLength={1}
          rx='5'
          style={{ '--d': 7 }}
          width='28'
          x='452'
          y='228'
        />
      </g>
      <rect
        className='fade'
        fill='currentColor'
        height='44'
        rx='5'
        style={{ '--d': 8 }}
        width='28'
        x='452'
        y='18'
      />
      <text
        className='lbl-strong fade'
        style={{ '--d': 1 }}
        textAnchor='middle'
        x='280'
        y='146'
      >
        {text.server}
      </text>
      <text
        className='fade soft'
        style={{ '--d': 1 }}
        textAnchor='middle'
        x='280'
        y='166'
      >
        {text.serverDetail}
      </text>
      <text
        className='lbl-strong fade'
        style={{ '--d': 2 }}
        textAnchor='middle'
        x='90'
        y='58'
      >
        {text.host}
      </text>
      <text
        className='fade soft'
        style={{ '--d': 2 }}
        textAnchor='middle'
        x='90'
        y='78'
      >
        {text.hostDetail}
      </text>
      <text className='fade' style={{ '--d': 8 }} x='492' y='45'>
        {text.firstBuzz}
      </text>
      <text className='fade soft' style={{ '--d': 8 }} x='492' y='115'>
        {text.secondBuzz}
      </text>
      <text className='fade soft' style={{ '--d': 8 }} x='492' y='185'>
        {text.thirdBuzz}
      </text>
      <text className='fade soft' style={{ '--d': 8 }} x='492' y='255'>
        —
      </text>
      <text
        className='fade soft'
        style={{ '--d': 5 }}
        textAnchor='middle'
        x='390'
        y='292'
      >
        {text.socketToPhones}
      </text>
      <text className='fade soft' style={{ '--d': 6 }} x='20' y='232'>
        {text.orderLine1}
      </text>
      <text className='fade soft' style={{ '--d': 6 }} x='20' y='250'>
        {text.orderLine2}
      </text>
      <text className='fade soft' style={{ '--d': 6 }} x='20' y='268'>
        {text.orderLine3}
      </text>
    </svg>
  )
}
