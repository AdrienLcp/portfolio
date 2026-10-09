import type React from 'react'
import { useId } from 'react'

import { useDrawingText } from './drawing-text'
import SeanceDrawingArtwork from './seance-drawing.svg?react'

/** Hand-drawn Séance screen: a phone showing one movement plate, offline and saved on the device. */
export const SeanceDrawing: React.FC = () => {
  const text = useDrawingText('seance')
  const titleId = useId()

  return (
    <SeanceDrawingArtwork
      aria-labelledby={titleId}
      className='screen'
      role='img'
    >
      <title id={titleId}>{text.title}</title>
      <g transform='translate(200 20)'>
        <g fill='var(--ink)' fontFamily='var(--font-letter)'>
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
      <g fill='var(--ink)' fontFamily='var(--font-letter)' fontSize='13'>
        <text fontWeight='700' letterSpacing='1' x='440' y='92'>
          {text.offline}
        </text>
        <text fill='var(--ink-soft)' x='440' y='108'>
          {text.everyRoute}
        </text>
        <text fontWeight='700' letterSpacing='1' x='440' y='250'>
          {text.onDevice}
        </text>
        <text fill='var(--ink-soft)' x='440' y='266'>
          {text.nowhereElse}
        </text>
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
    </SeanceDrawingArtwork>
  )
}
