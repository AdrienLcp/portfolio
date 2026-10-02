import type React from 'react'
import { useId } from 'react'

import { useDrawingText } from './drawing-text'

/** Hand-drawn Séance screen: a phone showing one movement plate, offline and saved on the device. */
export const SeanceDrawing: React.FC = () => {
  const text = useDrawingText('seance')
  const titleId = useId()

  return (
    <svg
      aria-labelledby={titleId}
      className='screen'
      role='img'
      viewBox='0 0 560 380'
    >
      <title id={titleId}>{text.title}</title>
      <g transform='translate(200 20)'>
        <rect fill='var(--ink)' height='340' rx='26' width='180' x='0' y='0' />
        <rect
          fill='var(--screen)'
          height='314'
          rx='17'
          width='160'
          x='10'
          y='13'
        />
        <rect fill='var(--ink)' height='8' rx='4' width='48' x='66' y='20' />
        <g fill='var(--ink)' fontFamily='Sofia Sans Condensed'>
          <text
            fill='var(--ink-soft)'
            fontSize='10.5'
            fontWeight='700'
            letterSpacing='1.3'
            x='24'
            y='54'
          >
            {text.plate}
          </text>
          <text fontSize='22' fontWeight='800' x='24' y='78'>
            {text.pushUp}
          </text>
          <rect
            fill='none'
            height='120'
            stroke='var(--rule)'
            width='132'
            x='24'
            y='92'
          />
          <g
            fill='none'
            stroke='var(--ink)'
            strokeLinecap='round'
            strokeWidth='3.2'
          >
            <circle cx='126' cy='146' fill='var(--ink)' r='8' stroke='none' />
            <path d='M117 152 L 66 172' />
            <path d='M66 172 L 42 186' />
            <path d='M112 154 L 116 172 L 118 190' />
            <path d='M108 156 L 104 176 L 108 190' strokeOpacity='0.45' />
            <line
              stroke='var(--rule)'
              strokeWidth='1'
              x1='32'
              x2='148'
              y1='191'
              y2='191'
            />
          </g>
          <circle cx='117' cy='152' fill='var(--violet)' r='2.6' />
          <circle cx='66' cy='172' fill='var(--violet)' r='2.6' />
          <circle cx='116' cy='172' fill='var(--violet)' r='2.6' />
          <text fill='var(--ink-soft)' fontSize='12' x='24' y='236'>
            {text.set}
          </text>
          <text
            fill='var(--ink-soft)'
            fontSize='12'
            textAnchor='end'
            x='156'
            y='236'
          >
            {text.rest}
          </text>
          <rect
            fill='var(--paper-sunk)'
            height='6'
            width='132'
            x='24'
            y='244'
          />
          <rect fill='var(--violet)' height='6' width='84' x='24' y='244' />
          <rect
            fill='var(--ink)'
            height='34'
            rx='3'
            width='132'
            x='24'
            y='266'
          />
          <text
            fill='var(--paper)'
            fontSize='13'
            fontWeight='700'
            letterSpacing='1.4'
            textAnchor='middle'
            x='90'
            y='288'
          >
            {text.nextMovement}
          </text>
        </g>
      </g>
      <g fill='var(--ink)' fontFamily='Sofia Sans Condensed' fontSize='13'>
        <path d='M384 96 H 432' stroke='var(--ink)' strokeWidth='1' />
        <circle cx='384' cy='96' fill='var(--ink)' r='3' />
        <text fontWeight='700' letterSpacing='1' x='440' y='92'>
          {text.offline}
        </text>
        <text fill='var(--ink-soft)' x='440' y='108'>
          {text.everyRoute}
        </text>
        <path d='M384 254 H 432' stroke='var(--ink)' strokeWidth='1' />
        <circle cx='384' cy='254' fill='var(--ink)' r='3' />
        <text fontWeight='700' letterSpacing='1' x='440' y='250'>
          {text.onDevice}
        </text>
        <text fill='var(--ink-soft)' x='440' y='266'>
          {text.nowhereElse}
        </text>
        <path d='M196 170 H 150' stroke='var(--ink)' strokeWidth='1' />
        <circle cx='196' cy='170' fill='var(--ink)' r='3' />
        <text
          fontWeight='700'
          letterSpacing='1'
          textAnchor='end'
          x='142'
          y='166'
        >
          {text.joints}
        </text>
        <text fill='var(--ink-soft)' textAnchor='end' x='142' y='182'>
          {text.figuresChained}
        </text>
        <text fill='var(--ink-soft)' textAnchor='end' x='142' y='198'>
          {text.fromTheHip}
        </text>
      </g>
    </svg>
  )
}

