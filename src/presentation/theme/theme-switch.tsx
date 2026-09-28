import type React from 'react'

import { ChoiceRail } from '@/presentation/components/ui/rail'
import { useTranslate } from '@/presentation/i18n/i18n-provider'

import { THEME_CHOICES, useThemeChoice } from './use-theme-choice'

export const ThemeSwitch: React.FC = () => {
  const translate = useTranslate()
  const { choice, choose } = useThemeChoice()

  return (
    <ChoiceRail
      aria-label={translate('theme.label')}
      className='theme-switch'
      items={THEME_CHOICES.map((themeChoice) => ({
        id: themeChoice,
        label: translate(`theme.${themeChoice}`)
      }))}
      onSelect={choose}
      selectedId={choice}
    />
  )
}
