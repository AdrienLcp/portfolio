import type React from 'react'
import { useId } from 'react'

import { useDrawingText } from './drawing-text'
import TaverlaDrawingArtwork from './taverla-drawing.svg?react'

/** Hand-drawn Taverla screen: the host screen with the room QR code and a phone buzzer. */
export const TaverlaDrawing: React.FC = () => {
  const text = useDrawingText('taverla')
  const titleId = useId()

  return (
    <TaverlaDrawingArtwork
      aria-labelledby={titleId}
      className='screen'
      role='img'
    >
      <title id={titleId}>{text.title}</title>
      <text
        fill='var(--ink)'
        fontFamily='var(--font-letter)'
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
        fontFamily='var(--font-prose)'
        fontSize='11'
        x='38'
        y='80'
      >
        {text.scanToJoin}
      </text>
      <text
        fill='var(--ink-soft)'
        fontFamily='var(--font-letter)'
        fontSize='11'
        fontWeight='700'
        letterSpacing='1.5'
        x='224'
        y='62'
      >
        {text.seated}
      </text>
      <g fill='var(--ink)' fontFamily='var(--font-letter)' fontSize='15'>
        <text
          fill='var(--on-violet)'
          fontWeight='700'
          textAnchor='end'
          x='362'
          y='94'
        >
          {text.first}
        </text>
        <text fill='var(--ink-soft)' fontSize='12' x='234' y='228'>
          {text.waiting}
        </text>
      </g>
      <g transform='translate(378 70)'>
        <text
          fill='var(--ink-soft)'
          fontFamily='var(--font-letter)'
          fontSize='11'
          fontWeight='700'
          letterSpacing='1.3'
          x='22'
          y='52'
        >
          {text.roomBuzzer}
        </text>
        <text
          fill='var(--on-violet)'
          fontFamily='var(--font-letter)'
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
          fontFamily='var(--font-prose)'
          fontSize='10.5'
          textAnchor='middle'
          x='80'
          y='262'
        >
          {text.firstTakesRound}
        </text>
      </g>
    </TaverlaDrawingArtwork>
  )
}
