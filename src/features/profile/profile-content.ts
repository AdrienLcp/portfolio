import type { z } from 'zod'

import type { profileSchema } from '@/features/profile/profile'

export const PROFILE: z.input<typeof profileSchema> = {
  links: {
    github: 'https://github.com/AdrienLcp',
    linkedin: 'https://www.linkedin.com/in/adrien-lacourpaille/'
  },
  name: 'Adrien Lacourpaille',
  role: {
    en: 'Full-stack developer',
    fr: 'Développeur full-stack'
  }
}
