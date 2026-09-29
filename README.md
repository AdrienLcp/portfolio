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
  rewrites them per document. Every rewritten tag must match exactly once, so a
  tag edited out of `index.html` fails the build.
- **The cascade layer order is declared in `index.html`**, and again in
  `.storybook/preview-head.html`. A layer's position is fixed where its name
  first appears, and Vite injects stylesheets in module-graph order: declared in
  a stylesheet, the order would depend on which component was imported first.

## Tooling

- **Supply chain.** `minimumReleaseAge` in `pnpm-workspace.yaml` keeps pnpm from
  installing a release younger than a day: most hijacked npm versions are pulled
  within hours.
- **Pre-commit hook.** `.githooks/pre-commit` runs `biome check --write` on the
  staged files and stages what it repaired; `pnpm install` points
  `core.hooksPath` at it. It runs in batches because Windows caps a command line
  at about 8 KB, well below what `xargs` assumes.
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
