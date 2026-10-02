import type React from 'react'
import { useId, useRef } from 'react'

import type { HousePackage } from '@/features/packages/house-package'
import type { Plates } from '@/features/register/plates'
import { ReleaseStamp } from '@/features/register/release-stamp'
import type { RegisteredProject } from '@/features/register/this-site'
import { useDrawnWhenSeen } from '@/features/register/use-drawn-when-seen'
import { RegisterLink } from '@/presentation/components/register/register-link'
import { useTranslate } from '@/presentation/i18n/i18n-provider'

import { coverageFact } from './coverage-fact'
import { EntryBlock, ShippedLines } from './entry-block'
import { EntryFacts } from './entry-facts'
import { EntryHead } from './entry-head'
import { EntryHistory } from './entry-history'
import { EntryInstalls, type PackageRowHref } from './entry-installs'
import { type Neighbour, NeighbourEntries } from './neighbour-entries'
import { SpecimenList } from './specimen-list'

type MechanismProps = {
  Mechanism: React.FC
  title: string
}

/** The diagram draws itself the first time it scrolls into view. */
const MechanismBlock: React.FC<MechanismProps> = ({ Mechanism, title }) => {
  const translate = useTranslate()
  const plateRef = useRef<HTMLDivElement>(null)
  const isDrawn = useDrawnWhenSeen(plateRef, true)

  return (
    <EntryBlock lead={title} title={translate('project.mechanism')}>
      <div
        className={
          isDrawn
            ? 'entry-mechanism mechanism-plate drawn'
            : 'entry-mechanism mechanism-plate'
        }
        ref={plateRef}
      >
        <Mechanism />
      </div>
    </EntryBlock>
  )
}

type AppEntryPageProps = {
  above: Neighbour | null
  below: Neighbour | null
  housePackages: readonly HousePackage[]
  packageRowHref: PackageRowHref | null
  plates: Plates | undefined
  project: RegisteredProject
  registerHref: string
}

/** An app's entry, unfolded to a page: what shipped, how, and since when. */
export const AppEntryPage: React.FC<AppEntryPageProps> = ({
  above,
  below,
  housePackages,
  packageRowHref,
  plates,
  project,
  registerHref
}) => {
  const translate = useTranslate()
  const titleId = useId()
  const { history, register } = project
  const firstCommit = history.lines.at(-1)
  const stateLabel = translate(`home.state.${register.state}`)

  return (
    <article aria-labelledby={titleId} className='entry-page'>
      <EntryHead
        actions={
          <>
            {project.links.live !== undefined && (
              <RegisterLink
                href={project.links.live}
                target='_blank'
                variant='ink'
              >
                {translate(
                  project.kind === 'game'
                    ? 'home.entry.openGame'
                    : 'home.entry.openApp'
                )}
              </RegisterLink>
            )}
            <RegisterLink
              href={project.links.repository}
              target='_blank'
              variant='line'
            >
              {translate('project.source')}
            </RegisterLink>
          </>
        }
        dates={[
          { label: translate('project.entered'), value: register.entered },
          ...(firstCommit === undefined
            ? []
            : [
                {
                  label: translate('project.firstCommit'),
                  value: firstCommit.date
                }
              ])
        ]}
        kind={`${translate('home.register.app')} · ${register.category}`}
        name={project.name}
        registerHref={registerHref}
        stack={project.stack}
        stamp={
          <ReleaseStamp
            entered={register.entered}
            isFresh
            state={register.state}
          />
        }
        summary={project.summary}
        tagline={project.tagline}
        titleId={titleId}
      >
        {plates !== undefined && (
          <figure className='entry-scene'>
            <plates.Drawing />
            <figcaption>{translate('home.entry.drawn')}</figcaption>
          </figure>
        )}
      </EntryHead>
      <EntryFacts
        facts={[
          {
            label: translate('project.entered'),
            note: stateLabel,
            value: register.entered
          },
          ...(firstCommit === undefined
            ? []
            : [
                {
                  label: translate('project.firstCommit'),
                  note: firstCommit.subject,
                  value: firstCommit.date
                }
              ]),
          {
            label: translate('project.commits'),
            note: translate('project.commitsNote', { date: history.readOn }),
            value: String(history.commits)
          },
          coverageFact(project.coverage, translate),
          {
            label: translate('project.housePackages'),
            note: translate('project.housePackagesNote'),
            value: translate('project.housePackagesCount', {
              count: String(register.installs.length),
              total: String(housePackages.length)
            })
          }
        ]}
      />
      <EntryBlock title={translate('project.shipped')}>
        <ShippedLines lines={project.highlights} />
      </EntryBlock>
      {plates !== undefined && (
        <MechanismBlock
          Mechanism={plates.Mechanism}
          title={plates.mechanismTitle(translate)}
        />
      )}
      {project.samples !== undefined && (
        <EntryBlock
          lead={translate('project.excerptsLead')}
          title={translate('project.excerpts')}
        >
          <SpecimenList samples={project.samples} />
        </EntryBlock>
      )}
      <EntryHistory history={history} packageRowHref={packageRowHref} />
      <EntryInstalls
        housePackages={housePackages}
        installs={register.installs}
        packageRowHref={packageRowHref}
      />
      <NeighbourEntries above={above} below={below} />
    </article>
  )
}
