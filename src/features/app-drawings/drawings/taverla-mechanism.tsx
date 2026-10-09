import type React from 'react'
import { useId } from 'react'

import { useDrawingText } from './drawing-text'
import { MechanismKey } from './mechanism-key'
import TaverlaMechanismArtwork from './taverla-mechanism.svg?react'

/** Taverla mechanism: one server holds a socket to every screen and stamps each buzz. */
export const TaverlaMechanism: React.FC = () => {
  const text = useDrawingText('taverla')
  const titleId = useId()

  return (
    <>
      <TaverlaMechanismArtwork
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
      </TaverlaMechanismArtwork>
      <MechanismKey
        note={[text.orderLine1, text.orderLine2, text.orderLine3].join(' ')}
        parts={[
          { detail: text.hostDetail, name: text.host },
          { detail: text.serverDetail, name: text.server },
          { detail: text.firstBuzz, name: text.socketToPhones }
        ]}
      />
    </>
  )
}
