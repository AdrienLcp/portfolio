import type React from 'react'
import { useId } from 'react'

import { useDrawingText } from './drawing-text'

const BAR_BASELINE = 168
const BAR_LEFT = 38
const BAR_PITCH = 16
const BAR_WIDTH = 10
const PAGE_VIEW_BAR_HEIGHTS = [
  38, 52, 44, 60, 48, 70, 56, 64, 82, 58, 74, 90, 68, 96
] as const

const VITALS = [
  { metric: 'LCP', score: 44, top: 88 },
  { metric: 'INP', score: 36, top: 118 },
  { metric: 'CLS', score: 22, top: 148 }
] as const

const PAGE_VIEW_BARS = PAGE_VIEW_BAR_HEIGHTS.map((height, index) => ({
  height,
  isToday: index === PAGE_VIEW_BAR_HEIGHTS.length - 1,
  x: BAR_LEFT + index * BAR_PITCH
}))

const PageViewBars: React.FC = () => (
  <>
    {PAGE_VIEW_BARS.map(({ height, isToday, x }) => (
      <rect
        fill={isToday ? 'var(--violet)' : 'var(--ink)'}
        height={height}
        key={x}
        width={BAR_WIDTH}
        x={x}
        y={BAR_BASELINE - height}
      />
    ))}
  </>
)

/** Hand-drawn Analytics screen: the public dashboard beside a slip listing what is never stored. */
export const AnalyticsDrawing: React.FC = () => {
  const text = useDrawingText('analytics')
  const titleId = useId()

  return (
    <svg
      aria-labelledby={titleId}
      className='screen'
      role='img'
      viewBox='0 0 560 380'
    >
      <title id={titleId}>{text.title}</title>
      <g>
        <rect fill='var(--ink)' height='248' rx='10' width='396' x='6' y='18' />
        <rect
          fill='var(--screen)'
          height='224'
          rx='3'
          width='372'
          x='18'
          y='30'
        />
        <rect fill='var(--ink)' height='26' width='68' x='170' y='266' />
        <rect fill='var(--ink)' height='8' rx='2' width='156' x='126' y='290' />
        <text
          fill='var(--ink)'
          fontFamily='Sofia Sans Condensed'
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
          fontFamily='Sofia Sans'
          fontSize='11'
          x='38'
          y='80'
        >
          {text.publicDashboard}
        </text>
        <PageViewBars />
        <line stroke='var(--ink)' x1='34' x2='262' y1='168.5' y2='168.5' />
        <g fill='var(--ink)' fontFamily='Sofia Sans Condensed'>
          <text
            fill='var(--ink-soft)'
            fontSize='10.5'
            fontWeight='700'
            letterSpacing='1.3'
            x='280'
            y='62'
          >
            CORE WEB VITALS
          </text>
          {VITALS.map(({ metric, top, score }) => (
            <g key={metric}>
              <text fontSize='13' fontWeight='700' x='280' y={top + 8}>
                {metric}
              </text>
              <rect
                fill='var(--paper-sunk)'
                height='6'
                width='62'
                x='312'
                y={top}
              />
              <rect
                fill='var(--violet)'
                height='6'
                width={score}
                x='312'
                y={top}
              />
            </g>
          ))}
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
          <line stroke='var(--ink)' x1='38' x2='372' y1='203' y2='203' />
          <g fontSize='13'>
            <text x='38' y='222'>
              /en/projects
            </text>
            <text x='122' y='222'>
              github.com
            </text>
            <text x='200' y='222'>
              FR
            </text>
            <text x='262' y='222'>
              {text.dark}
            </text>
            <text x='318' y='222'>
              {text.mobile}
            </text>
            <line stroke='var(--rule)' x1='38' x2='372' y1='230' y2='230' />
            <text x='38' y='246'>
              /fr
            </text>
            <text fill='var(--ink-soft)' x='122' y='246'>
              —
            </text>
            <text x='200' y='246'>
              BE
            </text>
            <text x='262' y='246'>
              {text.light}
            </text>
            <text x='318' y='246'>
              {text.desktop}
            </text>
          </g>
        </g>
      </g>
      <g>
        <rect
          fill='var(--screen)'
          height='208'
          stroke='var(--ink)'
          strokeWidth='1.5'
          width='124'
          x='420'
          y='60'
        />
        <g fill='var(--ink)' fontFamily='Sofia Sans Condensed'>
          <text
            fontSize='12'
            fontWeight='800'
            letterSpacing='1.4'
            x='436'
            y='88'
          >
            {text.neverStoredSlip}
          </text>
          <line
            stroke='var(--ink)'
            strokeWidth='1.5'
            x1='436'
            x2='528'
            y1='98'
            y2='98'
          />
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
      </g>
      <g fill='var(--ink)' fontFamily='Sofia Sans Condensed' fontSize='13'>
        <text fontWeight='700' letterSpacing='1' x='420' y='296'>
          TRACKER.JS
        </text>
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
    </svg>
  )
}

