import type { z } from 'zod'

import type { cvSchema } from '@/features/cv/domain/cv'

export const CV: z.input<typeof cvSchema> = {
  contact: {
    email: 'adrienlcp@gmail.com',
    location: { en: 'Couëron, near Nantes', fr: 'Couëron, près de Nantes' },
    phone: '+33650234020',
    website: 'https://adrienlacourpaille.dev'
  },
  education: [
    {
      detail: {
        en: 'Intensive remote course, 798 hours',
        fr: 'Formation intensive à distance, 798 heures'
      },
      school: 'O’Clock',
      title: { en: 'Web developer', fr: 'Développeur web' },
      year: '2021'
    }
  ],
  extras: [
    {
      en: 'Technical English: I read documentation fluently',
      fr: 'Anglais technique : lecture courante de documentation'
    },
    { en: 'Cinema, table tennis', fr: 'Cinéma, tennis de table' }
  ],
  headline: 'TypeScript · React · Node.js',
  jobs: [
    {
      employer: 'Ucaya',
      missions: [
        {
          period: { from: '2024' },
          points: [
            {
              en: 'React 19 / Express 5 / MongoDB monorepo: touch app, back office, OpenAPI-first API, realtime over Socket.IO.',
              fr: 'Monorepo React 19 / Express 5 / MongoDB : application tactile, back-office, API OpenAPI, temps réel Socket.IO.'
            },
            {
              en: 'Set up OpenTelemetry observability; maintain and evolve the GCP infrastructure (Cloud Run, Firebase, Terraform) and the GitLab CI/CD; fix what the security scans report.',
              fr: 'Mise en place de l’observabilité OpenTelemetry ; maintenance et évolution de l’infra GCP (Cloud Run, Firebase, Terraform) et de la CI/CD GitLab ; traitement des alertes des scans de sécurité.'
            },
            {
              en: 'MCP server to drive the platform from an AI assistant; Gemini integration.',
              fr: 'Serveur MCP pour piloter la plateforme depuis un assistant IA ; intégration de Gemini.'
            },
            {
              en: 'Tested with Vitest, Playwright and Testcontainers; accessible design system in Storybook.',
              fr: 'Tests Vitest, Playwright et Testcontainers ; design system accessible dans Storybook.'
            },
            {
              en: 'Regular major upgrades (React 19, Express 5, TypeScript 6, Vite 8), adopting the new APIs as they land.',
              fr: 'Montées de version régulières (React 19, Express 5, TypeScript 6, Vite 8) en adoptant les nouvelles API.'
            }
          ],
          summary: {
            en: 'Synchronised touch screens for client demonstrations. About 80% of the commits; sole developer since January 2026.',
            fr: 'Écrans tactiles synchronisés pour des démonstrations clients. Environ 80 % des commits ; seul développeur depuis janvier 2026.'
          },
          title: {
            en: 'Interactive multi-screen presentation platform',
            fr: 'Plateforme de présentation interactive multi-écrans'
          }
        },
        {
          period: { from: '2024', to: '2026' },
          points: [],
          summary: {
            en: 'Lead developer on the React/TypeScript web app (dashboards, metrics), the landing page and the React Native mobile app.',
            fr: 'Principal développeur de la webapp React/TypeScript (tableaux de bord, métriques), de la landing et de l’app mobile React Native.'
          },
          title: {
            en: 'Music data analytics application',
            fr: 'Application d’analyse de données musicales'
          }
        },
        {
          points: [],
          summary: {
            en: 'Built in JavaScript on Shaka Player.',
            fr: 'Développé en JavaScript sur Shaka Player.'
          },
          title: {
            en: 'Streaming video player',
            fr: 'Lecteur vidéo de streaming'
          }
        }
      ],
      period: { from: '2023-03' },
      place: 'Nantes',
      points: [
        {
          en: 'Mentoring junior developers and apprentices; code reviews across the team.',
          fr: 'Tutorat de développeurs juniors et d’alternants ; code reviews de l’équipe.'
        },
        {
          en: 'Internal tooling: Claude Code plugins shared by the team, n8n workflows (GitLab, team chat).',
          fr: 'Outillage interne : plugins Claude Code partagés par l’équipe, workflows n8n (GitLab, messagerie).'
        }
      ],
      title: { en: 'Full-stack developer', fr: 'Développeur full-stack' }
    }
  ],
  projects: [
    {
      link: 'https://taverla.onrender.com/',
      name: 'Taverla',
      summary: {
        en: 'Party games: players join by QR code and play on their phones. React / Hono / WebSocket monorepo, Docker, GitHub Actions, Playwright end-to-end tests, Lighthouse CI.',
        fr: 'Jeux de soirée : les joueurs rejoignent par QR code et jouent avec leur téléphone. Monorepo React / Hono / WebSocket, Docker, GitHub Actions, e2e Playwright, Lighthouse CI.'
      },
      year: '2026'
    },
    {
      link: 'https://github.com/AdrienLcp/portfolio',
      name: 'Portfolio',
      summary: {
        en: 'Accessible design system (React Aria), Storybook, in-browser tests, a Lighthouse CI gate at 100/100 on every page.',
        fr: 'Design system accessible (React Aria), Storybook, tests en navigateur, CI Lighthouse bloquante à 100/100 sur chaque page.'
      },
      year: '2026'
    },
    {
      link: 'https://github.com/AdrienLcp/vap',
      name: 'vap',
      summary: {
        en: 'Next.js e-commerce: Drizzle/PostgreSQL, Better Auth, Stripe, transactional emails. Discontinued, code public.',
        fr: 'E-commerce Next.js : Drizzle/PostgreSQL, Better Auth, Stripe, emails transactionnels. Projet arrêté, code public.'
      },
      year: '2025'
    }
  ],
  skills: [
    {
      group: { en: 'Front end', fr: 'Front' },
      terms: [
        'React',
        'TypeScript',
        'React Router',
        'React Aria',
        'Vite',
        'Sass',
        'Storybook',
        { en: 'accessibility', fr: 'accessibilité' }
      ]
    },
    {
      group: { en: 'Back end', fr: 'Back' },
      terms: [
        'Node.js',
        'Express',
        'Hono',
        'REST / OpenAPI',
        'WebSocket',
        'Socket.IO'
      ]
    },
    {
      group: { en: 'Data', fr: 'Données' },
      terms: ['MongoDB (Mongoose)', 'PostgreSQL (Drizzle, Prisma)']
    },
    {
      group: { en: 'Quality', fr: 'Qualité' },
      terms: [
        'Vitest',
        'Playwright',
        'Testcontainers',
        'Biome',
        'Lighthouse CI'
      ]
    },
    {
      group: { en: 'DevOps', fr: 'DevOps' },
      terms: [
        'Docker',
        { en: 'GitLab CI/CD', fr: 'CI/CD GitLab' },
        'GitHub Actions',
        'GCP',
        'OpenTelemetry'
      ]
    },
    {
      group: { en: 'AI', fr: 'IA' },
      terms: [
        'Claude Code (skills, plugins)',
        { en: 'MCP servers', fr: 'serveurs MCP' },
        'n8n',
        { en: 'Gemini API', fr: 'API Gemini' }
      ]
    },
    {
      group: { en: 'Also', fr: 'Autres' },
      terms: [
        'Next.js',
        'React Native',
        'pnpm workspaces',
        { en: 'C# / .NET (basics)', fr: 'C# / .NET (notions)' }
      ]
    }
  ],
  specs: [
    {
      label: { en: 'Developer since', fr: 'Développeur depuis' },
      value: { en: '2023', fr: '2023' }
    },
    {
      label: { en: 'Based in', fr: 'Basé à' },
      value: { en: 'Nantes', fr: 'Nantes' }
    },
    {
      label: { en: 'Licence', fr: 'Permis' },
      value: { en: 'B, own car', fr: 'B, véhiculé' }
    }
  ],
  summary: {
    en: 'Full-stack developer since 2023, sole developer of a multi-screen platform in production. I care about sound architecture (monorepos, clean architecture, APIs typed end to end), accessibility and tests. I follow release notes and keep my projects on the latest versions of their ecosystem. I use AI agents every day, down to building their tooling.',
    fr: 'Développeur full-stack depuis 2023, seul développeur d’une plateforme multi-écrans en production. J’aime les architectures propres (monorepos, clean architecture, API typées de bout en bout), l’accessibilité et les tests. Je suis les release notes et garde mes projets sur les dernières versions de leur écosystème. J’utilise les agents IA au quotidien, jusqu’à construire leur outillage.'
  },
  title: { en: 'Full-stack developer', fr: 'Développeur full-stack' }
}
