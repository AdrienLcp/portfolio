import { defineDictionary } from '@adrienlcp/i18n'

export const EN_DICTIONARY = defineDictionary({
  about: {
    credit: 'A game by Adrien Lacourpaille.',
    lead: 'I spent six years putting spare parts in their place. Now I do it with code.',
    path: 'How I got here',
    seeProjects: 'See the projects',
    title: 'About',
    toolbox: 'The toolbox',
    writeToMe: 'Write to me'
  },
  common: {
    github: 'GitHub',
    linkedin: 'LinkedIn'
  },
  contact: {
    copied: 'Address copied',
    copy: 'Copy the address',
    elsewhere: 'Elsewhere',
    form: {
      again: 'Write another',
      email: 'Your email',
      emailHint: 'Only used to reply to you.',
      emailInvalid:
        'This address looks incomplete: something like name@example.com.',
      emailMissing: 'An address, so I can write back.',
      failure: {
        refused:
          'The mail service turned the card down. Try again, or write to the address above.',
        unreachable:
          'The card could not leave: the connection seems down. Try again in a moment, or write to the address above.'
      },
      message: 'Your message',
      messageMissing: 'The card is still blank.',
      name: 'Your name',
      nameMissing: 'Tell me who is writing.',
      posted: 'Posted',
      postedNote:
        'Thanks for writing. I read everything, and I reply from my own inbox.',
      send: 'Send the card',
      sending: 'Sending the card',
      title: 'Or fill in the reply card'
    },
    lead: 'A question, an idea, or just saying hello: my inbox is open.',
    title: 'Contact',
    write: 'Write an email'
  },
  cv: {
    download: 'Download the CV',
    downloadPlain: 'ATS version',
    email: 'Email',
    labelSeparator: ': ',
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
    about: 'About',
    contact: 'Contact',
    cv: 'CV',
    home: 'Adrien Lacourpaille, home page',
    menu: 'Menu',
    navigation: 'Main',
    projects: 'Projects',
    skip: 'Skip to content'
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
        quiz: 'Quiz',
        title: 'Party games'
      },
      hover: {
        description:
          'Kept for real pointers: nothing stays stuck after a tap on a phone.',
        title: 'Honest hover'
      },
      languages: {
        description:
          'English and French, served by @adrienlcp/i18n, my own take on Web Dev Simplified’s approach.',
        title: 'Languages'
      },
      lead: 'Everything is in its place, nothing is missing. Check before the first game.',
      lint: {
        description: 'Custom rules and a shared toolkit of conventions.',
        title: 'Set of lint rules'
      },
      packages: {
        description: 'Written for my own projects, reused in each of them.',
        open: 'Read their rules',
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
    role: 'Full-stack developer in Nantes. Websites, APIs, party games.',
    title: 'Adrien Lacourpaille'
  },
  locale: {
    label: 'Language'
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
    package: '{name} on npm',
    repository: 'Read the code',
    samples: 'How it plays',
    stack: 'Stack'
  },
  projects: {
    lead: 'What I code in the evening, once the workday is done.',
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
