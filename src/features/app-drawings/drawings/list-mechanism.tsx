import type React from 'react'
import { useId } from 'react'

import { useDrawingText } from './drawing-text'
import ListMechanismArtwork from './list-mechanism.svg?react'
import { MechanismKey } from './mechanism-key'

/** List mechanism: one Durable Object per list sends the whole list on each change, as each viewer may see it. */
export const ListMechanism: React.FC = () => {
  const text = useDrawingText('list')
  const titleId = useId()

  return (
    <>
      <ListMechanismArtwork
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
          {text.withTheLink}
        </text>
        <text
          className='fade soft'
          style={{ '--d': 0 }}
          textAnchor='middle'
          x='86'
          y='86'
        >
          {text.addsTicks}
        </text>
        <text
          className='lbl-strong fade'
          style={{ '--d': 0 }}
          textAnchor='middle'
          x='86'
          y='224'
        >
          {text.guest}
        </text>
        <text
          className='fade soft'
          style={{ '--d': 0 }}
          textAnchor='middle'
          x='86'
          y='242'
        >
          {text.reservesWish}
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
          {text.perList}
        </text>
        <text
          className='fade soft'
          style={{ '--d': 4.5 }}
          textAnchor='middle'
          x='280'
          y='252'
        >
          {text.hibernate}
        </text>
        <text
          className='lbl-strong fade'
          style={{ '--d': 6 }}
          textAnchor='middle'
          x='474'
          y='46'
        >
          {text.everyGuest}
        </text>
        <text
          className='fade soft'
          style={{ '--d': 6 }}
          textAnchor='middle'
          x='474'
          y='62'
        >
          {text.seesReserved}
        </text>
        <text
          className='lbl-strong fade'
          style={{ '--d': 6 }}
          textAnchor='middle'
          x='474'
          y='186'
        >
          {text.owner}
        </text>
        <text
          className='fade soft'
          style={{ '--d': 6 }}
          textAnchor='middle'
          x='474'
          y='202'
        >
          {text.neverSees}
        </text>
        <text
          className='fade'
          style={{ '--d': 7 }}
          textAnchor='middle'
          x='474'
          y='154'
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
          {text.wholeList}
        </text>
      </ListMechanismArtwork>
      <MechanismKey
        note={text.wholeList}
        parts={[
          { detail: text.addsTicks, name: text.withTheLink },
          { detail: text.reservesWish, name: text.guest },
          { detail: text.perList, name: text.durableObject },
          { detail: text.seesReserved, name: text.everyGuest },
          { detail: text.neverSees, name: text.owner }
        ]}
      />
    </>
  )
}
