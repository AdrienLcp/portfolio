import { PROFILE_PHOTO, type Profile } from '@/features/profile/profile'
import { homePathFor } from '@/infrastructure/router/navigation'
import type { Locale } from '@/presentation/i18n/locale'

export const personIdFor = (origin: string): string => `${origin}/#person`

export const websiteIdFor = (origin: string): string => `${origin}/#website`

export const structuredDataDocumentFor = ({
  locale,
  origin,
  pageNodes,
  profile: { links, name, role }
}: {
  locale: Locale
  origin: string
  pageNodes: object[]
  profile: Profile
}): object => {
  const home = `${origin}${homePathFor(locale)}`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@id': personIdFor(origin),
        '@type': 'Person',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'FR',
          addressLocality: 'Nantes'
        },
        image: `${origin}${PROFILE_PHOTO.path}`,
        jobTitle: role,
        name,
        sameAs: [links.github, links.linkedin],
        url: home
      },
      {
        '@id': websiteIdFor(origin),
        '@type': 'WebSite',
        author: { '@id': personIdFor(origin) },
        inLanguage: locale,
        name,
        url: home
      },
      ...pageNodes
    ]
  }
}
