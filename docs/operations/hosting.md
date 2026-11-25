# Hosting

| Piece           | Provider                              | Identifier (`scripts/operations/hosting.ts`)                                                       |
| --------------- | ------------------------------------- | -------------------------------------------------------------------------------------------------- |
| The site        | Cloudflare Pages, account `431a5290…` | project `portfolio`, host `portfolio-9qi.pages.dev`, connected to `AdrienLcp/portfolio`            |
| Its address     | Cloudflare DNS, zone `adrienlcp.com`  | the apex `adrienlcp.com`, a custom domain of the Pages project                                     |
| The other hosts | Cloudflare, zone `adrienlcp.com`      | `www.adrienlcp.com`, `http://` and `portfolio-9qi.pages.dev` answer 301 to `https://adrienlcp.com` |

Everything here is set in the Cloudflare dashboard, not in this repository:
no script creates or changes it.

## The build

The Pages project is connected to the repository (Git integration), so
Cloudflare clones each push and builds it:

- **Command** `pnpm build:pages` — `pnpm build` (type-check, client, server
  entry, prerender), then Storybook into `dist/storybook`, served at
  https://adrienlcp.com/storybook/.
- **Output** `dist`, with `public/_headers` and `public/_redirects` copied in
  by Vite.
- **Production branch** `main`; every other branch gets a preview on
  `<branch>.portfolio-9qi.pages.dev`.
- **Node** from `.nvmrc`.

The settings live under _Workers & Pages → portfolio → Settings → Build_.

`public/_headers` keeps the `pages.dev` hosts out of search engines
(`X-Robots-Tag: noindex`); keep them in step with the project's host.

## Recreate it

Only if the project is deleted. A Pages project is created connected to Git or
as a direct upload, and never switched afterwards: recreate it connected.

1. Dashboard → _Workers & Pages → Create → Pages → Connect to Git_,
   repository `AdrienLcp/portfolio`, project name `portfolio`, production
   branch `main`, build command `pnpm build:pages`, output directory `dist`.
2. Cloudflare may hand out a host with another suffix than `-9qi`: put it in
   `scripts/operations/hosting.ts` and in `public/_headers`, in place of
   `portfolio-9qi.pages.dev`.
3. _Custom domains_ → add `adrienlcp.com`; Cloudflare writes the DNS record.
4. Restore the 301s of `www.adrienlcp.com` and of the `pages.dev` host to
   `https://adrienlcp.com` in the zone's redirect rules.

## Common errors

| Symptom                                       | Fix                                                                                                                                                         |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A push builds nothing                         | The Cloudflare GitHub app lost access to the repository: GitHub → _Settings → Applications → Cloudflare Workers and Pages → Configure_, grant `portfolio`.  |
| The site answers `522` or a certificate error | The certificate is not issued yet: wait ten minutes. Still failing: dashboard → _Workers & Pages → portfolio → Custom domains_, and follow what it reports. |
