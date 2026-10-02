import type React from 'react'

import type { ReleaseState } from '@/features/projects/project'
import { RubberStamp } from '@/presentation/components/register/rubber-stamp'
import { useTranslate } from '@/presentation/i18n/i18n-provider'

import { stampDateOf } from './register-dates'

type ReleaseStampProps = {
  /** Printed under the state, and read in the stamp's name. */
  entered?: string
  /** Pressed onto the page as it loads: the register's newest entry. */
  isFresh?: boolean
  isSmall?: boolean
  /** Printed in place of the state's own word. */
  label?: string
  state: ReleaseState
}

/** The state of an entry, at a glance. */
export const ReleaseStamp: React.FC<ReleaseStampProps> = ({
  entered,
  isFresh,
  isSmall,
  label,
  state
}) => {
  const translate = useTranslate()
  const stateLabel = label ?? translate(`home.state.${state}`)

  return (
    <RubberStamp
      description={
        entered === undefined
          ? undefined
          : translate('home.state.stamp', { date: entered, state: stateLabel })
      }
      isFresh={isFresh}
      isSmall={isSmall}
      label={stateLabel}
      note={entered === undefined ? undefined : stampDateOf(entered)}
    />
  )
}
