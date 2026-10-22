import type React from 'react'
import { useId } from 'react'

import { useDrawingText } from './drawing-text'
import MeleeDrawingArtwork from './melee-drawing.svg?react'

/** Hand-drawn Mêlée screen: the host screen with the room QR code and a phone buzzer. */
export const MeleeDrawing: React.FC = () => {
  const text = useDrawingText('melee')
  const titleId = useId()

  return (
    <MeleeDrawingArtwork
      aria-labelledby={titleId}
      className='screen'
      role='img'
    >
      <title id={titleId}>{text.title}</title>
      <text
        className='drawing-letter'
        fill='var(--ink)'
        fontSize='20'
        fontWeight='800'
        letterSpacing='1'
        x='38'
        y='62'
      >
        {text.buzzer}
      </text>
      <text
        className='drawing-prose'
        fill='var(--ink-soft)'
        fontSize='11'
        x='38'
        y='80'
      >
        {text.scanToJoin}
      </text>
      <text
        className='drawing-letter'
        fill='var(--ink-soft)'
        fontSize='11'
        fontWeight='700'
        letterSpacing='1.5'
        x='224'
        y='62'
      >
        {text.seated}
      </text>
      <g className='drawing-letter' fill='var(--ink)' fontSize='15'>
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
          className='drawing-letter'
          fill='var(--ink-soft)'
          fontSize='11'
          fontWeight='700'
          letterSpacing='1.3'
          x='22'
          y='52'
        >
          {text.roomBuzzer}
        </text>
        <text
          className='drawing-letter'
          fill='var(--on-violet)'
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
          className='drawing-prose'
          fill='var(--ink-soft)'
          fontSize='10.5'
          textAnchor='middle'
          x='80'
          y='262'
        >
          {text.firstTakesRound}
        </text>
      </g>
    </MeleeDrawingArtwork>
  )
}
