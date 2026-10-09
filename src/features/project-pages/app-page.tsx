import type React from 'react'
import { useId, useRef } from 'react'

import type { Plates } from '@/features/app-drawings/plates'
import { useDrawnWhenSeen } from '@/features/app-drawings/use-drawn-when-seen'
import type { HousePackage } from '@/features/packages/house-package'
import type { ReleasedApp } from '@/features/project-pages/this-site'
import { SiteLink } from '@/presentation/components/site-link/site-link'
import { useI18n, useTranslate } from '@/presentation/i18n/i18n-provider'

import { DetailFigures } from './detail-figures'
import { DetailHead } from './detail-head'
import { DetailSection, DotList } from './detail-section'
import { InstalledPackages, type PackageRowHref } from './installed-packages'
import { type Neighbour, NeighbourProjects } from './neighbour-projects'
import { coverageFigure } from './shared-figures'
import { SpecimenList } from './specimen-list'

import '@/features/app-drawings/drawings/drawings.sass'

type MechanismProps = {
  Mechanism: React.FC
  title: string
}

/** The diagram draws itself the first time it scrolls into view. */
const MechanismSection: React.FC<MechanismProps> = ({ Mechanism, title }) => {
  const translate = useTranslate()
  const figureRef = useRef<HTMLDivElement>(null)
  const isDrawn = useDrawnWhenSeen(figureRef, true)

  return (
    <DetailSection lead={title} title={translate('project.mechanism')}>
      <div
        className={isDrawn ? 'mechanism-figure drawn' : 'mechanism-figure'}
        ref={figureRef}
      >
        <Mechanism />
      </div>
    </DetailSection>
  )
}

type AppPageProps = {
  housePackages: readonly HousePackage[]
  next: Neighbour | null
  packageRowHref: PackageRowHref | null
  plates: Plates | undefined
  previous: Neighbour | null
  project: ReleasedApp
}

/** An app on its own page: what it does, how it works, and how it was built. */
export const AppPage: React.FC<AppPageProps> = ({
  housePackages,
  next,
  packageRowHref,
  plates,
  previous,
  project
}) => {
  const { translate } = useI18n()
  const titleId = useId()
  const { release } = project

  return (
    <article aria-labelledby={titleId} className='project-detail'>
      <DetailHead
        actions={
          <>
            {project.links.live !== undefined && (
              <SiteLink href={project.links.live} target='_blank' variant='ink'>
                {translate(
                  project.kind === 'game' ? 'project.play' : 'project.live'
                )}
              </SiteLink>
            )}
            <SiteLink
              href={project.links.repository}
              icon='github'
              target='_blank'
              variant='line'
            >
              {translate('project.source')}
            </SiteLink>
          </>
        }
        icon={project.icon}
        kind={release.category}
        name={project.name}
        stack={project.stack}
        summary={project.summary}
        tagline={project.tagline}
        titleId={titleId}
      >
        {plates !== undefined && (
          <figure className='detail-scene'>
            <plates.Drawing />
          </figure>
        )}
      </DetailHead>
      <DetailFigures
        figures={[
          coverageFigure(project.coverage, translate),
          {
            label: translate('project.housePackages'),
            note: translate('project.housePackagesNote'),
            value: translate('project.housePackagesCount', {
              count: String(release.installs.length),
              total: String(housePackages.length)
            })
          }
        ]}
      />
      <DetailSection title={translate('project.highlights')}>
        <DotList lines={project.highlights} />
      </DetailSection>
      {plates !== undefined && (
        <MechanismSection
          Mechanism={plates.Mechanism}
          title={plates.mechanismTitle(translate)}
        />
      )}
      {project.samples !== undefined && (
        <DetailSection
          lead={translate('project.excerptsLead')}
          title={translate('project.excerpts')}
        >
          <SpecimenList samples={project.samples} />
        </DetailSection>
      )}
      <InstalledPackages
        housePackages={housePackages}
        installs={release.installs}
        packageRowHref={packageRowHref}
      />
      <NeighbourProjects next={next} previous={previous} />
    </article>
  )
}
