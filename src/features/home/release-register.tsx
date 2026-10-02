import type React from 'react'
import { useState } from 'react'

import type { HousePackage } from '@/features/packages/house-package'
import type { Project, RegisterEntry } from '@/features/projects/project'
import { projectPathFor } from '@/infrastructure/router/navigation'
import { useI18n } from '@/presentation/i18n/i18n-provider'

import { AppEntry, type RowReference } from './app-entry'
import {
  type CrossReference,
  crossReferenceAt,
  isAppLit
} from './cross-reference'
import { type LedgerColumn, PackageLedger } from './package-ledger'
import { SITE_INSTALLS, SITE_SLUG, SiteEntry } from './site-entry'

type RegisteredProject = Project & { register: RegisterEntry }

const isRegistered = (project: Project): project is RegisteredProject =>
  project.register !== undefined

const hasFinePointer = (): boolean =>
  window.matchMedia('(hover: hover) and (pointer: fine)').matches

type ReleaseRegisterProps = {
  housePackages: readonly HousePackage[]
  projects: readonly Project[]
}

/**
 * Every app in curated order, this site, then the packages they all install.
 * Pointing at a package lights the apps that install it; pointing at an app's
 * analytics link lights both ends.
 */
export const ReleaseRegister: React.FC<ReleaseRegisterProps> = ({
  housePackages,
  projects
}) => {
  const { locale, translate } = useI18n()
  const [reference, setReference] = useState<CrossReference | null>(null)
  const apps = projects.filter(isRegistered)
  const siteName = translate('home.site.title')
  const site: RowReference = { name: siteName, slug: SITE_SLUG }
  const referenceOf = (slug: string | undefined): RowReference | null => {
    const app = apps.find((candidate) => candidate.slug === slug)

    return app === undefined ? null : { name: app.name, slug: app.slug }
  }
  const analytics = apps.find((app) =>
    apps.some((other) => other.register.countedBy === app.slug)
  )
  const reportersOf = (slug: string): RowReference[] => [
    ...(analytics?.slug === slug ? [site] : []),
    ...apps
      .filter((app) => app.register.countedBy === slug)
      .map((app) => ({ name: app.name, slug: app.slug }))
  ]
  const newest = apps.reduce<RegisteredProject | undefined>(
    (latest, app) =>
      latest === undefined || app.register.entered > latest.register.entered
        ? app
        : latest,
    undefined
  )
  const litPackage = reference?.kind === 'package' ? reference.name : null
  const columns: LedgerColumn[] = [
    ...apps.map((app) => ({
      installs: app.register.installs,
      name: app.name,
      shortName: app.register.shortName,
      slug: app.slug
    })),
    {
      installs: SITE_INSTALLS,
      name: siteName,
      shortName: translate('home.site.short'),
      slug: SITE_SLUG
    }
  ]
  const packagesProject = projects.find((project) => project.kind === 'library')

  const pointAt = (target: EventTarget | null): void => {
    setReference(crossReferenceAt(target))
  }

  return (
    <section
      aria-labelledby='register-title'
      className={
        reference === null ? 'release-register' : 'release-register lit'
      }
      id='register'
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setReference(null)
        }
      }}
      onFocus={(event) => pointAt(event.target)}
      onPointerLeave={() => setReference(null)}
      onPointerOver={(event) => {
        if (hasFinePointer()) {
          pointAt(event.target)
        }
      }}
    >
      <h2 className='visually-hidden' id='register-title'>
        {translate('home.register.title')}
      </h2>
      <div aria-hidden='true' className='register-cap'>
        <div className='app-columns wide-head'>
          <span>{translate('home.register.date')}</span>
          <span>
            {translate('home.register.app')} · <b>{apps.length + 1}</b> ·{' '}
            {translate('home.register.packagesBelow')}
          </span>
          <span>{translate('home.register.drawing')}</span>
          <span className='column-state'>
            {translate('home.register.state')}
          </span>
        </div>
        <div className='narrow-head'>
          <span>{translate('home.register.apps')}</span>
          <span>
            {translate('home.register.appsThenPackages', {
              apps: String(apps.length + 1),
              packages: String(housePackages.length)
            })}
          </span>
        </div>
      </div>
      <ol className='register-rows'>
        {apps.map((app) => (
          <AppEntry
            countedBy={referenceOf(app.register.countedBy)}
            isFresh={app === newest}
            isLit={isAppLit({
              installs: app.register.installs,
              reference,
              slug: app.slug
            })}
            key={app.slug}
            litPackage={litPackage}
            project={app}
            reporters={reportersOf(app.slug)}
          />
        ))}
        <SiteEntry
          countedBy={
            analytics === undefined ? null : referenceOf(analytics.slug)
          }
          isLit={isAppLit({
            installs: SITE_INSTALLS,
            reference,
            slug: SITE_SLUG
          })}
          litPackage={litPackage}
        />
        <PackageLedger
          columns={columns}
          housePackages={housePackages}
          litPackage={litPackage}
          packagesPath={
            packagesProject === undefined
              ? null
              : projectPathFor({ locale, slug: packagesProject.slug })
          }
          repository={packagesProject?.links.repository ?? null}
        />
      </ol>
    </section>
  )
}
