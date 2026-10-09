import { THEME_PREFERENCES } from '@adrienlcp/theme-preference'
import { useThemePreference } from '@adrienlcp/theme-preference/react'
import type React from 'react'

import { blueprintMode } from '@/features/easter-eggs/blueprint-mode'
import { nowInMilliseconds } from '@/infrastructure/clock'
import type { IconName } from '@/presentation/components/icon'
import { ChoiceRail } from '@/presentation/components/ui/rail'
import { useTranslate } from '@/presentation/i18n/i18n-provider'

import { themeStore } from './theme-store'

const THEME_ICONS = {
  dark: 'moon',
  light: 'sun',
  system: 'monitor'
} as const satisfies Record<(typeof THEME_PREFERENCES)[number], IconName>

export const ThemeSwitch: React.FC = () => {
  const translate = useTranslate()
  const { preference, setPreference } = useThemePreference(themeStore)

  return (
    <ChoiceRail
      aria-label={translate('theme.label')}
      className='theme-switch'
      items={THEME_PREFERENCES.map((themePreference) => ({
        icon: THEME_ICONS[themePreference],
        id: themePreference,
        label: translate(`theme.${themePreference}`)
      }))}
      onSelect={(themePreference) => {
        setPreference(themePreference)
        blueprintMode.recordThemeSwitch(nowInMilliseconds())
      }}
      selectedId={preference}
    />
  )
}