/** Séance mechanism: everything is cached on the device, the network is cut and there is no server. */
export const SeanceMechanism: React.FC = () => {
  const text = useDrawingText('seance')
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
          height='268'
          pathLength={1}
          rx='18'
          style={{ '--d': 0 }}
          width='360'
          x='16'
          y='16'
        />
        <rect
          className='draw'
          height='64'
          pathLength={1}
          style={{ '--d': 1 }}
          width='136'
          x='44'
          y='52'
        />
        <rect
          className='draw'
          height='64'
          pathLength={1}
          style={{ '--d': 2 }}
          width='136'
          x='212'
          y='52'
        />
        <rect
          className='draw'
          height='64'
          pathLength={1}
          style={{ '--d': 3 }}
          width='136'
          x='128'
          y='176'
        />
        <path
          className='draw'
          d='M180 84 H 212'
          pathLength={1}
          style={{ '--d': 2 }}
        />
        <path
          className='draw'
          d='M280 116 L 230 176'
          pathLength={1}
          style={{ '--d': 3 }}
        />
        <path
          className='draw'
          d='M112 116 L 162 176'
          pathLength={1}
          style={{ '--d': 3 }}
        />
        <path
          className='draw'
          d='M376 150 H 420'
          pathLength={1}
          style={{ '--d': 4 }}
        />
        <path
          className='draw'
          d='M448 150 H 480'
          pathLength={1}
          strokeDasharray='4 5'
          style={{ '--d': 5 }}
        />
        <path
          className='draw'
          d='M426 140 l 16 20 M 442 140 l -16 20'
          pathLength={1}
          strokeWidth='2.4'
          style={{ '--d': 6 }}
        />
        <rect
          className='draw'
          height='56'
          pathLength={1}
          strokeDasharray='4 4'
          style={{ '--d': 5 }}
          width='72'
          x='480'
          y='122'
        />
        <path
          className='draw'
          d='M264 208 C 330 208, 360 250, 420 262'
          pathLength={1}
          style={{ '--d': 6 }}
        />
      </g>
      <text className='lbl-strong fade' style={{ '--d': 0 }} x='36' y='40'>
        {text.device}
      </text>
      <text
        className='lbl-strong fade'
        style={{ '--d': 1 }}
        textAnchor='middle'
        x='112'
        y='82'
      >
        {text.appShell}
      </text>
      <text
        className='fade soft'
        style={{ '--d': 1 }}
        textAnchor='middle'
        x='112'
        y='100'
      >
        {text.precached}
      </text>
      <text
        className='lbl-strong fade'
        style={{ '--d': 2 }}
        textAnchor='middle'
        x='280'
        y='82'
      >
        {text.serviceWorker}
      </text>
      <text
        className='fade soft'
        style={{ '--d': 2 }}
        textAnchor='middle'
        x='280'
        y='100'
      >
        {text.workerDetail}
      </text>
      <text
        className='lbl-strong fade'
        style={{ '--d': 3 }}
        textAnchor='middle'
        x='196'
        y='206'
      >
        IndexedDB
      </text>
      <text
        className='fade soft'
        style={{ '--d': 3 }}
        textAnchor='middle'
        x='196'
        y='224'
      >
        {text.everyNumber}
      </text>
      <text
        className='fade'
        style={{ '--d': 6 }}
        textAnchor='middle'
        x='516'
        y='155'
      >
        {text.noServer}
      </text>
      <text className='fade soft' style={{ '--d': 6 }} x='428' y='192'>
        {text.networkCut}
      </text>
      <text className='fade' style={{ '--d': 7 }} x='428' y='266'>
        {text.backup}
      </text>
      <text className='fade soft' style={{ '--d': 7 }} x='428' y='284'>
        {text.onlyWayOut}
      </text>
    </svg>
  )
}
