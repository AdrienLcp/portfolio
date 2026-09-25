import { defineDictionary } from '@adrienlcp/i18n/dictionary'

export const EN_DICTIONARY = defineDictionary({
  error: {
    reload: 'Reload the page',
    title: 'Something broke on this page.'
  },
  home: {
    otherLocale: 'Version française',
    status: 'Portfolio under construction.',
    title: 'Adrien Lacourpaille'
  },
  notFound: {
    backHome: 'Back to the home page',
    message: 'No page lives at {path}.'
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
