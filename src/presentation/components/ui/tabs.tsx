import type React from 'react'
import {
  Tab as ReactAriaTab,
  TabList as ReactAriaTabList,
  TabPanel as ReactAriaTabPanel,
  type TabListProps,
  type TabPanelProps,
  type TabProps
} from 'react-aria-components'

import { composeClassName } from '@/presentation/components/compose-class-name'

import './tabs.sass'
import './token.sass'

export { Tabs, type TabsProps } from 'react-aria-components'

/** A row of tokens; the chosen one is played, pressed flat into the board. */
export const TabList = <T extends object>({
  className,
  ...props
}: TabListProps<T>) => (
  <ReactAriaTabList
    {...props}
    className={composeClassName(className, 'tab-list')}
  />
)

export const Tab: React.FC<TabProps> = ({ className, ...props }) => (
  <ReactAriaTab {...props} className={composeClassName(className, 'token')} />
)

export const TabPanel: React.FC<TabPanelProps> = ({ className, ...props }) => (
  <ReactAriaTabPanel
    {...props}
    className={composeClassName(className, 'tab-panel')}
  />
)
