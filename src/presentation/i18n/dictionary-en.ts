import { defineDictionary } from '@adrienlcp/i18n/dictionary'

export const EN_DICTIONARY = defineDictionary({
  cv: {
    download: 'Download the CV',
    downloadPlain: 'ATS version',
    email: 'Email',
    phone: 'Phone',
    photo: 'Adrien Lacourpaille, smiling, in a dark shirt',
    plainNote:
      'The ATS version is the same CV in one plain column, for recruitment software.',
    present: 'present',
    sections: {
      contact: 'Contact',
      education: 'Education',
      experience: 'Experience',
      extras: 'More',
      projects: 'Personal projects',
      skills: 'Skills',
      specs: 'At a glance',
      summary: 'Profile'
    },
    website: 'Website'
  },
  error: {
    api: {
      invalid_content:
        'This content failed its own checks and cannot be shown.',
      not_found: 'Nothing lives at this address.'
    },
    note: 'Reloading usually puts every piece back in its place.',
    reload: 'Reload the page',
    title: 'Something broke on this page.'
  },
  footer: {
    colophon: 'Adrien Lacourpaille, {year}. Printed in petrol and tomato.'
  },
  header: {
    cv: 'CV',
    home: 'Adrien Lacourpaille, home page',
    navigation: 'Main',
    otherLocale: 'Français',
    projects: 'Projects'
  },
  home: {
    closeLid: 'Close the lid',
    contents: {
      flash: {
        description:
          'Empty slot, on purpose: the right theme is set before the first paint.',
        title: 'Flash on load'
      },
      games: {
        blindTest: 'Blind test',
        buzzer: 'Buzzer',
        description:
          'One shelf sharing one room, one QR code and every screen in it.',
        open: 'Read the rules of {name}',
        quiz: 'Quiz',
        title: 'Party games'
      },
      hover: {
        description:
          'Kept for real pointers: nothing stays stuck after a tap on a phone.',
        title: 'Honest hover'
      },
      languages: {
        description: 'English and French, served by @adrienlcp/i18n.',
        title: 'Languages'
      },
      lead: 'Everything is in its place, nothing is missing. Check before the first game.',
      lint: {
        description: 'Custom rules and a shared toolkit of conventions.',
        title: 'Set of lint rules'
      },
      packages: {
        description: 'Written for my own projects, reused in each of them.',
        title: 'House packages'
      },
      primitives: {
        description:
          'Built on react-aria: keyboard, screen readers, visible focus.',
        title: 'Set of accessible primitives'
      },
      server: {
        description:
          'Hono and WebSocket: the room, the rounds, and who buzzed first.',
        title: 'Realtime server'
      },
      themes: {
        description:
          'Day and night, following your system or your pick on the rail.',
        title: 'Themes'
      },
      title: 'Contents of the box'
    },
    openBox: 'Open the box',
    role: 'Full-stack developer. I ship finished things, from the socket to the last hover.',
    title: 'Adrien Lacourpaille'
  },
  notFound: {
    backHome: 'Back to the home page',
    message: 'No page lives at {path}.',
    note: 'This piece is not in the box.'
  },
  project: {
    allProjects: 'All projects',
    highlights: 'In the box',
    live: 'Play it',
    repository: 'Read the code',
    stack: 'Stack'
  },
  projects: {
    lead: 'Finished games only, down to the last piece.',
    open: 'Read the rules of {name}',
    title: 'Projects'
  },
  theme: {
    auto: 'Auto',
    dark: 'Night',
    label: 'Theme',
    light: 'Day'
  },
  ui: {
    close: 'Close',
    newTab: '(opens in a new tab)'
  }
})
