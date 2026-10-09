import type React from 'react'
import { useId, useState } from 'react'
import { Link as ReactAriaLink } from 'react-aria-components'

import {
  HOUSE_PACKAGE_SCOPE,
  type HousePackage,
  type HousePackageName,
  scopedNameOf
} from '@/features/packages/house-package'
import { npmPageFor, type Project } from '@/features/projects/project'
import { SiteLink } from '@/presentation/components/site-link/site-link'
import { useI18n } from '@/presentation/i18n/i18n-provider'

type PackageShelfProps = {
  housePackages: readonly HousePackage[]
  /** The packages' own project, for their documentation and source. */
  packagesProject: Project | undefined
}

/**
 * The house packages as one run of names. Pointing at a name reads out what it
 * does underneath; where nothing can hover, each name keeps its line below it.
 */
export const PackageShelf: React.FC<PackageShelfProps> = ({
  housePackages,
  packagesProject
}) => {
  const { locale, translate } = useI18n()
  const [pointed, setPointed] = useState<HousePackage | null>(null)
  const jobIdPrefix = useId()
  const jobIdOf = (name: HousePackageName): string => `${jobIdPrefix}-${name}`
  const documentation = packagesProject?.links.documentation?.[locale]

  const point = (housePackage: HousePackage, isPointed: boolean): void => {
    setPointed((current) =>
      isPointed ? housePackage : current === housePackage ? null : current
    )
  }

  return (
    <section
      aria-labelledby='packages-title'
      className='home-section package-shelf'
      id='packages'
    >
      <h2 className='section-title' id='packages-title'>
        {translate('home.shelf.title')}
      </h2>
      <p className='shelf-lead'>
        {translate('home.shelf.lead', { count: String(housePackages.length) })}
      </p>
      <ul className='shelf-list'>
        {housePackages.map((housePackage) => (
          <li key={housePackage.name}>
            <ReactAriaLink
              aria-describedby={jobIdOf(housePackage.name)}
              className={
                pointed === housePackage ? 'shelf-name pointed' : 'shelf-name'
              }
              href={npmPageFor(scopedNameOf(housePackage.name))}
              onBlur={() => point(housePackage, false)}
              onFocus={() => point(housePackage, true)}
              onHoverEnd={() => point(housePackage, false)}
              onHoverStart={() => point(housePackage, true)}
            >
              <span className='shelf-scope'>{HOUSE_PACKAGE_SCOPE}</span>
              {housePackage.name}
            </ReactAriaLink>
            <p className='shelf-job' id={jobIdOf(housePackage.name)}>
              {housePackage.job}
            </p>
          </li>
        ))}
      </ul>
      <p aria-hidden='true' className='shelf-pointed-job'>
        {pointed === null ? (
          <span className='shelf-hint'>{translate('home.shelf.hint')}</span>
        ) : (
          <>
            <strong>{scopedNameOf(pointed.name)}</strong> {pointed.job}
          </>
        )}
      </p>
      {packagesProject !== undefined && (
        <div className='section-actions'>
          {documentation !== undefined && (
            <SiteLink href={documentation} target='_blank' variant='ink'>
              {translate('home.shelf.documentation')}
            </SiteLink>
          )}
          <SiteLink
            href={packagesProject.links.repository}
            icon='github'
            target='_blank'
            variant='line'
          >
            {translate('home.shelf.source')}
          </SiteLink>
        </div>
      )}
    </section>
  )
}
