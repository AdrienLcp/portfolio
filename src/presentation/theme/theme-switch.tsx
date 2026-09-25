import type React from 'react'

import { SelectionIndicator } from '@/presentation/components/ui/selection-indicator'
import { ToggleButton } from '@/presentation/components/ui/toggle-button'
import { ToggleButtonGroup } from '@/presentation/components/ui/toggle-button-group'
import { useTranslate } from '@/presentation/i18n/i18n-provider'

import {
  isThemeChoice,
  THEME_CHOICES,
  useThemeChoice
} from './use-theme-choice'

import './theme-switch.sass'

/**
 * A three-slot rail cut into the board, with one pawn on it: the pawn sits on
 * the theme in play and slides to the next one chosen.
 */
export const ThemeSwitch: React.FC = () => {
  const translate = useTranslate()
  const { choice, choose } = useThemeChoice()

  return (
    <ToggleButtonGroup
      aria-label={translate('theme.label')}
      className='theme-switch'
      disallowEmptySelection
      onSelectionChange={(keys) => {
        const [next] = keys

        if (typeof next === 'string' && isThemeChoice(next)) {
          choose(next)
        }
      }}
      selectedKeys={[choice]}
      selectionMode='single'
    >
      {THEME_CHOICES.map((themeChoice) => (
        <ToggleButton className='theme-slot' id={themeChoice} key={themeChoice}>
          <SelectionIndicator className='theme-pawn' />
          <span className='theme-slot-label'>
            {translate(`theme.${themeChoice}`)}
          </span>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
}
