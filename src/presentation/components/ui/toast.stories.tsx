import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, screen, userEvent, within } from 'storybook/test'

import { Button } from './button'
import { showToast } from './toast'

/** The region itself is mounted once, by the preview, as the app mounts it. */
const meta = {
  title: 'Components/Toast'
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const CopyConfirmation: Story = {
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole('button'))
    await expect(await screen.findByText('Address copied')).toBeVisible()
  },
  render: () => (
    <Button icon='copy' onPress={() => showToast('Address copied')}>
      Copy the address
    </Button>
  )
}
