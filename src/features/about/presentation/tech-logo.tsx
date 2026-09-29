import type React from 'react'

import { logoFor } from '@/features/about/domain/tech-logos'

type TechLogoProps = {
  term: string
}

/** Stamped in the ink of the stamp around it, never in the brand's colour. */
export const TechLogo: React.FC<TechLogoProps> = ({ term }) => {
  const logo = logoFor(term)

  return logo === null ? null : (
    <svg
      aria-hidden='true'
      className='tech-logo'
      focusable='false'
      viewBox='0 0 24 24'
    >
      <path d={logo.path} />
    </svg>
  )
}
