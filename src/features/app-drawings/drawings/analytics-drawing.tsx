import type React from 'react'
import { useId } from 'react'

import AnalyticsDrawingArtwork from './analytics-drawing.svg?react'
import { useDrawingText } from './drawing-text'

/** Hand-drawn Analytics screen: the public dashboard beside a slip listing what is never stored. */
export const AnalyticsDrawing: React.FC = () => {
  const text = useDrawingText('analytics')
  const titleId = useId()

  return (
    <AnalyticsDrawingArtwork
      aria-labelledby={titleId}
      className='screen'
      role='img'
    >
      <title id={titleId}>{text.title}</title>
      <text
        fill='var(--ink)'
        fontFamily='var(--font-letter)'
        fontSize='20'
        fontWeight='800'
        letterSpacing='1'
        x='38'
        y='62'
      >
        {text.pageViews}
      </text>
      <text
        fill='var(--ink-soft)'
        fontFamily='var(--font-prose)'
        fontSize='11'
        x='38'
        y='80'
      >
        {text.publicDashboard}
      </text>
      <g fill='var(--ink)' fontFamily='var(--font-letter)'>
        <g
          fill='var(--ink-soft)'
          fontSize='10'
          fontWeight='700'
          letterSpacing='1.1'
        >
          <text x='38' y='196'>
            {text.pathColumn}
          </text>
          <text x='122' y='196'>
            {text.referrerColumn}
          </text>
          <text x='200' y='196'>
            {text.countryColumn}
          </text>
          <text x='262' y='196'>
            {text.themeColumn}
          </text>
          <text x='318' y='196'>
            {text.deviceColumn}
          </text>
        </g>
      </g>
      <g fill='var(--ink)' fontFamily='var(--font-letter)'>
        <g fontSize='13'>
          <text x='262' y='222'>
            {text.dark}
          </text>
          <text x='318' y='222'>
            {text.mobile}
          </text>
          <text x='262' y='246'>
            {text.light}
          </text>
          <text x='318' y='246'>
            {text.desktop}
          </text>
        </g>
      </g>
      <g fill='var(--ink)' fontFamily='var(--font-letter)'>
        <text fontSize='12' fontWeight='800' letterSpacing='1.4' x='436' y='88'>
          {text.neverStoredSlip}
        </text>
      </g>
      <g fill='var(--ink)' fontFamily='var(--font-letter)'>
        <g fontSize='14'>
          <text className='struck' x='436' y='128'>
            <tspan>{text.cookie}</tspan>
          </text>
          <text className='struck' x='436' y='156'>
            <tspan>{text.ip}</tspan>
          </text>
          <text className='struck' x='436' y='184'>
            <tspan>{text.userAgent}</tspan>
          </text>
          <text className='struck' x='436' y='212'>
            <tspan>{text.fingerprint}</tspan>
          </text>
          <text className='struck' x='436' y='240'>
            <tspan>{text.hash}</tspan>
          </text>
        </g>
      </g>
      <g fill='var(--ink)' fontFamily='var(--font-letter)' fontSize='13'>
        <text fill='var(--ink-soft)' x='420' y='312'>
          {text.trackerSize}
        </text>
        <text fontWeight='700' letterSpacing='1' x='6' y='336'>
          {text.fedBy}
        </text>
        <text fill='var(--ink-soft)' x='6' y='352'>
          {text.noConsent}
        </text>
      </g>
    </AnalyticsDrawingArtwork>
  )
}
