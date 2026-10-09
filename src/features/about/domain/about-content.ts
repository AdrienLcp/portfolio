import type { AboutContent } from '@/features/about/domain/about'

export const ABOUT: AboutContent = {
  steps: [
    {
      mark: { en: 'As a teen', fr: 'Ado' },
      paragraphs: [
        {
          en: 'My first HTML tags and my first CSS, on the Site du Zéro, the French school of self-taught coders. Then nothing for years: I was busy growing up.',
          fr: 'Mes premières balises HTML et mes premières lignes de CSS, sur le Site du Zéro. Puis plus rien pendant des années : j’étais occupé à grandir.'
        }
      ],
      state: 'paused',
      title: { en: 'Site du Zéro', fr: 'Site du Zéro' },
      where: { en: 'Self-taught', fr: 'Autodidacte' }
    },
    {
      mark: { en: '6 years', fr: '6 ans' },
      paragraphs: [
        {
          en: 'Receiving and shelving at a seller of motorbike and scooter parts. Six years of putting every part in its place, which turns out to be decent training for software architecture.',
          fr: 'Réception et mise en rayon chez un vendeur de pièces pour deux-roues. Six ans à ranger chaque pièce à sa place, ce qui reste une assez bonne école d’architecture logicielle.'
        }
      ],
      state: 'closed',
      title: { en: 'P2R', fr: 'P2R' },
      where: { en: 'Receiving and shelving', fr: 'Réception et mise en rayon' }
    },
    {
      mark: { en: '2021', fr: '2021' },
      markNote: { en: '5½ months', fr: '5 mois ½' },
      paragraphs: [
        {
          en: 'A friend mentioned a remote developer course. Five and a half months, 798 hours, the basics. No diploma at the end, just the urge to keep going.',
          fr: 'Un ami m’a parlé d’une formation de développeur à distance. Cinq mois et demi, 798 heures, les bases. Pas de diplôme à la sortie, juste l’envie de continuer.'
        }
      ],
      state: 'closed',
      title: { en: 'O’Clock', fr: 'O’Clock' },
      where: {
        en: 'Remote course · 798 hours',
        fr: 'Formation à distance · 798 heures'
      }
    },
    {
      mark: { en: '18 months', fr: '18 mois' },
      paragraphs: [
        {
          en: 'Shelves in the morning, code all afternoon. The apps of my first portfolio were built that way.',
          fr: 'Les rayons le matin, le code tout l’après-midi. Les applis de mon premier portfolio sont nées comme ça.'
        }
      ],
      state: 'closed',
      title: { en: 'Super U', fr: 'Super U' },
      where: {
        en: 'Shelving, 5 a.m. to 1 p.m.',
        fr: 'Mise en rayon, de 5 h à 13 h'
      }
    },
    {
      mark: { en: 'Since March 2023', fr: 'Depuis mars 2023' },
      paragraphs: [
        {
          en: 'Hired in Nantes in March 2023. Today I am the only developer on a multi-screen platform in production.',
          fr: 'Embauché à Nantes en mars 2023. Aujourd’hui, je suis le seul développeur d’une plateforme multi-écrans en production.'
        },
        {
          en: 'I also mentor the junior developers and apprentices who come through.',
          fr: 'J’accompagne aussi les développeurs juniors et les alternants de passage.'
        }
      ],
      state: 'current',
      title: { en: 'Full-stack developer', fr: 'Développeur full-stack' },
      where: { en: 'In production · Nantes', fr: 'En production · Nantes' }
    }
  ]
}
