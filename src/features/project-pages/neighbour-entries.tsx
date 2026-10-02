import type React from 'react'

import { RegisterLink } from '@/presentation/components/register/register-link'
import { useTranslate } from '@/presentation/i18n/i18n-provider'

/** Another entry of the register, by name and page. */
export type Neighbour = {
  href: string
  name: string
}

type NeighbourEntriesProps = {
  above: Neighbour | null
  below: Neighbour | null
}

/** The entries printed just above and below this one on the register. */
export const NeighbourEntries: React.FC<NeighbourEntriesProps> = ({
  above,
  below
}) => {
  const translate = useTranslate()

  if (above === null && below === null) {
    return null
  }

  return (
    <nav aria-label={translate('project.neighbours')} className='neighbours'>
      {above === null ? (
        <span />
      ) : (
        <RegisterLink className='neighbour' href={above.href}>
          <small>{translate('project.above')}</small>
          <strong>{above.name}</strong>
        </RegisterLink>
      )}
      {below !== null && (
        <RegisterLink className='neighbour below' href={below.href}>
          <small>{translate('project.below')}</small>
          <strong>{below.name}</strong>
        </RegisterLink>
      )}
    </nav>
  )
}
