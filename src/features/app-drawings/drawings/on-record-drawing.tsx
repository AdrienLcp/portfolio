import type React from 'react'
import { useId } from 'react'

import { useDrawingText } from './drawing-text'
import OnRecordDrawingArtwork from './on-record-drawing.svg?react'

/** Hand-drawn on-record screen: one figure about a deputy, wired to the ballot it counts on the official vote sheets. */
export const OnRecordDrawing: React.FC = () => {
  const text = useDrawingText('onRecord')
  const titleId = useId()

  return (
    <OnRecordDrawingArtwork
      aria-labelledby={titleId}
      className='screen'
      role='img'
    >
      <title id={titleId}>{text.title}</title>
      <g fontFamily='var(--font-letter)'>
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
      </g>
      <g fontFamily='var(--font-letter)'>
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
      <g fill='currentColor' fontFamily='var(--font-letter)' fontSize='13'>
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
    </OnRecordDrawingArtwork>
  )
}
