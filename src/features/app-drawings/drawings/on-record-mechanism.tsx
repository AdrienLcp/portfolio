import type React from 'react'
import { useId } from 'react'

import { useDrawingText } from './drawing-text'
import { MechanismKey } from './mechanism-key'
import OnRecordMechanismArtwork from './on-record-mechanism.svg?react'

/** on-record mechanism: a nightly job asks the open data what changed, then rebuilds and deploys only that. */
export const OnRecordMechanism: React.FC = () => {
  const text = useDrawingText('onRecord')
  const titleId = useId()

  return (
    <>
      <OnRecordMechanismArtwork
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
          y='146'
        >
          {text.nightly}
        </text>
        <text
          className='lbl-strong fade'
          style={{ '--d': 1 }}
          textAnchor='middle'
          x='280'
          y='146'
        >
          {text.openData}
        </text>
        <text
          className='fade soft'
          style={{ '--d': 1 }}
          textAnchor='middle'
          x='280'
          y='166'
        >
          {text.anythingChanged}
        </text>
        <text
          className='fade soft'
          style={{ '--d': 2 }}
          textAnchor='end'
          x='398'
          y='40'
        >
          {text.newVote}
        </text>
        <text
          className='lbl-strong fade'
          style={{ '--d': 3 }}
          textAnchor='middle'
          x='474'
          y='52'
        >
          {text.rebuild}
        </text>
        <text
          className='fade soft'
          style={{ '--d': 3 }}
          textAnchor='middle'
          x='474'
          y='72'
        >
          {text.onlyWhatChanged}
        </text>
        <text
          className='lbl-strong fade'
          style={{ '--d': 4 }}
          textAnchor='middle'
          x='474'
          y='148'
        >
          {text.deploy}
        </text>
        <text className='fade soft' style={{ '--d': 3 }} x='356' y='216'>
          {text.noNewVote}
        </text>
        <text
          className='lbl-strong fade'
          style={{ '--d': 5 }}
          textAnchor='middle'
          x='474'
          y='248'
        >
          {text.quietNight}
        </text>
        <text
          className='fade soft'
          style={{ '--d': 5 }}
          textAnchor='middle'
          x='474'
          y='268'
        >
          {text.nothingDeployed}
        </text>
        <text className='fade soft' style={{ '--d': 6 }} x='16' y='232'>
          {text.budgetLine1}
        </text>
        <text className='fade soft' style={{ '--d': 6 }} x='16' y='250'>
          {text.budgetLine2}
        </text>
        <text className='fade soft' style={{ '--d': 6 }} x='16' y='268'>
          {text.budgetLine3}
        </text>
      </OnRecordMechanismArtwork>
      <MechanismKey
        note={[text.budgetLine1, text.budgetLine2, text.budgetLine3].join(' ')}
        parts={[
          { detail: 'GitHub Actions', name: text.nightly },
          { detail: text.anythingChanged, name: text.openData },
          {
            detail: `${text.newVote} · ${text.onlyWhatChanged}`,
            name: text.rebuild
          },
          { detail: 'Cloudflare Pages', name: text.deploy },
          {
            detail: `${text.noNewVote} · ${text.nothingDeployed}`,
            name: text.quietNight
          }
        ]}
      />
    </>
  )
}
