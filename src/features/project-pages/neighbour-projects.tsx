import type React from 'react'

import { Icon } from '@/presentation/components/icon'
import { SiteLink } from '@/presentation/components/site-link/site-link'
import { useTranslate } from '@/presentation/i18n/i18n-provider'

/** Another project, by name and page. */
export type Neighbour = {
  href: string
  name: string
}

type NeighbourProjectsProps = {
  next: Neighbour | null
  previous: Neighbour | null
}

/** The projects listed just before and after this one, their names set large. */
export const NeighbourProjects: React.FC<NeighbourProjectsProps> = ({
  next,
  previous
}) => {
  const translate = useTranslate()

  if (previous === null && next === null) {
    return null
  }

  return (
    <nav aria-label={translate('project.neighbours')} className='neighbours'>
      {previous !== null && (
        <SiteLink className='neighbour previous' href={previous.href}>
          <span className='neighbour-direction'>
            <Icon className='neighbour-icon' name='back' />
            {translate('project.previous')}
          </span>
          <span className='neighbour-name'>{previous.name}</span>
        </SiteLink>
      )}
      {next !== null && (
        <SiteLink className='neighbour next' href={next.href}>
          <span className='neighbour-direction'>
            {translate('project.next')}
            <Icon className='neighbour-icon' name='forward' />
          </span>
          <span className='neighbour-name'>{next.name}</span>
        </SiteLink>
      )}
    </nav>
  )
}
