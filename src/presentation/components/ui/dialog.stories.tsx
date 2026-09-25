import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, screen, userEvent, waitFor, within } from 'storybook/test'

import { Button } from './button'
import { Dialog, DialogTrigger } from './dialog'

const meta = {
  args: {
    children: (
      <p>
        The host screen shows the room code and the QR code; each phone that
        scans it joins the same room.
      </p>
    ),
    title: 'The lobby, on the host screen'
  },
  component: Dialog,
  title: 'Components/Dialog'
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Sheet: Story = {
  render: (args) => (
    <DialogTrigger>
      <Button>Enlarge the screenshot</Button>
      <Dialog {...args} />
    </DialogTrigger>
  )
}

/** Opens as a titled dialog, and its cross gives focus back to the trigger. */
export const OpensAndCloses: Story = {
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole('button', {
      name: 'Enlarge the screenshot'
    })

    await userEvent.click(trigger)
    const dialog = await screen.findByRole('dialog', {
      name: 'The lobby, on the host screen'
    })

    await userEvent.click(within(dialog).getByRole('button', { name: 'Close' }))
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull())
    await waitFor(() => expect(trigger).toHaveFocus())
  },
  render: Sheet.render
}
