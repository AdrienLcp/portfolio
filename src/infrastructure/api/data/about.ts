import type { z } from 'zod'

import type { aboutSchema } from '@/features/about/about'

export const ABOUT: z.input<typeof aboutSchema> = {
  steps: [
    {
      mark: { en: 'As a teen', fr: 'Ado' },
      text: {
        en: 'My first HTML tags and my first lines of CSS, on the Site du Zéro, the French school of self-taught coders. Then nothing for years: I was busy growing up.',
        fr: 'Mes premières balises HTML et mes premières lignes de CSS, sur le Site du Zéro. Puis plus rien pendant des années : j’étais occupé à grandir.'
      },
      title: { en: 'Site du Zéro', fr: 'Site du Zéro' }
    },
    {
      mark: { en: '6 years', fr: '6 ans' },
      text: {
        en: 'Receiving and shelving at a seller of motorbike and scooter parts. Six years of putting every part in its place, which turns out to be decent training for software architecture.',
        fr: 'Réception et mise en rayon chez un vendeur de pièces pour deux-roues. Six ans à ranger chaque pièce à sa place, ce qui reste une assez bonne école d’architecture logicielle.'
      },
      title: { en: 'P2R', fr: 'P2R' }
    },
    {
      mark: { en: '2021', fr: '2021' },
      text: {
        en: 'A friend tells me about a remote developer course. Five and a half months, 798 hours, the basics. No diploma at the end, just the urge to keep going.',
        fr: 'Un ami me parle d’une formation de développeur à distance. Cinq mois et demi, 798 heures, les bases. Pas de diplôme à la sortie, juste l’envie de continuer.'
      },
      title: { en: 'O’Clock', fr: 'O’Clock' }
    },
    {
      mark: { en: '18 months', fr: '1 an et demi' },
      text: {
        en: 'Shelving from 5 a.m. to 1 p.m., coding all afternoon. The apps of my first portfolio were built that way, between alarms set before dawn.',
        fr: 'Mise en rayon de 5 h à 13 h, code tout l’après-midi. Les applis de mon premier portfolio sont nées comme ça, entre deux réveils avant l’aube.'
      },
      title: { en: 'Super U', fr: 'Super U' }
    },
    {
      mark: { en: 'Since 2023', fr: 'Depuis 2023' },
      text: {
        en: 'Hired in Nantes in March 2023. Today I am the only developer on a multi-screen platform in production, and I mentor junior developers and apprentices.',
        fr: 'Embauché à Nantes en mars 2023. Aujourd’hui, je suis le seul développeur d’une plateforme multi-écrans en production, et j’accompagne des développeurs juniors et des alternants.'
      },
      title: { en: 'Full-stack developer', fr: 'Développeur full-stack' }
    }
  ]
}
