import type React from 'react'

import { logoFor } from '@/features/about/domain/tech-logos'

type TechLogoProps = {
  term: string
}

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
