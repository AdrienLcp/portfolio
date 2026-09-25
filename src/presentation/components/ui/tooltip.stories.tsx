import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, screen, userEvent } from 'storybook/test'

import { Button } from './button'
import { Tooltip, TooltipTrigger } from './tooltip'

const meta = {
  args: {
    children: 'Copies the email address'
  },
  component: Tooltip,
  parameters: { layout: 'centered' },
  title: 'Components/Tooltip'
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const OnAToken: Story = {
  play: async () => {
    await userEvent.tab()
    await expect(await screen.findByRole('tooltip')).toHaveTextContent(
      'Copies the email address'
    )
  },
  render: (args) => (
    <TooltipTrigger delay={0}>
      <Button aria-label='Copy the address' icon='copy' />
      <Tooltip {...args} />
    </TooltipTrigger>
  )
}
