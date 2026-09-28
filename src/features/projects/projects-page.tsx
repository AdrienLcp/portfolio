import type React from 'react'
import { Suspense, use } from 'react'

import {
  projectPathFor,
  useProjectsData
} from '@/infrastructure/router/navigation'
import { Lid } from '@/presentation/components/lid'
import { Stamp, StampList } from '@/presentation/components/stamp'
import { Link } from '@/presentation/components/ui/link'
import { useI18n } from '@/presentation/i18n/i18n-provider'
import { apiErrorKey } from '@/presentation/i18n/translation'

import './projects-page.sass'

/** One box per project, each on its own shelf. */
const Shelf: React.FC = () => {
  const { locale, translate } = useI18n()
  const { projects } = useProjectsData()
  const result = use(projects)

  if (result.status === 'failure') {
    return (
      <p className='shelf-failure'>{translate(apiErrorKey(result.error))}</p>
    )
  }

  return (
    <ul className='shelf'>
      {result.data.map((project) => (
        <li className='shelf-box' key={project.slug}>
          <h2 className='box-name'>{project.name}</h2>
          <p className='box-tagline'>{project.tagline}</p>
          <StampList aria-label={translate('project.stack')}>
            {project.stack.map((technology) => (
              <Stamp key={technology}>{technology}</Stamp>
            ))}
          </StampList>
          <Link
            href={projectPathFor({ locale, slug: project.slug })}
            variant='accent'
          >
            {translate('projects.open', { name: project.name })}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export const ProjectsPage: React.FC = () => {
  const { translate } = useI18n()

  return (
    <main className='projects-page'>
      <Lid
        band={<p>{translate('projects.lead')}</p>}
        title={translate('projects.title')}
      />
      <div className='shelves'>
        <Suspense fallback={<div aria-busy='true' className='shelf-pending' />}>
          <Shelf />
        </Suspense>
      </div>
    </main>
  )
}
