import type React from 'react'
import { useId } from 'react'

import {
  type HousePackage,
  scopedNameOf
} from '@/features/packages/house-package'
import type { Project } from '@/features/projects/project'
import { PackageLedger } from '@/features/register/package-ledger'
import { registerSpanOf } from '@/features/register/register-dates'
import { ReleaseStamp } from '@/features/register/release-stamp'
import {
  ledgerColumnsOf,
  type RegisteredProject
} from '@/features/register/this-site'
import { RegisterLink } from '@/presentation/components/register/register-link'
import { useTranslate } from '@/presentation/i18n/i18n-provider'

import { CodeSpecimen } from './code-specimen'
import { coverageFact } from './coverage-fact'
import { EntryBlock, ShippedLines } from './entry-block'
import { EntryFacts } from './entry-facts'
import { EntryHead } from './entry-head'
import { EntryHistory } from './entry-history'
import { type Neighbour, NeighbourEntries } from './neighbour-entries'
import { SpecimenList } from './specimen-list'

const LEDGER_ID = 'ledger'

const packageRowHref = (name: HousePackage['name']): string =>
  `#package-${name}`

type PackagesEntryPageProps = {
  above: Neighbour | null
  apps: readonly RegisteredProject[]
  housePackages: readonly HousePackage[]
  project: Project
  registerHref: string
}

/**
 * The packages' entry: an excerpt the compiler refuses in the head, the others
 * below it, then every package with the apps that install it.
 */
export const PackagesEntryPage: React.FC<PackagesEntryPageProps> = ({
  above,
  apps,
  housePackages,
  project,
  registerHref
}) => {
  const translate = useTranslate()
  const titleId = useId()
  const { history } = project
  const [heroSample, ...otherSamples] = project.samples ?? []
  const latest = registerSpanOf(
    housePackages.map((housePackage) => housePackage.released)
  )?.last
  const firstCommit = history.lines.at(-1)
  const siteName = translate('home.site.title')
  const columns = ledgerColumnsOf({
    apps,
    siteName,
    siteShortName: translate('home.site.short')
  })
  const hrefOfSample = ({ title }: { title: string }): string | undefined => {
    const housePackage = housePackages.find(
      ({ name }) => scopedNameOf(name) === title
    )

    return housePackage === undefined
      ? undefined
      : packageRowHref(housePackage.name)
  }

  return (
    <article aria-labelledby={titleId} className='entry-page packages-entry'>
      <EntryHead
        actions={
          <>
            <RegisterLink
              href={project.links.repository}
              target='_blank'
              variant='ink'
            >
              {translate('project.source')}
            </RegisterLink>
            <RegisterLink href={`#${LEDGER_ID}`} variant='line'>
              {translate('project.packages.toLedger', {
                count: String(housePackages.length)
              })}
            </RegisterLink>
          </>
        }
        dates={[
          ...(latest === undefined
            ? []
            : [{ label: translate('project.packages.latest'), value: latest }]),
          ...(firstCommit === undefined
            ? []
            : [
                {
                  label: translate('project.firstCommit'),
                  value: firstCommit.date
                }
              ])
        ]}
        kind={translate('project.packages.kind')}
        name={project.name}
        registerHref={registerHref}
        stack={project.stack}
        stamp={
          <ReleaseStamp
            entered={latest}
            isFresh
            label={translate('project.packages.kindStamp')}
            state='shipped'
          />
        }
        summary={project.summary}
        tagline={project.tagline}
        titleId={titleId}
      >
        {heroSample !== undefined && (
          <div className='entry-hero-specimen'>
            <CodeSpecimen
              code={heroSample.code}
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
      </EntryHead>
      <EntryFacts
        facts={[
          {
            label: translate('project.packages.count'),
            note: translate('project.packages.countNote'),
            value: String(housePackages.length)
          },
          ...(latest === undefined
            ? []
            : [
                {
                  label: translate('project.packages.latest'),
                  note: translate('project.packages.latestNote'),
                  value: latest
                }
              ]),
          {
            label: translate('project.commits'),
            note: translate('project.commitsNote', { date: history.readOn }),
            value: String(history.commits)
          },
          coverageFact(project.coverage, translate),
          {
            label: translate('project.packages.installedBy'),
            note: columns.map((column) => column.name).join(', '),
            value: translate('project.packages.installedByCount', {
              count: String(columns.length)
            })
          }
        ]}
      />
      {otherSamples.length > 0 && (
        <EntryBlock
          lead={translate('project.excerptsLead')}
          title={translate('project.excerpts')}
        >
          <SpecimenList hrefFor={hrefOfSample} samples={otherSamples} />
        </EntryBlock>
      )}
      <EntryBlock title={translate('project.shipped')}>
        <ShippedLines lines={project.highlights} />
      </EntryBlock>
      <EntryBlock
        id={LEDGER_ID}
        lead={translate('project.packages.ledgerLead')}
        title={translate('project.packages.ledger', {
          count: String(housePackages.length)
        })}
      >
        <ol className='register-rows entry-ledger'>
          <PackageLedger
            columns={columns}
            housePackages={housePackages}
            litPackage={null}
            packagesPath={null}
            repository={project.links.repository}
          />
        </ol>
      </EntryBlock>
      <EntryHistory history={history} packageRowHref={packageRowHref} />
      <NeighbourEntries above={above} below={null} />
    </article>
  )
}
