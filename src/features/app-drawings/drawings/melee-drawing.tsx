import type React from 'react'
import { useId } from 'react'

import { useDrawingText } from './drawing-text'
import MeleeDrawingArtwork from './melee-drawing.svg?react'

/** Hand-drawn Mêlée evening: the wall's track and standings, and a team's phone on its turn. */
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
        x='70'
        y='100'
      >
        {text.evening}
      </text>
      <text
        className='drawing-prose'
        fill='var(--ink-soft)'
        fontSize='11'
        x='70'
        y='118'
      >
        {text.roundLine}
      </text>
      <g className='drawing-letter' fill='var(--ink)' fontSize='15'>
        <text fill='var(--on-violet)' fontWeight='700' x='98' y='152'>
          {text.owls}
        </text>
        <text x='98' y='184'>
          {text.wolves}
        </text>
        <text x='98' y='216'>
          {text.bears}
        </text>
      </g>
      <g transform='translate(392 70)'>
        <text
          className='drawing-letter'
          fill='var(--ink)'
          fontSize='20'
          fontWeight='800'
          x='46'
          y='73'
        >
          {text.owls}
        </text>
        <text
          className='drawing-letter'
          fill='var(--on-violet)'
          fontSize='18'
          fontWeight='900'
          letterSpacing='1.5'
          textAnchor='middle'
          x='80'
          y='205'
        >
          {text.yourTurn}
        </text>
        <text
          className='drawing-prose'
          fill='var(--ink-soft)'
          fontSize='10.5'
          textAnchor='middle'
          x='80'
          y='262'
        >
          {text.oneAnswer}
        </text>
      </g>
    </MeleeDrawingArtwork>
  )
}
