import { composeClassName } from '@adrienlcp/react-aria'
import type React from 'react'
import {
  Switch as ReactAriaSwitch,
  type SwitchProps as ReactAriaSwitchProps
} from 'react-aria-components'

import './switch.sass'

type SwitchProps = Omit<ReactAriaSwitchProps, 'children'> & {
  /** The label, read with the switch and pressed like it. */
  children: React.ReactNode
}

/** An on/off setting that applies at once, its track drawn before the label. */
export const Switch: React.FC<SwitchProps> = ({
  children,
  className,
  ...props
}) => (
  <ReactAriaSwitch {...props} className={composeClassName(className, 'switch')}>
    <span aria-hidden='true' className='switch-track'>
      <span className='switch-thumb' />
    </span>
    <span className='switch-label'>{children}</span>
  </ReactAriaSwitch>
)
