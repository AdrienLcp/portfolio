import type React from 'react'
import { useId } from 'react'

import { useDrawingText } from './drawing-text'
import { MechanismKey } from './mechanism-key'
import ScoreboardMechanismArtwork from './scoreboard-mechanism.svg?react'

/** Scoreboard mechanism: one Durable Object per event keeps the ordered log every screen replays the scores from. */
export const ScoreboardMechanism: React.FC = () => {
  const text = useDrawingText('scoreboard')
  const titleId = useId()

  return (
    <>
      <ScoreboardMechanismArtwork
        aria-labelledby={titleId}
        className='diagram'
        role='img'
      >
        <title id={titleId}>{text.mechanismTitle}</title>
        <text
          className='lbl-strong fade'
          style={{ '--d': 0 }}
          textAnchor='middle'
          x='86'
          y='68'
        >
          {text.umpireConsole}
        </text>
        <text
          className='fade soft'
          style={{ '--d': 0 }}
          textAnchor='middle'
          x='86'
          y='86'
        >
          {text.anyPhone}
        </text>
        <text
          className='fade soft'
          style={{ '--d': 1 }}
          textAnchor='middle'
          x='86'
          y='126'
        >
          {text.queued}
        </text>
        <text
          className='lbl-strong fade'
          style={{ '--d': 0 }}
          textAnchor='middle'
          x='86'
          y='224'
        >
          {text.organiser}
        </text>
        <text
          className='fade soft'
          style={{ '--d': 0 }}
          textAnchor='middle'
          x='86'
          y='242'
        >
          {text.fixesLive}
        </text>
        <text
          className='lbl-strong fade'
          style={{ '--d': 1 }}
          textAnchor='middle'
          x='280'
          y='50'
        >
          {text.durableObject}
        </text>
        <text
          className='fade soft'
          style={{ '--d': 1 }}
          textAnchor='middle'
          x='280'
          y='68'
        >
          {text.perEvent}
        </text>
        <text
          className='fade'
          style={{ '--d': 4 }}
          textAnchor='middle'
          x='280'
          y='193'
        >
          {text.undoEvent}
        </text>
        <text
          className='lbl-strong fade'
          style={{ '--d': 6 }}
          textAnchor='middle'
          x='474'
          y='68'
        >
          {text.bigScreen}
        </text>
        <text
          className='fade soft'
          style={{ '--d': 6 }}
          textAnchor='middle'
          x='474'
          y='86'
        >
          {text.hallTv}
        </text>
        <text
          className='lbl-strong fade'
          style={{ '--d': 6 }}
          textAnchor='middle'
          x='474'
          y='224'
        >
          {text.spectators}
        </text>
        <text
          className='fade soft'
          style={{ '--d': 6 }}
          textAnchor='middle'
          x='474'
          y='242'
        >
          {text.ownPhones}
        </text>
        <text
          className='fade'
          style={{ '--d': 7 }}
          textAnchor='middle'
          x='474'
          y='150'
        >
          {text.socketEach}
        </text>
        <text
          className='fade soft'
          style={{ '--d': 7 }}
          textAnchor='middle'
          x='280'
          y='296'
        >
          {text.replayed}
        </text>
      </ScoreboardMechanismArtwork>
      <MechanismKey
        note={text.replayed}
        parts={[
          { detail: text.queued, name: text.umpireConsole },
          { detail: text.fixesLive, name: text.organiser },
          { detail: text.perEvent, name: text.durableObject },
          { detail: text.hallTv, name: text.bigScreen },
          { detail: text.ownPhones, name: text.spectators }
        ]}
      />
    </>
  )
}
