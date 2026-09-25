import type { Meta, StoryObj } from '@storybook/react-vite'

import { Tag, TagGroup, TagList } from './tag-group'

const meta = {
  component: TagGroup,
  title: 'Components/TagGroup'
} satisfies Meta<typeof TagGroup>

export default meta
type Story = StoryObj<typeof meta>

const STACK = [
  'React 19',
  'react-aria',
  'Sass',
  'Express',
  'WebSocket',
  'Playwright'
]

export const Stack: Story = {
  render: (args) => (
    <TagGroup aria-label='Stack' {...args}>
      <TagList>
        {STACK.map((item) => (
          <Tag id={item} key={item}>
            {item}
          </Tag>
        ))}
      </TagList>
    </TagGroup>
  )
}
