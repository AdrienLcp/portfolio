import type React from 'react'
import { useId } from 'react'

import { useDrawingText } from './drawing-text'
import { MechanismKey } from './mechanism-key'
import SeanceMechanismArtwork from './seance-mechanism.svg?react'

/** Séance mechanism: everything is cached on the device, the network is cut and there is no server. */
export const SeanceMechanism: React.FC = () => {
  const text = useDrawingText('seance')
  const titleId = useId()

  return (
    <>
      <SeanceMechanismArtwork
        aria-labelledby={titleId}
        className='diagram'
        role='img'
      >
        <title id={titleId}>{text.mechanismTitle}</title>
        <text className='lbl-strong fade' style={{ '--d': 0 }} x='36' y='40'>
          {text.device}
        </text>
        <text
          className='lbl-strong fade'
          style={{ '--d': 1 }}
          textAnchor='middle'
          x='112'
          y='82'
        >
          {text.appShell}
        </text>
        <text
          className='fade soft'
          style={{ '--d': 1 }}
          textAnchor='middle'
          x='112'
          y='100'
        >
          {text.precached}
        </text>
        <text
          className='lbl-strong fade'
          style={{ '--d': 2 }}
          textAnchor='middle'
          x='280'
          y='82'
        >
          {text.serviceWorker}
        </text>
        <text
          className='fade soft'
          style={{ '--d': 2 }}
          textAnchor='middle'
          x='280'
          y='100'
        >
          {text.workerDetail}
        </text>
        <text
          className='fade soft'
          style={{ '--d': 3 }}
          textAnchor='middle'
          x='196'
          y='224'
        >
          {text.everyNumber}
        </text>
        <text
          className='fade'
          style={{ '--d': 6 }}
          textAnchor='middle'
          x='516'
          y='155'
        >
          {text.noServer}
        </text>
        <text className='fade soft' style={{ '--d': 6 }} x='428' y='192'>
          {text.networkCut}
        </text>
        <text className='fade' style={{ '--d': 7 }} x='428' y='266'>
          {text.backup}
        </text>
        <text className='fade soft' style={{ '--d': 7 }} x='428' y='284'>
          {text.onlyWayOut}
        </text>
      </SeanceMechanismArtwork>
      <MechanismKey
        parts={[
          { name: text.device },
          { detail: text.precached, name: text.appShell },
          { detail: text.workerDetail, name: text.serviceWorker },
          { detail: text.everyNumber, name: 'IndexedDB' },
          { detail: text.networkCut, name: text.noServer },
          { detail: text.onlyWayOut, name: text.backup }
        ]}
      />
    </>
  )
}
