import type React from 'react'
import { useId } from 'react'

import { useDrawingText } from './drawing-text'
import { MechanismKey } from './mechanism-key'
import MeleeMechanismArtwork from './melee-mechanism.svg?react'

/** Mêlée mechanism: one server holds a socket to every screen and banks a team's first answer for all of it. */
export const MeleeMechanism: React.FC = () => {
  const text = useDrawingText('melee')
  const titleId = useId()

  return (
    <>
      <MeleeMechanismArtwork
        aria-labelledby={titleId}
        className='diagram'
        role='img'
      >
        <title id={titleId}>{text.mechanismTitle}</title>
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
          y='52'
        >
          {text.wall}
        </text>
        <text
          className='fade soft'
          style={{ '--d': 2 }}
          textAnchor='middle'
          x='90'
          y='72'
        >
          {text.wallDetail}
        </text>
        <text className='fade soft' style={{ '--d': 8 }} x='502' y='48'>
          {text.owls}
        </text>
        <text className='fade soft' style={{ '--d': 8 }} x='502' y='144'>
          {text.wolves}
        </text>
        <text className='fade soft' style={{ '--d': 8 }} x='502' y='240'>
          {text.bears}
        </text>
        <text
          className='fade soft'
          style={{ '--d': 5 }}
          textAnchor='middle'
          x='456'
          y='286'
        >
          {text.socketToPhones}
        </text>
        <text className='fade soft' style={{ '--d': 6 }} x='20' y='232'>
          {text.teamLine1}
        </text>
        <text className='fade soft' style={{ '--d': 6 }} x='20' y='250'>
          {text.teamLine2}
        </text>
        <text className='fade soft' style={{ '--d': 6 }} x='20' y='268'>
          {text.teamLine3}
        </text>
      </MeleeMechanismArtwork>
      <MechanismKey
        note={[text.teamLine1, text.teamLine2, text.teamLine3].join(' ')}
        parts={[
          { detail: text.wallDetail, name: text.wall },
          { detail: text.serverDetail, name: text.server },
          { detail: text.socketToPhones, name: text.teamPhones }
        ]}
      />
    </>
  )
}
