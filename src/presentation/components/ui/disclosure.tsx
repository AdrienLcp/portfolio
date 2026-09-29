import type React from 'react'
import {
  Button,
  DisclosurePanel,
  Heading,
  Disclosure as ReactAriaDisclosure,
  type DisclosureProps as ReactAriaDisclosureProps
} from 'react-aria-components'

import { composeClassName } from '@/presentation/components/compose-class-name'
import { Icon } from '@/presentation/components/icon'

import './disclosure.sass'

export type DisclosureProps = Omit<ReactAriaDisclosureProps, 'children'> & {
  children: React.ReactNode
  level?: 2 | 3 | 4
  title: React.ReactNode
}

export const Disclosure: React.FC<DisclosureProps> = ({
  children,
  className,
  level = 3,
  title,
  ...props
}) => (
  <ReactAriaDisclosure
    {...props}
    className={composeClassName(className, 'disclosure')}
  >
    <Heading className='disclosure-heading' level={level}>
      <Button className='disclosure-trigger' slot='trigger'>
        <span className='disclosure-title'>{title}</span>
        <span className='disclosure-mark'>
          <Icon name='plus' />
        </span>
      </Button>
    </Heading>
    <DisclosurePanel className='disclosure-panel'>{children}</DisclosurePanel>
  </ReactAriaDisclosure>
)
