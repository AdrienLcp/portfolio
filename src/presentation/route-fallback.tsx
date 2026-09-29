import type React from 'react'

import './route-fallback.sass'

/**
 * Paints the lid's field while the first page's chunk downloads, so a cold
 * load goes from petrol to petrol instead of through an empty paper frame.
 */
export const RouteFallback: React.FC = () => (
  <div aria-busy='true' className='route-fallback' />
)
