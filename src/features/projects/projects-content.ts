import type { ProjectFacts } from '@/features/projects/project'
import { TEST_COVERAGE_FIGURES } from '@/features/projects/test-coverage-figures'

import i18nExcerpt from './excerpts/i18n.excerpt.ts?highlighted'
import reminderScheduleExcerpt from './excerpts/reminder-schedule.excerpt.ts?highlighted'
import resultExcerpt from './excerpts/result.excerpt.ts?highlighted'
import safeStorageExcerpt from './excerpts/safe-storage.excerpt.ts?highlighted'
import sourceVersionExcerpt from './excerpts/source-version.excerpt.ts?highlighted'
import themePreferenceExcerpt from './excerpts/theme-preference.excerpt.ts?highlighted'

/**
 * Every project's facts, the same in every language; their words are in
 * `projects-content-en` and `projects-content-fr`.
 */
export const PROJECTS: ProjectFacts[] = [
  {
    coverage: TEST_COVERAGE_FIGURES.melee,
    icon: '/images/icons/melee.svg',
    kind: 'game',
    links: {
      live: 'https://melee.adrienlcp.com/',
      repository: 'https://github.com/AdrienLcp/melee'
    },
    locales: ['fr', 'en'],
    name: 'Mêlée',
    release: {
      countedBy: 'analytics',
      entered: '2026-09-29',
      installs: [
        'biome-config',
        'browser',
        'i18n',
        'react',
        'react-aria',
        'react-router',
        'result',
        'safe-storage',
        'styles',
        'theme-preference',
        'tsconfig'
      ],
      shortName: 'Mêlée',
      state: 'shipped'
    },
    slug: 'melee',
    stack: ['TypeScript', 'React', 'Hono', 'WebSocket', 'Zod', 'Playwright']
  },
  {
    coverage: TEST_COVERAGE_FIGURES['on-record'],
    icon: '/images/icons/on-record.svg',
    kind: 'app',
    links: {
      live: 'https://on-record.adrienlcp.com',
      repository: 'https://github.com/AdrienLcp/on-record'
    },
    locales: ['fr'],
    name: 'on-record',
    release: {
      countedBy: 'analytics',
      entered: '2026-10-01',
      installs: [
        'biome-config',
        'browser',
        'i18n',
        'react',
        'react-aria',
        'react-router',
        'result',
        'safe-storage',
        'styles',
        'theme-preference',
        'tsconfig'
      ],
      shortName: 'Rec.',
      state: 'live'
    },
    samples: [
      {
        excerpt: sourceVersionExcerpt,
        title: 'source-version.ts'
      }
    ],
    slug: 'on-record',
    stack: [
      'TypeScript',
      'React',
      'Zod',
      'GitHub Actions',
      'Cloudflare Pages',
      'Vitest'
    ]
  },
  {
    coverage: TEST_COVERAGE_FIGURES.scoreboard,
    icon: '/images/icons/scoreboard.svg',
    kind: 'app',
    links: {
      live: 'https://scoreboard.adrienlcp.com',
      repository: 'https://github.com/AdrienLcp/scoreboard'
    },
    locales: ['fr'],
    name: 'Scoreboard',
    release: {
      countedBy: 'analytics',
      entered: '2026-10-03',
      installs: [
        'biome-config',
        'react',
        'react-aria',
        'result',
        'safe-storage',
        'styles',
        'tsconfig'
      ],
      shortName: 'Scb.',
      state: 'live'
    },
    slug: 'scoreboard',
    stack: [
      'TypeScript',
      'React',
      'Cloudflare Workers',
      'Durable Objects',
      'WebSocket',
      'Vitest'
    ]
  },
  {
    coverage: TEST_COVERAGE_FIGURES.analytics,
    icon: '/images/icons/analytics.svg',
    kind: 'app',
    links: {
      live: 'https://analytics.adrienlcp.com',
      repository: 'https://github.com/AdrienLcp/analytics'
    },
    locales: ['fr', 'en'],
    name: 'Analytics',
    release: {
      entered: '2026-09-30',
      installs: [
        'biome-config',
        'i18n',
        'react',
        'react-aria',
        'result',
        'safe-storage',
        'styles',
        'tsconfig'
      ],
      shortName: 'Anl.',
      state: 'live'
    },
    slug: 'analytics',
    stack: ['TypeScript', 'Hono', 'Cloudflare Workers', 'D1', 'React', 'Vitest']
  },
  {
    coverage: TEST_COVERAGE_FIGURES.seance,
    icon: '/images/icons/seance.png',
    kind: 'app',
    links: {
      live: 'https://sport.adrienlcp.com/specimen',
      repository: 'https://github.com/AdrienLcp/sport'
    },
    locales: ['fr', 'en'],
    name: 'Séance',
    release: {
      entered: '2026-09-29',
      installs: [
        'biome-config',
        'browser',
        'i18n',
        'react',
        'react-router',
        'result',
        'safe-storage',
        'styles',
        'theme-preference',
        'tsconfig'
      ],
      shortName: 'Séa.',
      state: 'shipped'
    },
    samples: [
      {
        excerpt: reminderScheduleExcerpt,
        title: 'reminder-schedule.ts'
      }
    ],
    slug: 'seance',
    stack: ['TypeScript', 'React', 'PWA', 'Workbox', 'IndexedDB', 'Vitest']
  },
  {
    coverage: TEST_COVERAGE_FIGURES.pastime,
    icon: '/images/icons/pastime.svg',
    kind: 'game',
    links: {
      live: 'https://pastime.adrienlcp.com',
      repository: 'https://github.com/AdrienLcp/pastime'
    },
    locales: ['fr', 'en'],
    name: 'Pastime',
    release: {
      entered: '2026-10-07',
      installs: [
        'biome-config',
        'browser',
        'i18n',
        'react',
        'react-aria',
        'react-router',
        'result',
        'safe-storage',
        'styles',
        'theme-preference',
        'tsconfig'
      ],
      shortName: 'Pas.',
      state: 'live'
    },
    slug: 'pastime',
    stack: ['TypeScript', 'React', 'PWA', 'Web Workers', 'Workbox', 'Vitest']
  },
  {
    coverage: TEST_COVERAGE_FIGURES.arbor,
    icon: '/images/icons/arbor.svg',
    kind: 'app',
    links: {
      live: 'https://arbor.adrienlcp.com',
      repository: 'https://github.com/AdrienLcp/arbor'
    },
    locales: ['fr', 'en'],
    name: 'Arbor',
    release: {
      entered: '2026-10-07',
      installs: [
        'biome-config',
        'browser',
        'i18n',
        'react',
        'react-aria',
        'react-router',
        'result',
        'safe-storage',
        'styles',
        'theme-preference',
        'tsconfig'
      ],
      shortName: 'Arb.',
      state: 'live'
    },
    slug: 'arbor',
    stack: [
      'TypeScript',
      'React',
      'Cloudflare Workers',
      'Durable Objects',
      'SQLite',
      'Playwright'
    ]
  },
  {
    coverage: TEST_COVERAGE_FIGURES.list,
    icon: '/images/icons/list.svg',
    kind: 'app',
    links: {
      live: 'https://list.adrienlcp.com',
      repository: 'https://github.com/AdrienLcp/list'
    },
    locales: ['fr', 'en'],
    name: 'List',
    release: {
      entered: '2026-10-09',
      installs: [
        'biome-config',
        'i18n',
        'react',
        'react-aria',
        'result',
        'safe-storage',
        'styles',
        'theme-preference',
        'tsconfig'
      ],
      shortName: 'List',
      state: 'live'
    },
    slug: 'list',
    stack: [
      'TypeScript',
      'React',
      'Hono',
      'Cloudflare Workers',
      'Durable Objects',
      'WebSocket'
    ]
  },
  {
    coverage: TEST_COVERAGE_FIGURES.packages,
    icon: '/images/icons/packages.svg',
    kind: 'library',
    links: {
      documentation: {
        en: 'https://packages.adrienlcp.com',
        fr: 'https://packages.adrienlcp.com/fr'
      },
      packages: [
        '@adrienlcp/i18n',
        '@adrienlcp/result',
        '@adrienlcp/theme-preference',
        '@adrienlcp/safe-storage',
        '@adrienlcp/browser',
        '@adrienlcp/react',
        '@adrienlcp/react-aria',
        '@adrienlcp/styles',
        '@adrienlcp/tsconfig',
        '@adrienlcp/biome-config',
        '@adrienlcp/react-router'
      ],
      repository: 'https://github.com/AdrienLcp/packages'
    },
    locales: ['fr', 'en'],
    name: 'Packages',
    samples: [
      {
        excerpt: i18nExcerpt,
        title: '@adrienlcp/i18n'
      },
      {
        excerpt: resultExcerpt,
        title: '@adrienlcp/result'
      },
      {
        excerpt: themePreferenceExcerpt,
        title: '@adrienlcp/theme-preference'
      },
      {
        excerpt: safeStorageExcerpt,
        title: '@adrienlcp/safe-storage'
      }
    ],
    slug: 'packages',
    stack: [
      'TypeScript',
      'React',
      'Intl',
      'Vitest',
      'Biome',
      'Changesets',
      'GitHub Actions'
    ]
  }
]
