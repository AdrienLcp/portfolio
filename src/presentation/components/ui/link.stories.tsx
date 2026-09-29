import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'

import { Link } from './link'

const meta = {
  args: {
    children: 'Projects',
    href: '/en/projects'
  },
  argTypes: {
    variant: { control: 'radio', options: ['plain', 'accent'] }
  },
  component: Link,
  title: 'Components/Link'
} satisfies Meta<typeof Link>

export default meta
type Story = StoryObj<typeof meta>

export const Plain: Story = {}

export const Accent: Story = {
  args: { variant: 'accent' }
}

/** The pip lights up on the link to the page you are on. */
export const Current: Story = {
  args: { isCurrent: true },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('link')).toHaveAttribute(
      'aria-current',
      'page'
    )
  }
}

/**
 * A new tab is announced in the link's own name and drawn after its label,
 * and the opened page gets no handle on this one.
 */
export const NewTab: Story = {
  args: {
    children: 'Taverla on GitHub',
    href: 'https://github.com/AdrienLcp/taverla',
    target: '_blank'
  },
  play: async ({ canvasElement }) => {
    const link = within(canvasElement).getByRole('link')

    await expect(link).toHaveAccessibleName(
      'Taverla on GitHub (opens in a new tab)'
    )
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  }
}
