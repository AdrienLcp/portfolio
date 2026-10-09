import type { ProjectText } from '@/features/projects/project'

/** The English words of every project, by slug. */
export const PROJECTS_TEXT_EN = {
  analytics: {
    coverageScope: 'the tests run outside the Worker',
    highlights: [
      'No cookie, no IP, no user agent, no fingerprint and no hash stored: a row holds a path, a referrer host, a country, a locale, a theme and a device class.',
      'No consent banner, because there is nothing to consent to.',
      'A page view reached from another page of the same site continues a visit; anything else starts one.',
      'tracker.js weighs under 1 kB gzipped, follows single-page navigation, and never runs on localhost or in an automated browser.',
      'Adding ?analytics=off to a URL stops counting that browser.'
    ],
    keyFacts: [
      'No cookie, no IP, no user agent and no fingerprint stored.',
      'tracker.js weighs under 1 kB gzipped and follows single-page navigation.',
      'Four sites send their visits; one Worker writes one row.'
    ],
    releaseCategory: 'analytics · public dashboard',
    screenshotAlt:
      'Analytics’ public dashboard: page views and visits to this portfolio',
    summary:
      'Hono on Cloudflare Workers, D1 and Core Web Vitals, with a public dashboard. A row holds a path, a referrer host, a country, a locale, a theme and a device class, and there is no consent banner because there is nothing to consent to.',
    tagline: 'Cookie-free analytics that cannot tell two visitors apart.'
  },
  arbor: {
    coverageScope: 'the genealogy core, the Worker and the screens',
    highlights: [
      'One person creates the family and shares a link; every relative can then add people, fix a date, attach a photo or record a wedding from a phone. No account, no password, nothing to install.',
      'Real families, not a binary tree: successive unions and their end, adoption and step-parents, half-siblings, unknown parents and approximate dates such as “around 1880”.',
      'Every edit is an entry in the family’s change log, signed by whoever made it: any edit can be undone, deletions go to a bin, and the keeper can restore the tree as it stood at any moment.',
      'The tree prints as a vector PDF, on one sheet or tiled across several, with a QR code back to the live tree, so it is reprinted only when someone wants paper.',
      '“How are we related?” between any two people, named the way the family says it, in plain French: a second cousin, a great-uncle by marriage.',
      'Each family is its own Durable Object with its own SQLite: a family link only ever reaches its own data, and the whole thing runs on Cloudflare’s free plan.'
    ],
    keyFacts: [
      'A link, not an account: the whole family edits one tree from their phones.',
      'Nothing is ever lost: every edit can be undone, any past state restored.',
      'Prints on paper with a QR code back to the live tree.'
    ],
    releaseCategory: 'shared family tree · link-based, printable',
    screenshotAlt:
      'Arbor showing a fictional family’s whole tree, five generations with unions, an adoption and unknown parents',
    summary:
      'A family tree the whole family keeps up to date together, made for a father who kept his in an old desktop program and reprinted it after every birth or separation. A shared link replaces the reprint: relatives fix the tree from their phones, every change can be undone, and the paper version prints with a QR code back to the live one.',
    tagline: 'The family tree the whole family keeps up to date, from a link.'
  },
  'on-record': {
    coverageScope: 'the ingest, web and protocol tests',
    highlights: [
      'Every public vote of every deputy, with the group they sat in on the day of the vote. No ranking and no score: every figure links to the votes it counts, and every page cites its official source.',
      'No server and no database: a nightly GitHub Actions job asks the Assemblée’s open data whether anything changed, rebuilds only what did and deploys. A night without a new vote downloads nothing and deploys nothing.',
      'The host publishes 20,000 files per deployment, and there are over 8,000 votes: they ship in blocks, one file per deputy, small indexes for lists and search, and the build checks its whole output against a budget.',
      'About 750 pages prerendered by the very loaders the browser runs, a fake fetch answering their data during the build, each with its own head tags and a place in the sitemap.',
      'Find your deputy from your commune or your address, in French, light and dark.'
    ],
    keyFacts: [
      'No server and no database: a nightly job asks the open data what changed, and rebuilds only that.',
      'About 750 pages prerendered by the very loaders the browser runs.',
      'Over 8,000 votes split to fit the host’s file budget.'
    ],
    releaseCategory: 'public record · live',
    screenshotAlt:
      'on-record’s home: which parties voted the way you would have',
    summary:
      'How French deputies actually vote, vote by vote. Every public vote of the Assemblée nationale, explained in plain French for readers who never followed a session, each figure traced back to the official record.',
    tagline:
      'What French deputies actually do, on the record, not what they say.'
  },
  packages: {
    coverageScope: 'the tests of every package',
    highlights: [
      'The French dictionary is typed against the English one, down to each placeholder: a missing key or a {nom} written for {name} fails the build instead of showing on screen.',
      'Every rule it enforces is a compile error, so those tests are written as types and checked by tsc.',
      'browser copies to the clipboard even over plain HTTP, where the Clipboard API does not exist.',
      'Released with Changesets and published from GitHub Actions with npm provenance, never from a laptop.',
      'This site, Taverla, Séance and on-record install them from npm, down to their TypeScript and Biome configs.'
    ],
    keyFacts: [
      'No third-party dependency at runtime.',
      'Published from GitHub Actions with npm provenance, never from a laptop.',
      'Every app installs them, down to its compiler and linter settings.'
    ],
    sampleNotes: {
      '@adrienlcp/i18n': [
        'A message’s arguments are read off the message itself: leave out {name} and the call does not compile. No code generation, no build plugin.'
      ],
      '@adrienlcp/result': [
        'Result fits in thirty lines. A success that carries nothing has no data key at all, so nobody reads undefined off it.'
      ],
      '@adrienlcp/safe-storage': [
        'Safari’s private window once threw on every localStorage write; safe-storage returns a Result there instead, as for a full quota or a value an older version stored.'
      ],
      '@adrienlcp/theme-preference': [
        'A phone paints its toolbar from the theme-color tags, which follow the system, not the visitor. The theme package rewrites their media query before the first paint, so a dark choice on a light phone gets a dark toolbar too.'
      ]
    },
    screenshotAlt: 'The packages’ documentation site',
    summary:
      'Small TypeScript packages with no third-party runtime dependency, published on npm, each lifted out of a project once a second one needed it. One translates, and knows at compile time what each message asks for; one says whether something worked, without throwing and without null; the others keep the chosen theme from flashing, take the throw out of localStorage and the clipboard, and share the reset, the focus ring and the compiler and linter settings every project starts from.',
    tagline:
      'The npm packages under this site, Taverla, Séance and on-record, typed as far as the compiler goes.'
  },
  pastime: {
    coverageScope: 'the engines’ and the app’s unit tests',
    highlights: [
      'Four games in one app: Stars, Pipes, Klondike solitaire and Color Dots. No ads, no account, nothing to download after the first visit.',
      'Every level is generated on the phone and checked before it is shown: a logical solver proves each Stars and Pipes grid has one solution reachable without a guess, and a solitaire deal ships only once a solver has won it.',
      'Color Dots levels are built backwards from the solved board, so the way back is a guaranteed win, replayed once more before the level ships.',
      'A puzzle is named by its game, variant and number and seeded from that name: the daily puzzle is the same on every phone, with no server to agree on it.',
      'Generators run in a Web Worker, and one that gives up is retried from a seed derived from the first, so a retried daily is still everyone’s daily.'
    ],
    keyFacts: [
      'Every level is checked by a solver before it is shown: no guess, no unwinnable deal.',
      'The daily puzzle is the same on every phone, with no server.',
      'Installable and fully offline, saves kept on the device.'
    ],
    releaseCategory: 'puzzles and solitaire · installable, offline',
    screenshotAlt:
      'Pastime on three phones: the contents page, a Pipes board and a solitaire deal',
    summary:
      'Small solo puzzle and card games, printed as a puzzle book, without the ads of the apps that usually carry them. Every level is generated on the phone and proved solvable before it is shown, and the whole app installs and runs offline.',
    tagline: 'A puzzle book with no ads, every level proved solvable.'
  },
  scoreboard: {
    coverageScope: 'the scoring rules, the Worker and the screens',
    highlights: [
      'Each umpire scores their own match from whatever device is at hand, and every match in progress shows up on one big screen across the hall.',
      'One Durable Object per event keeps the ordered scoring events in its own SQLite storage and fans them out over WebSocket.',
      'Points scored while offline are queued and resent on reconnect, and a mistake is undone in one tap.',
      'Scores, the server and timings are all derived from the events, so the organiser can fix a wrong score or move a match to another table live.',
      'Table tennis is the first ruleset; the scoring rules are pluggable so other sports can follow.'
    ],
    keyFacts: [
      'One Durable Object per event keeps the scoring and fans it out over WebSocket.',
      'Points scored offline wait in a queue and resend on reconnect.',
      'Score, server and timings all derive from the events, so a mistake is fixed live.'
    ],
    releaseCategory: 'live scoring · club hall',
    screenshotAlt: 'Scoreboard’s home: create or join a match',
    summary:
      'A live scoreboard for sports clubs running several tables at once. Four screens in the browser — the big screen, the umpire console, the organiser console and the spectator view — share one Durable Object per event on Cloudflare’s free tier, with nothing to install.',
    tagline:
      'Every table’s score on one big screen, live, scored from any phone.'
  },
  seance: {
    coverageScope: 'the app’s unit tests',
    highlights: [
      'Installable and fully offline: a hand-written Workbox service worker precaches the whole shell, and every route is served with the network cut, mid-session included.',
      'Reminders without a server: an in-app clock, Notification Triggers where they exist, and Periodic Background Sync reading the schedule from IndexedDB in the worker — and the settings screen says plainly what this browser can do.',
      'Progress charts drawn by hand in SVG and HTML: regularity counted in weeks, volume per week, waist and weight never on a shared axis, each walkable with an invisible native range input and backed by a table.',
      'Every number stays on the device: a JSON backup carries it elsewhere, and a seeded specimen profile shows the charts full without ever touching the reader’s own data.',
      'Thirty-seven animated figures drawn from joints, not paths: interpolation is polar and chained from the hip, so no bone stretches mid-movement.'
    ],
    keyFacts: [
      'Installable and fully offline, with a hand-written service worker.',
      'Reminders without a server, and a screen that says plainly what this browser can do.',
      'Every number stays on the device; a JSON backup carries it elsewhere.'
    ],
    releaseCategory: 'training · installable, offline',
    screenshotAlt: 'Séance: the progress charts of a specimen profile',
    summary:
      'A bodyweight training programme drawn as a gymnastics manual, one plate per movement. It guides a thirty-minute session, keeps a journal and draws the progress curves — installable, offline, with reminders, and with every number kept on the device.',
    tagline:
      'A training manual that works offline and remembers everything, on the device alone.'
  },
  taverla: {
    coverageScope: 'the server and game-rule tests',
    highlights: [
      'Five games on one shelf: blind test, quiz, L’Ardoise, Réflexe and buzzer.',
      'One room, one QR code: everyone joins from the phone they already hold.',
      'The server stamps every buzz, so the fastest hand wins, not the fastest clock.',
      'Tested end to end: real sockets against a real server, Playwright journeys across two screens.',
      'English and French, light and dark, on a phone or a laptop.'
    ],
    keyFacts: [
      'One server, one WebSocket to every screen.',
      'The server stamps every buzz: the fastest hand wins, not the fastest clock.',
      'Tested end to end: real sockets, Playwright journeys across two screens.'
    ],
    releaseCategory: 'party games · live',
    screenshotAlt: 'Taverla’s home: open a table, and five games to pick from',
    summary:
      'A shelf of party games sharing one room, one QR code and one set of screens. One screen runs the game, everyone else plays on whatever they have to hand, and the first to know it takes the round.',
    tagline: 'Party games on every phone in the room, on the same instant.'
  }
} satisfies Record<string, ProjectText>
