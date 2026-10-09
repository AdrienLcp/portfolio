import type React from 'react'

import { projectsPathFor } from '@/infrastructure/router/navigation'
import { SiteLink } from '@/presentation/components/site-link/site-link'
import { useI18n } from '@/presentation/i18n/i18n-provider'

type DetailHeadProps = {
  /** The links the project is for: the live app, the source. */
  actions: React.ReactNode
  /** Set under the text: the drawing, or the excerpt that says it best. */
  children?: React.ReactNode
  /** The app's home-screen icon, set beside its name. */
  icon: string
  /** What sort of project it is, under its name. */
  kind: string
  name: string
  stack: readonly string[]
  summary: string
  tagline: string
  titleId: string
}

/** The icons' intrinsic size; the stylesheet scales them with the title. */
const ICON_SIZE = 64

/** The page's head: the way back, the icon and the name set large, and what it is built with. */
export const DetailHead: React.FC<DetailHeadProps> = ({
  actions,
  children,
  icon,
  kind,
  name,
  stack,
  summary,
  tagline,
  titleId
}) => {
  const { locale, translate } = useI18n()

  return (
    <header className='detail-head'>
      <SiteLink
        className='detail-crumb'
        href={projectsPathFor(locale)}
        icon='back'
        variant='caps'
      >
        {translate('project.breadcrumb')}
      </SiteLink>
      <div className='detail-name'>
        <img
          alt=''
          className='detail-icon'
          height={ICON_SIZE}
          src={icon}
          width={ICON_SIZE}
        />
        <h1 className='detail-title' id={titleId}>
          {name}
        </h1>
      </div>
      <p className='detail-kind'>{kind}</p>
      <p className='detail-tagline'>{tagline}</p>
      <p className='detail-summary'>{summary}</p>
      <ul aria-label={translate('project.stack')} className='detail-stack'>
        {stack.map((technology) => (
          <li key={technology}>{technology}</li>
        ))}
      </ul>
      <div className='detail-actions'>{actions}</div>
      {children}
    </header>
  )
}