/** Analytics mechanism: three apps report to one Worker, which writes a six-field row to D1. */
export const AnalyticsMechanism: React.FC = () => {
  const text = useDrawingText('analytics')
  const titleId = useId()

  return (
    <svg
      aria-labelledby={titleId}
      className='diagram'
      role='img'
      viewBox='0 0 560 300'
    >
      <title id={titleId}>{text.mechanismTitle}</title>
      <g fill='none' stroke='currentColor' strokeWidth='1.6'>
        <rect
          className='draw'
          height='48'
          pathLength={1}
          style={{ '--d': 0 }}
          width='124'
          x='16'
          y='20'
        />
        <rect
          className='draw'
          height='48'
          pathLength={1}
          style={{ '--d': 1 }}
          width='124'
          x='16'
          y='126'
        />
        <rect
          className='draw'
          height='48'
          pathLength={1}
          style={{ '--d': 2 }}
          width='124'
          x='16'
          y='232'
        />
        <path
          className='draw'
          d='M140 44 C 176 44, 168 130, 196 130'
          pathLength={1}
          style={{ '--d': 2 }}
        />
        <path
          className='draw'
          d='M140 150 H 196'
          pathLength={1}
          style={{ '--d': 3 }}
        />
        <path
          className='draw'
          d='M140 256 C 176 256, 168 170, 196 170'
          pathLength={1}
          style={{ '--d': 4 }}
        />
        <rect
          className='draw'
          height='80'
          pathLength={1}
          style={{ '--d': 3 }}
          width='136'
          x='196'
          y='110'
        />
        <path
          className='draw'
          d='M332 140 C 356 140, 356 92, 380 92'
          pathLength={1}
          style={{ '--d': 5 }}
        />
        <rect
          className='draw'
          height='150'
          pathLength={1}
          style={{ '--d': 5 }}
          width='164'
          x='380'
          y='16'
        />
        <path
          className='draw'
          d='M380 150 C 352 150, 360 258, 332 258'
          pathLength={1}
          style={{ '--d': 6 }}
        />
        <rect
          className='draw'
          height='48'
          pathLength={1}
          style={{ '--d': 6 }}
          width='136'
          x='196'
          y='234'
        />
      </g>
      <g opacity='0.4' stroke='currentColor'>
        <path d='M392 62.5 H 532 M392 80.5 H 532 M392 98.5 H 532 M392 116.5 H 532 M392 134.5 H 532' />
      </g>
      <text
        className='lbl-strong fade'
        style={{ '--d': 0 }}
        textAnchor='middle'
        x='78'
        y='42'
      >
        {text.thisSite}
      </text>
      <text
        className='fade soft'
        style={{ '--d': 0 }}
        textAnchor='middle'
        x='78'
        y='60'
      >
        tracker.js
      </text>
      <text
        className='lbl-strong fade'
        style={{ '--d': 1 }}
        textAnchor='middle'
        x='78'
        y='148'
      >
        Taverla
      </text>
      <text
        className='fade soft'
        style={{ '--d': 1 }}
        textAnchor='middle'
        x='78'
        y='166'
      >
        tracker.js
      </text>
      <text
        className='lbl-strong fade'
        style={{ '--d': 2 }}
        textAnchor='middle'
        x='78'
        y='254'
      >
        on-record
      </text>
      <text
        className='fade soft'
        style={{ '--d': 2 }}
        textAnchor='middle'
        x='78'
        y='272'
      >
        tracker.js
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
      <text
        className='fade soft'
        style={{ '--d': 3 }}
        textAnchor='middle'
        x='264'
        y='166'
      >
        Hono · Cloudflare
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
    </svg>
  )
}
