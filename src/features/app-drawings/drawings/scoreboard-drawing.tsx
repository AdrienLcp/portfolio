import type React from 'react'
import { useId } from 'react'

import { useDrawingText } from './drawing-text'
import ScoreboardDrawingArtwork from './scoreboard-drawing.svg?react'

/** Hand-drawn Scoreboard screens: the hall's big screen with two live tables, and the umpire's phone scoring one of them. */
export const ScoreboardDrawing: React.FC = () => {
  const text = useDrawingText('scoreboard')
  const titleId = useId()

  return (
    <ScoreboardDrawingArtwork
      aria-labelledby={titleId}
      className='screen'
      role='img'
    >
      <title id={titleId}>{text.title}</title>
      <g fill='var(--ink)' fontFamily='var(--font-letter)'>
        <g transform='translate(16 28)'>
          <text
            fontSize='10.5'
            fontWeight='700'
            letterSpacing='1.3'
            x='34'
            y='29'
          >
            {text.live}
          </text>
        </g>
      </g>
      <g fill='var(--ink)' fontFamily='var(--font-letter)'>
        <g transform='translate(16 28)'>
          <g transform='translate(22 42)'>
            <text
              fill='var(--ink-soft)'
              fontSize='10.5'
              fontWeight='700'
              letterSpacing='1.3'
              x='10'
              y='18'
            >{`${text.table} 1`}</text>
          </g>
        </g>
      </g>
      <g fill='var(--ink)' fontFamily='var(--font-letter)'>
        <g transform='translate(16 28)'>
          <g transform='translate(184 42)'>
            <text
              fill='var(--ink-soft)'
              fontSize='10.5'
              fontWeight='700'
              letterSpacing='1.3'
              x='10'
              y='18'
            >{`${text.table} 3`}</text>
          </g>
        </g>
      </g>
      <g fill='var(--ink)' fontFamily='var(--font-letter)'>
        <g transform='translate(16 28)'>
          <g fontSize='11'>
            <text
              fontWeight='700'
              letterSpacing='1'
              x='22'
              y='192'
            >{`${text.table} 2`}</text>
            <text
              fill='var(--ink-soft)'
              x='22'
              y='206'
            >{`3–1 · ${text.finished}`}</text>
            <text
              fontWeight='700'
              letterSpacing='1'
              x='126'
              y='192'
            >{`${text.table} 4`}</text>
            <text
              fill='var(--ink-soft)'
              x='126'
              y='206'
            >{`3–0 · ${text.finished}`}</text>
            <text
              fontWeight='700'
              letterSpacing='1'
              x='230'
              y='192'
            >{`${text.table} 5`}</text>
            <text
              fill='var(--ink-soft)'
              x='230'
              y='206'
            >{`${text.next} · 14:30`}</text>
          </g>
        </g>
      </g>
      <g fill='var(--ink)' fontFamily='var(--font-letter)'>
        <g transform='translate(394 88)'>
          <g fontSize='10.5' fontWeight='700' letterSpacing='1.3'>
            <text
              fill='var(--ink-soft)'
              x='18'
              y='44'
            >{`${text.table} 3`}</text>
            <text fill='var(--ink-soft)' textAnchor='end' x='122' y='44'>
              {text.umpire}
            </text>
          </g>
        </g>
      </g>
      <g fill='var(--ink)' fontFamily='var(--font-letter)'>
        <g transform='translate(394 88)'>
          <text
            fontSize='11'
            fontWeight='700'
            letterSpacing='1.3'
            textAnchor='middle'
            x='70'
            y='242'
          >
            {text.undo}
          </text>
        </g>
      </g>
      <g fill='var(--ink)' fontFamily='var(--font-letter)'>
        <g fontSize='13'>
          <text fontWeight='700' letterSpacing='1' x='394' y='56'>
            {text.samePoint}
          </text>
          <text fill='var(--ink-soft)' x='394' y='72'>
            {text.everyScreen}
          </text>
          <text fontWeight='700' letterSpacing='1' x='60' y='300'>
            {text.everyTable}
          </text>
          <text fill='var(--ink-soft)' x='60' y='316'>
            {text.liveTakesSpace}
          </text>
          <text
            fontWeight='700'
            letterSpacing='1'
            textAnchor='end'
            x='344'
            y='334'
          >
            {text.oneTap}
          </text>
          <text fill='var(--ink-soft)' textAnchor='end' x='344' y='350'>
            {text.oneToUndo}
          </text>
        </g>
      </g>
    </ScoreboardDrawingArtwork>
  )
}
