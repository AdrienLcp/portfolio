# Portfolio

Adrien Lacourpaille's portfolio: a React app prerendered into one static
document per page and language. The design system is in [`DESIGN.md`](DESIGN.md),
the product brief in [`PRODUCT.md`](PRODUCT.md).

```sh
pnpm install
pnpm dev         # http://localhost:5373
pnpm validate    # everything CI runs, lighthouse aside
```

## Build

`pnpm build` type-checks, builds the client and the server entry, then runs
`scripts/prerender.ts`, which writes each page's document from `index.html`.

- **The head copy has one source.** The title, description and share-image alt
  text live in `src/presentation/head/document-head.ts`. `index.html` leaves
  them empty; the `english-home-head` Vite plugin fills in the English home
  page's for the shell `pnpm dev` and the SPA fallback serve, and the prerender
  rewrites them per document through the DOM (linkedom). Every rewritten tag
  must be found exactly once, so a tag edited out of `index.html` fails the
  build.
- **Code excerpts are highlighted at build time.** Each lives in
  `src/features/projects/excerpts/*.excerpt.ts` (left out of `tsc` and Biome:
  some are meant not to compile) and is imported with `?highlighted`; the
  `highlighted-excerpts` Vite plugin runs Shiki on it and hands the page tokens,
  so no highlighter ships to the browser.
- **The drawings' shapes are SVG files.** `src/features/app-drawings/drawings/*.svg`
  hold the shapes and the words no language changes; each component imports
  its file with `?react` (SVGR, no SVGO pass, so classes, `pathLength` and the
  `--d` draw delays survive) and adds only its translated words, painted after
  the shapes.
- **Fonts swap without moving anything.** fontaine gives each face a fallback
  face over local Arial scaled to the same metrics, so text paints at once and
  keeps its place when Sofia Sans arrives.
- **The cascade layer order is declared in `index.html`**, and again in
  `.storybook/preview-head.html`. A layer's position is fixed where its name
  first appears, and Vite injects stylesheets in module-graph order: declared in
  a stylesheet, the order would depend on which component was imported first.

## Tooling

- **Supply chain.** `minimumReleaseAge` in `pnpm-workspace.yaml` keeps pnpm from
  installing a release younger than a day: most hijacked npm versions are pulled
  within hours.
- **Lighthouse.** `pnpm lighthouse` audits every page on the built `dist`;
  `pnpm lighthouse /en /fr/about` audits those paths only, while iterating.

## Tests

- `pnpm test`: unit tests, in Node.
- `pnpm test:components`: every Storybook story rendered as a test, in
  Chromium through Playwright. react-aria reads focus, pointer events and
  layout, which a DOM emulation only approximates, so the stories run in a real
  browser. `vitest.setup.ts` sets `IS_REACT_ACT_ENVIRONMENT`: React only treats
  `act()` as a test boundary with that flag set, and warns on every mount
  otherwise.
- `pnpm test:e2e`: Playwright against the built site.
