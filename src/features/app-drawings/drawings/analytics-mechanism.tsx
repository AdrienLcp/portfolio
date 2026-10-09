import type React from 'react'
import { useId } from 'react'

import AnalyticsMechanismArtwork from './analytics-mechanism.svg?react'
import { useDrawingText } from './drawing-text'
import { MechanismKey } from './mechanism-key'

/** Analytics mechanism: four apps report to one Worker, which writes a six-field row to D1. */
export const AnalyticsMechanism: React.FC = () => {
  const text = useDrawingText('analytics')
  const titleId = useId()

  return (
    <>
      <AnalyticsMechanismArtwork
        aria-labelledby={titleId}
        className='diagram'
        role='img'
      >
        <title id={titleId}>{text.mechanismTitle}</title>
        <text
          className='lbl-strong fade'
          style={{ '--d': 0 }}
          textAnchor='middle'
          x='78'
          y='38'
        >
          {text.thisSite}
        </text>
        <text
          className='lbl-strong fade'
          style={{ '--d': 3 }}
          textAnchor='middle'
          x='264'
          y='146'
        >
          {text.oneWorker}
        </text>
        <text className='lbl-strong fade' style={{ '--d': 5 }} x='392' y='40'>
          {text.oneRow}
        </text>
        <text className='fade' style={{ '--d': 5 }} x='392' y='58'>
          {text.pathField}
        </text>
        <text className='fade' style={{ '--d': 5 }} x='392' y='76'>
          {text.referrerField}
        </text>
        <text className='fade' style={{ '--d': 5 }} x='392' y='94'>
          {text.countryField}
        </text>
        <text className='fade' style={{ '--d': 5 }} x='392' y='112'>
          {text.localeField}
        </text>
        <text className='fade' style={{ '--d': 5 }} x='392' y='130'>
          {text.themeField}
        </text>
        <text className='fade' style={{ '--d': 5 }} x='392' y='148'>
          {text.deviceField}
        </text>
        <text
          className='lbl-strong fade'
          style={{ '--d': 6 }}
          textAnchor='middle'
          x='264'
          y='256'
        >
          {text.dashboard}
        </text>
        <text
          className='fade soft'
          style={{ '--d': 6 }}
          textAnchor='middle'
          x='264'
          y='274'
        >
          {text.dashboardDetail}
        </text>
        <text className='lbl-strong fade' style={{ '--d': 7 }} x='392' y='206'>
          {text.neverStored}
        </text>
        <text className='fade soft struck' style={{ '--d': 7 }} x='392' y='232'>
          <tspan>{text.neverStoredLine1}</tspan>
        </text>
        <text className='fade soft struck' style={{ '--d': 7 }} x='392' y='250'>
          <tspan>{text.neverStoredLine2}</tspan>
        </text>
      </AnalyticsMechanismArtwork>
      <MechanismKey
        parts={[
          {
            detail: 'tracker.js',
            name: `${text.thisSite} · Taverla · on-record · Scoreboard`
          },
          { detail: 'Hono · Cloudflare', name: text.oneWorker },
          {
            detail: [
              text.pathField,
              text.referrerField,
              text.countryField,
              text.localeField,
              text.themeField,
              text.deviceField
            ].join(' · '),
            name: text.oneRow
          },
          { detail: text.dashboardDetail, name: text.dashboard },
          {
            detail: `${text.neverStoredLine1} · ${text.neverStoredLine2}`,
            name: text.neverStored
          }
        ]}
      />
    </>
  )
}
