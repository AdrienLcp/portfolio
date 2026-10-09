/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module 'react' {
  interface CSSProperties {
    [customProperty: `--${string}`]: string | number | undefined
  }
}

export {}
