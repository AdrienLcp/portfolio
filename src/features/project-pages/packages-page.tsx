import type React from 'react'
import { useId } from 'react'

import {
  type HousePackage,
  scopedNameOf
} from '@/features/packages/house-package'
import {
  type ReleasedApp,
  SITE_INSTALLS
} from '@/features/project-pages/this-site'
import type { Project } from '@/features/projects/project'
import { SiteLink } from '@/presentation/components/site-link/site-link'
import { useI18n } from '@/presentation/i18n/i18n-provider'

import { CodeSpecimen } from './code-specimen'
import { DetailFigures } from './detail-figures'
import { DetailHead } from './detail-head'
import { DetailSection, DotList } from './detail-section'
import { type Neighbour, NeighbourProjects } from './neighbour-projects'
import { PackageTable, type PackageUser, packageRowIdOf } from './package-table'
import { coverageFigure, dayOf } from './shared-figures'
import { SpecimenList } from './specimen-list'

const PACKAGE_TABLE_ID = 'every-package'

const packageRowHref = (name: HousePackage['name']): string =>
  `#${packageRowIdOf(name)}`

/** ISO dates sort as text, so the latest needs no parsing. */
const latestOf = (isoDates: readonly string[]): string | undefined =>
  [...isoDates].sort().at(-1)

type PackagesPageProps = {
  apps: readonly ReleasedApp[]
  housePackages: readonly HousePackage[]
  previous: Neighbour | null
  project: Project
}

/**
 * The house packages on their own page: an excerpt the compiler refuses in the
 * head, the others below it, then every package with the projects that install it.
 */
export const PackagesPage: React.FC<PackagesPageProps> = ({
  apps,
  housePackages,
  previous,
  project
}) => {
  const { locale, translate } = useI18n()
  const titleId = useId()
  const [heroSample, ...otherSamples] = project.samples ?? []
  const latest = latestOf(housePackages.map(({ released }) => released))
  const users: PackageUser[] = [
    ...apps.map(({ name, release }) => ({
      installs: release.installs,
      name
    })),
    { installs: SITE_INSTALLS, name: translate('project.packages.thisSite') }
  ]
  const hrefOfSample = ({ title }: { title: string }): string | undefined => {
    const housePackage = housePackages.find(
      ({ name }) => scopedNameOf(name) === title
    )

    return housePackage === undefined
      ? undefined
      : packageRowHref(housePackage.name)
  }

  return (
    <article aria-labelledby={titleId} className='project-detail'>
      <DetailHead
        actions={
          <>
            {project.links.documentation !== undefined && (
              <SiteLink
                href={project.links.documentation[locale]}
                target='_blank'
                variant='ink'
              >
                {translate('project.documentation')}
              </SiteLink>
            )}
            <SiteLink
              href={project.links.repository}
              icon='github'
              target='_blank'
              variant={
                project.links.documentation === undefined ? 'ink' : 'line'
              }
            >
              {translate('project.source')}
            </SiteLink>
            <SiteLink href={`#${PACKAGE_TABLE_ID}`} variant='caps'>
              {translate('project.packages.toTable', {
                count: String(housePackages.length)
              })}
            </SiteLink>
          </>
        }
        icon={project.icon}
        kind={translate('project.packages.kind')}
        name={project.name}
        stack={project.stack}
        summary={project.summary}
        tagline={project.tagline}
        titleId={titleId}
      >
        {heroSample !== undefined && (
          <div className='hero-specimen'>
            <CodeSpecimen
              excerpt={heroSample.excerpt}
              href={hrefOfSample(heroSample)}
              title={heroSample.title}
            />
            <div className='specimen-notes'>
              {heroSample.notes.map((note) => (
                <p key={note}>{note}</p>
              ))}
            </div>
          </div>
        )}
      </DetailHead>
      <DetailFigures
        figures={[
          {
            label: translate('project.packages.count'),
            note: translate('project.packages.countNote'),
            value: String(housePackages.length)
          },
          {
            label: translate('project.packages.installedBy'),
            note: users.map(({ name }) => name).join(', '),
            value: translate('project.packages.installedByCount', {
              count: String(users.length)
            })
          },
          coverageFigure(project.coverage, translate),
          ...(latest === undefined
            ? []
            : [
                {
                  label: translate('project.packages.latest'),
                  note: translate('project.packages.latestNote'),
                  value: dayOf(latest, locale)
                }
              ])
        ]}
      />
      <DetailSection title={translate('project.highlights')}>
        <DotList lines={project.highlights} />
      </DetailSection>
      {otherSamples.length > 0 && (
        <DetailSection
          lead={translate('project.excerptsLead')}
          title={translate('project.excerpts')}
        >
          <SpecimenList hrefFor={hrefOfSample} samples={otherSamples} />
        </DetailSection>
      )}
      <DetailSection
        id={PACKAGE_TABLE_ID}
        lead={translate('project.packages.tableLead')}
        title={translate('project.packages.table', {
          count: String(housePackages.length)
        })}
      >
        <PackageTable housePackages={housePackages} users={users} />
      </DetailSection>
      <NeighbourProjects next={null} previous={previous} />
    </article>
  )
}
