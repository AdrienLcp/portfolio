import type React from 'react'
import { Suspense, use } from 'react'

import { CodeSampleCard } from '@/features/project-pages/code-sample'
import { useProjectData } from '@/features/project-pages/project-loader'
import { npmPageFor, type Project } from '@/features/projects/project'
import { projectsPathFor } from '@/infrastructure/router/navigation'
import { Lid } from '@/presentation/components/lid'
import { Main } from '@/presentation/components/main'
import { Stamp, StampList } from '@/presentation/components/stamp'
import { Link } from '@/presentation/components/ui/link'
import { projectHead } from '@/presentation/head/document-head'
import { useDocumentTitle } from '@/presentation/head/use-document-title'
import { useI18n } from '@/presentation/i18n/i18n-provider'
import { apiErrorKey } from '@/presentation/i18n/translation'
import { MissingPiece } from '@/presentation/missing-piece'
import { RouteFallback } from '@/presentation/route-fallback'

import './project-page.sass'

type RuleBookletProps = {
  project: Project
}

/** The case study, printed as the game's rule booklet. */
const RuleBooklet: React.FC<RuleBookletProps> = ({ project }) => {
  const { locale, translate } = useI18n()
  useDocumentTitle(projectHead(project).title)

  return (
    <>
      <Lid band={<p>{project.tagline}</p>} title={project.name} />
      <div className='rule-booklet'>
        <div className='booklet-text'>
          <p className='booklet-summary'>{project.summary}</p>
          {project.samples !== undefined && (
            <section aria-labelledby='how-it-plays' className='booklet-section'>
              <h2 className='booklet-heading' id='how-it-plays'>
                {translate('project.samples')}
              </h2>
              <div className='samples'>
                {project.samples.map((sample) => (
                  <CodeSampleCard key={sample.title} sample={sample} />
                ))}
              </div>
            </section>
          )}
          <section aria-labelledby='in-the-box' className='booklet-section'>
            <h2 className='booklet-heading' id='in-the-box'>
              {translate('project.highlights')}
            </h2>
            <ul className='highlights'>
              {project.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </section>
        </div>
        <aside className='booklet-aside'>
          <section aria-labelledby='stack' className='booklet-section'>
            <h2 className='booklet-heading' id='stack'>
              {translate('project.stack')}
            </h2>
            <StampList>
              {project.stack.map((technology) => (
                <Stamp key={technology}>{technology}</Stamp>
              ))}
            </StampList>
          </section>
          <div className='booklet-links'>
            <Link
              href={project.links.repository}
              target='_blank'
              variant='accent'
            >
              {translate('project.repository')}
            </Link>
            {project.links.live !== undefined && (
              <Link href={project.links.live} target='_blank'>
                {translate('project.live')}
              </Link>
            )}
            {project.links.packages?.map((packageName) => (
              <Link
                href={npmPageFor(packageName)}
                key={packageName}
                target='_blank'
              >
                {translate('project.package', { name: packageName })}
              </Link>
            ))}
            <Link href={projectsPathFor(locale)}>
              {translate('project.allProjects')}
            </Link>
          </div>
        </aside>
      </div>
    </>
  )
}

const ProjectCase: React.FC = () => {
  const { locale, translate } = useI18n()
  const result = use(useProjectData().project)

  return result.status === 'failure' ? (
    <MissingPiece
      backHref={projectsPathFor(locale)}
      backLabel={translate('project.allProjects')}
      message={translate(apiErrorKey(result.error))}
    />
  ) : (
    <RuleBooklet project={result.data} />
  )
}

export const ProjectPage: React.FC = () => (
  <Main className='project-page'>
    <Suspense fallback={<RouteFallback />}>
      <ProjectCase />
    </Suspense>
  </Main>
)
