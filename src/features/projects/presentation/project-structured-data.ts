import type { Project } from '@/features/projects/domain/project'
import { personIdFor, websiteIdFor } from '@/presentation/head/structured-data'
import type { Locale } from '@/presentation/i18n/locale'

export const projectNodeFor = ({
  locale,
  origin,
  path,
  project
}: {
  locale: Locale
  origin: string
  path: string
  project: Project
}): object => ({
  '@id': `${origin}${path}#project`,
  '@type': 'SoftwareSourceCode',
  author: { '@id': personIdFor(origin) },
  codeRepository: project.links.repository,
  description: project.summary,
  inLanguage: locale,
  isPartOf: { '@id': websiteIdFor(origin) },
  keywords: project.stack,
  name: project.name,
  ...(project.links.live && {
    targetProduct: {
      '@type': 'WebApplication',
      name: project.name,
      url: project.links.live
    }
  }),
  url: `${origin}${path}`
})
