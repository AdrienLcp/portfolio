import type React from 'react'
import { useEffect, useState } from 'react'

import { GiftRow } from '@/features/easter-eggs/gift-row'
import { useKonamiCode } from '@/features/easter-eggs/use-konami-code'
import { type Project, screenshotPathFor } from '@/features/projects/project'
import { canPreviewOnPointer } from '@/infrastructure/browser'
import {
  PROJECTS_ANCHOR,
  projectPathFor
} from '@/infrastructure/router/navigation'
import { SiteLink } from '@/presentation/components/site-link/site-link'
import { useI18n } from '@/presentation/i18n/i18n-provider'

import { ProjectRow } from './project-row'
import { useFollowingPreview } from './use-following-preview'

const SCREENSHOT_SIZES = '(width > 48rem) 50vw, 100vw'

const screenshotSourcesFor = (slug: string): string =>
  `${screenshotPathFor(slug, 640)} 640w, ${screenshotPathFor(slug, 1280)} 1280w`

const ProjectDetails: React.FC<{ project: Project }> = ({ project }) => {
  const { locale, translate } = useI18n()
  const { live, repository } = project.links

  return (
    <>
      <div className='project-details'>
        <p>{project.summary}</p>
        <ul className='project-facts'>
          {project.keyFacts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
        <div className='project-actions'>
          {live !== undefined && (
            <SiteLink href={live} target='_blank' variant='ink'>
              {translate(
                project.kind === 'game' ? 'home.index.play' : 'home.index.live'
              )}
            </SiteLink>
          )}
          <SiteLink
            href={repository}
            icon='github'
            target='_blank'
            variant='line'
          >
            {translate('home.index.source')}
          </SiteLink>
          <SiteLink
            href={projectPathFor({ locale, slug: project.slug })}
            variant='caps'
          >
            {translate('home.index.detail')}
          </SiteLink>
        </div>
      </div>
      <figure className='project-screenshot'>
        <img
          alt={project.screenshotAlt}
          decoding='async'
          height={800}
          loading='lazy'
          sizes={SCREENSHOT_SIZES}
          src={screenshotPathFor(project.slug, 640)}
          srcSet={screenshotSourcesFor(project.slug)}
          width={1280}
        />
      </figure>
    </>
  )
}

type ProjectIndexProps = {
  projects: readonly Project[]
}

/**
 * The apps as an index of names set large. Pointing at one calls up its
 * screenshot beside the pointer; pressing it unfolds the project in place.
 */
export const ProjectIndex: React.FC<ProjectIndexProps> = ({ projects }) => {
  const { translate } = useI18n()
  const isGiftFound = useKonamiCode()
  const [openSlugs, setOpenSlugs] = useState<ReadonlySet<string>>(new Set())
  const [isPreviewLoaded, setIsPreviewLoaded] = useState(false)
  const { activeSlug, hide, previewRef, show } = useFollowingPreview()

  useEffect(() => {
    if (activeSlug === null) {
      return
    }

    const hideUnlessFocused = (): void => {
      if (!document.activeElement?.matches('.project-toggle')) {
        hide()
      }
    }

    addEventListener('scroll', hideUnlessFocused, { passive: true })

    return () => removeEventListener('scroll', hideUnlessFocused)
  }, [activeSlug, hide])

  const toggle = (slug: string): void => {
    setOpenSlugs((slugs) => {
      const next = new Set(slugs)

      if (!next.delete(slug)) {
        next.add(slug)
      }

      return next
    })
    hide()
  }

  return (
    <section
      aria-labelledby='projects-title'
      className='home-section project-index'
      id={PROJECTS_ANCHOR}
    >
      <h2 className='section-title' id='projects-title'>
        {translate('home.index.title')}
      </h2>
      <p className='section-intro'>{translate('home.index.intro')}</p>
      <ul
        className={
          activeSlug === null ? 'project-list' : 'project-list previewing'
        }
        onPointerEnter={() => {
          if (!isPreviewLoaded && canPreviewOnPointer()) {
            setIsPreviewLoaded(true)
          }
        }}
      >
        {isGiftFound && <GiftRow />}
        {projects.map((project) => (
          <ProjectRow
            isDimmed={activeSlug !== null && activeSlug !== project.slug}
            isOpen={openSlugs.has(project.slug)}
            key={project.slug}
            name={project.name}
            onPoint={(anchor) => show(project.slug, anchor)}
            onPointAway={hide}
            onToggle={() => toggle(project.slug)}
            tagline={project.tagline}
          >
            <ProjectDetails project={project} />
          </ProjectRow>
        ))}
      </ul>
      <div
        aria-hidden='true'
        className={
          activeSlug === null ? 'project-preview' : 'project-preview shown'
        }
        ref={previewRef}
      >
        {isPreviewLoaded &&
          projects.map((project) => (
            <img
              alt=''
              className={project.slug === activeSlug ? 'current' : undefined}
              decoding='async'
              key={project.slug}
              sizes='24rem'
              src={screenshotPathFor(project.slug, 640)}
              srcSet={screenshotSourcesFor(project.slug)}
            />
          ))}
      </div>
    </section>
  )
}
