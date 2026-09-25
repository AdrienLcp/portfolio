import type { Decorator, Preview } from '@storybook/react-vite'
import { useEffect } from 'react'

import { RouterProvider } from '@/presentation/components/ui/router-provider'
import { ToastRegion } from '@/presentation/components/ui/toast'
import { I18nProvider } from '@/presentation/i18n/i18n-provider'
import { isLocale } from '@/presentation/i18n/locale'
import { isTheme } from '@/presentation/theme/theme'

import '@/presentation/styles/globals.sass'
import './preview.sass'

/**
 * The toolbar's theme stamps `data-theme` the way the pre-paint script does,
 * and `auto` removes it so the stylesheet follows the system again.
 */
const withTheme: Decorator = (Story, { globals }) => {
  const theme = String(globals.theme)

  useEffect(() => {
    if (isTheme(theme)) {
      document.documentElement.dataset.theme = theme
      return
    }

    delete document.documentElement.dataset.theme
  }, [theme])

  return <Story />
}

const withLocale: Decorator = (Story, { globals }) => {
  const locale = String(globals.locale)

  return (
    <I18nProvider key={locale} locale={isLocale(locale) ? locale : 'en'}>
      <Story />
      <ToastRegion />
    </I18nProvider>
  )
}

/** A story is not the app: a link press must not reload the preview frame. */
const withRouter: Decorator = (Story) => (
  <RouterProvider navigate={() => undefined}>
    <Story />
  </RouterProvider>
)

const preview: Preview = {
  decorators: [withRouter, withLocale, withTheme],
  globalTypes: {
    locale: {
      description: 'Locale',
      toolbar: {
        dynamicTitle: true,
        icon: 'globe',
        items: [
          { title: 'English', value: 'en' },
          { title: 'Français', value: 'fr' }
        ]
      }
    },
    theme: {
      description: 'Theme',
      toolbar: {
        dynamicTitle: true,
        icon: 'contrast',
        items: [
          { title: 'Auto', value: 'auto' },
          { title: 'Day', value: 'light' },
          { title: 'Night', value: 'dark' }
        ]
      }
    }
  },
  initialGlobals: {
    locale: 'en',
    theme: 'auto'
  },
  parameters: {
    a11y: { test: 'error' },
    backgrounds: { disable: true },
    layout: 'padded',
    options: {
      storySort: {
        order: ['Foundations', 'Components']
      }
    }
  }
}

export default preview
