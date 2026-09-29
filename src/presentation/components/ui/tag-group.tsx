import type React from 'react'
import {
  Tag as ReactAriaTag,
  TagList as ReactAriaTagList,
  type TagListProps,
  type TagProps
} from 'react-aria-components'

import { composeClassName } from '@/presentation/components/compose-class-name'

import './tag-group.sass'

export { TagGroup, type TagGroupProps } from 'react-aria-components'

/**
 * Stamps printed on the box, like the line "1 realtime server" in a contents
 * list: flat, square, no shadow. They are read, never pressed.
 */
export const TagList = <T extends object>({
  className,
  ...props
}: TagListProps<T>) => (
  <ReactAriaTagList
    {...props}
    className={composeClassName(className, 'tag-list')}
  />
)

export const Tag: React.FC<TagProps> = ({ className, ...props }) => (
  <ReactAriaTag {...props} className={composeClassName(className, 'stamp')} />
)
