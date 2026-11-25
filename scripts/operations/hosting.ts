/** Where this site is hosted. docs/operations/hosting.md describes each piece. */
export const HOSTING = {
  cloudflareAccountId: '431a529079f2d76802b95056e39950f0',
  /** The `adrienlcp.com` zone, home of every personal project. */
  cloudflareZoneId: '7287a21bea71667f9344cb4f80087729',
  githubRepository: 'AdrienLcp/portfolio',
  pagesHost: 'portfolio-9qi.pages.dev',
  /** Connected to the repository: Cloudflare builds and deploys each push itself. */
  pagesProject: 'portfolio',
  publicDomain: 'adrienlcp.com'
} as const
