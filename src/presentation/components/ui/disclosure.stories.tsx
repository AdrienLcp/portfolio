import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

import { Disclosure } from './disclosure'

const meta = {
  args: {
    children: (
      <p>
        One room, one QR code, and every phone buzzing on the same instant. The
        server keeps the clock; each phone corrects its own drift against it.
      </p>
    ),
    title: 'Realtime party games'
  },
  component: Disclosure,
  title: 'Components/Disclosure'
} satisfies Meta<typeof Disclosure>

export default meta
type Story = StoryObj<typeof meta>

export const Closed: Story = {}

export const Expanded: Story = {
  args: { defaultExpanded: true }
}

export const Booklet: Story = {
  render: (args) => (
    <div className='story-measure'>
      <Disclosure {...args} />
      <Disclosure {...args} title='A shared toolkit' />
      <Disclosure {...args} title='Accessible primitives, no flash' />
    </div>
  )
}

/** The trigger names the fold and reports whether it is open. */
export const Toggles: Story = {
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole('button', {
      name: 'Realtime party games'
    })

    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
    await userEvent.click(trigger)
    await expect(trigger).toHaveAttribute('aria-expanded', 'true')
    await expect(
      within(canvasElement).getByText(/every phone buzzing/)
    ).toBeVisible()
  }
}
