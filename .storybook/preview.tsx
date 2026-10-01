import {
  applyThemePreference,
  isThemePreference
} from '@adrienlcp/theme-preference'
import type { Decorator, Preview } from '@storybook/react-vite'
import { useEffect } from 'react'
import { RouterProvider } from 'react-aria-components'

import { ToastRegion } from '@/presentation/components/ui/toast'
import { I18nProvider } from '@/presentation/i18n/i18n-provider'
import { isLocale } from '@/presentation/i18n/locale'

import '@/presentation/styles/globals.sass'
import './preview.sass'

/**
 * The toolbar paints the document without touching the stored preference, so
 * a story never leaves a choice behind for the next one.
 */
const withTheme: Decorator = (Story, { globals }) => {
  const theme = String(globals.theme)

  useEffect(() => {
    applyThemePreference(isThemePreference(theme) ? theme : 'system')
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

const stayInPreviewFrame = () => undefined

/** A story is not the app: a link press must not reload the preview frame. */
const withRouter: Decorator = (Story) => (
  <RouterProvider navigate={stayInPreviewFrame}>
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
          { title: 'Auto', value: 'system' },
          { title: 'Day', value: 'light' },
          { title: 'Night', value: 'dark' }
        ]
      }
    }
  },
  initialGlobals: {
    locale: 'en',
    theme: 'system'
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
