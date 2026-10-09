import { defineDictionary, defineTranslation } from '@adrienlcp/i18n'

export const EN_DICTIONARY = defineDictionary({
  about: {
    after: {
      allProjects: 'All projects',
      bridge:
        'The evenings still go to code. Every app was born from a real need.',
      off: 'Off the clock: cinema, and table tennis.',
      title: 'Where the evenings go'
    },
    lead: 'I did not come in through a school. I came in through a stockroom, a supermarket at 5 a.m. and a remote course. Here is the road, one step at a time.',
    path: {
      title: 'The road so far'
    }
  },
  common: {
    github: 'GitHub',
    linkedin: 'LinkedIn'
  },
  contact: {
    copied: 'Address copied',
    copy: 'Copy the address',
    copyFailed:
      'Copy did not work here: the address is selected, copy it by hand.',
    elsewhere: {
      cv: 'Designed and plain',
      cvNote: 'One for people, one for applicant tracking systems',
      github: 'Every app and package, in the open',
      linkedin: 'The professional version of hello',
      title: 'Elsewhere'
    },
    form: {
      again: 'Write another note',
      email: 'Email',
      emailHint: 'Only used to reply to you.',
      emailInvalid:
        'This address looks incomplete: something like name@example.com.',
      emailMissing: 'An address, so I can write back.',
      failure: {
        refused:
          'The mail service turned the note down. Try again, or write to the address above.',
        unreachable:
          'The note could not leave: the connection seems down. Try again in a moment, or write to the address above.'
      },
      intro:
        'It lands in the same inbox. No account, no newsletter, just your words and an address to reply to.',
      message: 'Message',
      messageMissing: 'The message is still blank.',
      name: 'Name',
      nameMissing: 'Tell me who is writing.',
      send: 'Send the note',
      sending: 'Sending the note',
      sent: 'Thanks for writing. I read everything, and I reply from my own inbox.',
      title: 'Or leave a note here'
    },
    lead: 'A question, an idea, or just saying hello: my inbox is open.',
    standing: {
      cv: 'CV',
      lookingAfter: 'has the rest.',
      lookingBefore: 'Looking for the next team to build with. The',
      role: 'Full-stack developer based in Nantes, open to roles around Angers and in Vendée.'
    },
    write: 'Write an email'
  },
  cv: {
    download: 'Download the CV',
    downloadPlain: 'ATS version',
    email: 'Email',
    labelSeparator: ': ',
    location: 'Location',
    month: defineTranslation('{month:date}', {
      date: { month: { month: 'long', year: 'numeric' } }
    }),
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
      interests: 'Languages and interests',
      projects: 'Personal projects',
      skills: 'Skills',
      specs: 'At a glance',
      summary: 'Profile'
    },
    website: 'Website'
  },
  easterEggs: {
    blueprint: {
      leave: 'Switch the theme once more to leave the drafting table.',
      title: 'Drafting table',
      unlocked:
        'Blueprint theme unlocked: the site as it looked on the drafting table.'
    },
    console: {
      contact: 'Write to me: {url}',
      hint: 'P.S. The site hides one more project. ↑ ↑ ↓ ↓ ← → ← → B A',
      lead: 'You opened the console. That is the kind of curiosity I look for in a team, and the kind I bring to one.',
      source: 'Every line of this site is open: {url}',
      title: 'Adrien Lacourpaille · full-stack developer'
    },
    gift: {
      category: 'Single · Rick Astley',
      open: 'Open the gift',
      summary:
        'The oldest project on the list, and the only one I did not write. Released in 1987 and still in production: it never gave anyone up, never let anyone down. You found it, so it is yours.',
      title: 'Never Gonna Give You Up'
    }
  },
  error: {
    api: {
      invalid_content:
        'This content failed its own checks and cannot be shown.',
      not_found: 'Nothing lives at this address.'
    },
    note: 'Reloading the page usually sets it straight.',
    reload: 'Reload the page',
    title: 'Something broke on this page.'
  },
  footer: {
    colophon: 'Prerendered, in English and French, light and dark.',
    keeper: '© {year} Adrien Lacourpaille, in Nantes.',
    source: 'The site’s source'
  },
  header: {
    about: 'About',
    contact: 'Contact',
    cv: 'CV',
    home: 'Adrien Lacourpaille, home page',
    menu: 'Menu',
    name: 'Adrien Lacourpaille',
    navigation: 'Main',
    projects: 'Projects',
    skip: 'Skip to content'
  },
  home: {
    about: {
      more: 'The whole route',
      off: 'Off the clock: cinema, and table tennis.',
      path: 'I did not come in through a school. I spent years in logistics, between a stockroom and a supermarket at 5 a.m., before a remote course in 2021.',
      title: 'About',
      work: 'Since 2023 I have been the sole developer of a multi-screen platform in production. I care about sound architecture, from monorepos to APIs typed end to end, about accessibility and tests, and I keep my projects on the latest versions of their ecosystem.'
    },
    hero: {
      lead: 'By day, I am the sole developer of a multi-screen platform in production. By night, I build apps born from a real need.',
      openToWork: 'Open to work',
      photo: 'Portrait of Adrien Lacourpaille',
      place: 'Nantes',
      role: 'Full-stack developer'
    },
    index: {
      detail: 'Full details',
      intro:
        'Each one solves a different problem: realtime, offline, public data. Open one for the details.',
      live: 'Open live',
      play: 'Play live',
      source: 'Source',
      title: 'Projects'
    },
    mechanisms: {
      analytics: 'four apps report, one Worker writes a row',
      onRecord: 'no server, a nightly job asks what changed',
      scoreboard: 'one log per event, every screen replays it',
      seance: 'zero server, everything cached on the device',
      taverla: 'one server, a socket to every screen'
    },
    shelf: {
      documentation: 'The documentation',
      hint: 'Point at a package to read what it does.',
      lead: '{count} small TypeScript packages published on npm, each lifted out of a project once a second one needed it. Every app above installs them, down to its compiler and linter settings:',
      source: 'Source',
      title: 'The packages underneath'
    },
    title: 'Adrien Lacourpaille'
  },
  invite: {
    cvAts: 'CV · ATS',
    cvPdf: 'CV · PDF',
    note: 'I am looking for my next job. Write to me, or take the CV: a designed one, and a plain one for applicant tracking systems.',
    titleAccent: 'perhaps?',
    titleBefore: 'Your team,',
    write: 'Write to me'
  },
  locale: {
    label: 'Language'
  },
  notFound: {
    address: 'Address asked for: {path}',
    backHome: 'Back to home',
    note: 'This page does not exist, or no longer does. The link may be old, or mistyped.',
    title: 'Page not found'
  },
  project: {
    breadcrumb: 'Projects',
    code: 'Code: {title}',
    coverage: 'Coverage',
    coverageNote: 'lines run by {scope}, read {date}',
    coverageValue: '{percent}%',
    documentation: 'Documentation',
    excerpts: 'As the compiler reads it',
    excerptsLead:
      'Set the way an editor shows it: a wavy line is a build that refuses, a violet line is what the compiler works out on its own.',
    figures: 'In figures',
    highlights: 'At a glance',
    housePackages: 'House packages',
    housePackagesCount: '{count} of {total}',
    housePackagesNote: 'installed from npm',
    installs: 'House packages',
    installsLead:
      '{count} of the {total} house packages, from npm, down to the compiler and linter settings.',
    live: 'Open live',
    mechanism: 'How it works',
    neighbours: 'Other projects',
    next: 'Next project',
    packages: {
      count: 'Packages',
      countNote: 'under @adrienlcp',
      installedBy: 'Installed by',
      installedByCount: '{count} projects',
      kind: 'Library · TypeScript · npm',
      latest: 'Latest release',
      latestNote: 'to npm, with provenance',
      table: 'All {count}',
      tableLead: 'Each at its version on npm, and which project installs it.',
      thisSite: 'this site',
      toTable: 'The {count} packages',
      usedBy: 'Used by',
      usedByAll: 'every project',
      usedByAllBut: 'all but {missing}'
    },
    play: 'Play live',
    previous: 'Previous project',
    refusal: 'Refused by the compiler',
    result: 'Worked out by the compiler',
    source: 'Source',
    stack: 'Stack',
    verdict: {
      compiles: 'Compiles',
      errors: '{count} errors',
      label: '{verdict}: {errors}',
      noErrors: '0 errors',
      oneError: '1 error',
      refused: 'Refused'
    }
  },
  theme: {
    dark: 'Dark',
    label: 'Theme',
    light: 'Light',
    system: 'Auto'
  },
  ui: {
    close: 'Close',
    newTab: '(opens in a new tab)'
  }
})
