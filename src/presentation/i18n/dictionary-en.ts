import { defineDictionary } from '@adrienlcp/i18n'

import { DRAWINGS_EN } from './drawings-en'

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
    colophon: '{year}. Set in Sofia Sans; every screen is drawn, not captured.',
    keeper: 'Adrien Lacourpaille · Nantes'
  },
  header: {
    about: 'About',
    contact: 'Contact',
    cv: 'CV',
    home: 'Adrien Lacourpaille, home page',
    menu: 'Menu',
    name: 'Adrien Lacourpaille',
    navigation: 'Main',
    register: 'Register',
    skip: 'Skip to content'
  },
  home: {
    about: {
      after:
        'of a multi-screen platform in production. I care about sound architecture, from monorepos to APIs typed end to end, about accessibility and tests, and I keep my projects on the latest versions of their ecosystem.',
      before: 'Since 2023 I have been, at work, the',
      emphasis: 'sole developer',
      title: 'About'
    },
    drawings: DRAWINGS_EN,
    entry: {
      close: 'Close entry',
      countsFrom: 'Counts page views from',
      drawn: 'Drawn for this register, not a screenshot',
      entered: 'Entered',
      full: 'Full entry',
      installs: 'Installs',
      installsAll: 'all {total} house packages',
      installsAllBut: '{count} house packages, all but {missing}',
      installsSome: '{count} house packages',
      mechanism: 'Mechanism',
      open: 'Open entry',
      openApp: 'Open live',
      openGame: 'Play live',
      pageViewsTo: 'Page views go to',
      shipped: 'What shipped',
      source: 'Source'
    },
    head: {
      inProgress: 'in progress',
      keptSince: 'Kept since',
      lastEntry: 'Last entry',
      lead: 'What I code in the evening, once the workday is done, one dated row each:',
      leadAfter: 'I am looking for my next job.',
      leadSoft: 'the apps first, then the packages they share.',
      openToWork: 'Open to work',
      packages: 'packages',
      place: 'Nantes',
      released: 'apps released',
      role: 'Full-stack developer'
    },
    mechanisms: {
      analytics: 'three apps report, one Worker writes a row',
      onRecord: 'no server, a nightly job asks what changed',
      seance: 'zero server, everything cached on the device',
      taverla: 'one server, a socket to every screen'
    },
    next: {
      cvAts: 'CV · ATS',
      cvPdf: 'CV · PDF',
      line: 'Your team,',
      note: 'I am looking for my next job. Write to me, or take the CV: a designed one, and a plain one for applicant tracking systems.',
      title: 'Next entry',
      write: 'Write to me'
    },
    packages: {
      cap: '{count} packages released to npm, with provenance',
      open: 'Open the packages entry',
      package: 'Package',
      unused: 'Not used by {app}',
      used: 'Used by {app}',
      usedBy: 'used by',
      usedByAll: 'All {count} apps',
      usedByAllBut: 'All but {missing}',
      version: 'Version'
    },
    register: {
      app: 'App',
      apps: 'Apps',
      appsThenPackages: '{apps} apps, then {packages} packages',
      date: 'Date',
      drawing: 'Drawing',
      packagesBelow: 'packages below',
      state: 'State',
      title: 'Register of releases, apps then packages'
    },
    site: {
      category: 'This site · in progress',
      hosting: 'Hosting',
      hostingValue: 'Cloudflare Pages',
      lighthouse: 'Lighthouse',
      lighthouseValue: 'Gated in CI',
      locales: 'Locales',
      name: 'adrienlacourpaille.dev',
      opened: 'Opened',
      short: 'Site',
      summary:
        'The register you are reading. React 19, prerendered per locale, English and French, light and dark with no flash, accessible primitives from react-aria, and a Lighthouse score gated in CI.',
      title: 'This site'
    },
    state: {
      inProgress: 'In progress',
      live: 'Live',
      shipped: 'Shipped',
      stamp: '{state}, entered {date}'
    },
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
    above: 'Above in the register',
    below: 'Below in the register',
    breadcrumb: 'Register',
    code: 'Code: {title}',
    commits: 'Commits',
    commitsNote: 'on main, read {date}',
    entered: 'Entered',
    excerpts: 'As the compiler reads it',
    excerptsLead:
      'Set the way an editor shows it: a wavy line is a build that refuses, a violet line is what the compiler works out on its own.',
    facts: 'Entry facts',
    firstCommit: 'First commit',
    history: 'History',
    historyLead:
      'Straight from the git log, abridged: {shown} of {commits} commits, newest first.',
    housePackages: 'House packages',
    housePackagesCount: '{count} of {total}',
    housePackagesNote: 'installed from npm',
    installs: 'Installs',
    installsLead:
      '{count} of the {total} house packages, from npm, down to the compiler and linter settings.',
    mechanism: 'How it works',
    neighbours: 'Neighbouring entries',
    packages: {
      count: 'Packages',
      countNote: 'under @adrienlcp',
      installedBy: 'Installed by',
      installedByCount: '{count} apps',
      kind: 'Library · TypeScript · npm',
      kindStamp: 'Published',
      latest: 'Latest release',
      latestNote: 'to npm, with provenance',
      ledger: 'The {count}',
      ledgerLead: 'Each at its version on npm, and which app installs it.',
      toLedger: 'The {count} packages'
    },
    refusal: 'Refused by the compiler',
    result: 'Worked out by the compiler',
    shipped: 'What shipped',
    source: 'Source',
    stack: 'Stack',
    state: 'State',
    verdict: {
      compiles: 'Compiles',
      errors: '{count} errors',
      noErrors: '0 errors',
      oneError: '1 error',
      refused: 'Refused',
      stamp: '{verdict}: {errors}'
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
