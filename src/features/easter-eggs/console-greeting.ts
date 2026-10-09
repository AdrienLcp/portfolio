import { contactPathFor } from '@/infrastructure/router/navigation'
import { i18n } from '@/presentation/i18n/i18n'
import type { Locale } from '@/presentation/i18n/locale'

const SOURCE_URL = 'https://github.com/AdrienLcp/portfolio'

/** The site's violet and paper, which read on a light console and a dark one. */
const TITLE_STYLE =
  'background: #4b2fd6; color: #f7f8fa; font: 800 1.6rem "Sofia Sans Condensed", system-ui, sans-serif; padding: 0.3rem 0.7rem'
const LINE_STYLE = 'font: 500 0.95rem "Sofia Sans", system-ui, sans-serif'
const HINT_STYLE = `${LINE_STYLE}; font-style: italic; opacity: 0.75`

/** A word for whoever opens the developer tools: the reader this site is for. */
export const greetDevelopersInConsole = (locale: Locale): void => {
  const translate = i18n.translator(locale)
  const contactUrl = new URL(contactPathFor(locale), location.origin).href
  const lines = [
    translate('easterEggs.console.lead'),
    '',
    translate('easterEggs.console.contact', { url: contactUrl }),
    translate('easterEggs.console.source', { url: SOURCE_URL })
  ]

  console.info(`%c${translate('easterEggs.console.title')}`, TITLE_STYLE)
  console.info(`%c${lines.join('\n')}`, LINE_STYLE)
  console.info(`%c${translate('easterEggs.console.hint')}`, HINT_STYLE)
}
