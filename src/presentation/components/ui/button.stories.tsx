import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, within } from 'storybook/test'

import { Button } from './button'

const meta = {
  args: {
    children: 'Open the box',
    onPress: fn()
  },
  argTypes: {
    variant: { control: 'radio', options: ['plain', 'accent'] }
  },
  component: Button,
  title: 'Components/Button'
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Plain: Story = {}

export const Accent: Story = {
  args: { variant: 'accent' }
}

export const WithIcon: Story = {
  args: { children: 'Copy the address', icon: 'copy' }
}

export const IconOnly: Story = {
  args: { 'aria-label': 'Close', children: undefined, icon: 'close' }
}

export const Disabled: Story = {
  args: { isDisabled: true }
}

/**
 * The pip turns into the wait, so the token keeps its width. react-aria keeps
 * a pending button focusable (`aria-disabled`, not `disabled`) and strips its
 * handlers, so the press cannot fire.
 */
export const Pending: Story = {
  args: {
    children: 'Copy the address',
    isPending: true,
    pendingLabel: 'Copying the address'
  },
  play: async ({ args, canvasElement }) => {
    const button = within(canvasElement).getByRole('button')

    await expect(button).toHaveAttribute('aria-disabled', 'true')
    await expect(button).not.toBeDisabled()
    await expect(
      within(canvasElement).getByRole('progressbar', {
        name: 'Copying the address'
      })
    ).toBeInTheDocument()

    await userEvent.click(button)
    await expect(args.onPress).not.toHaveBeenCalled()
  }
}

/** A className function survives the merge with the token's own classes. */
export const KeepsAFunctionClassName: Story = {
  args: {
    className: ({ isHovered }) =>
      isHovered ? 'caller-class hovered' : 'caller-class'
  },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole('button')

    await expect(button).toHaveClass('caller-class')
    await expect(button).toHaveClass('token')
  }
}

/** The ring answers the keyboard only, never a pointer press. */
export const FocusRingOnKeyboardOnly: Story = {
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole('button')

    await userEvent.tab()
    await expect(button).toHaveAttribute('data-focus-visible')

    await userEvent.click(button)
    await expect(button).not.toHaveAttribute('data-focus-visible')
  }
}

/** A token keeps its print on every field of the box. */
export const OnEveryField: Story = {
  parameters: { layout: 'fullscreen' },
  render: (args) => (
    <div className='story-fields'>
      <div className='story-field'>
        <Button {...args} />
        <Button {...args} variant='accent' />
      </div>
      <div className='story-field dominant'>
        <Button {...args} />
        <Button {...args} variant='accent' />
      </div>
      <div className='story-field secondary'>
        <Button {...args} />
        <Button {...args} variant='accent' />
      </div>
    </div>
  )
}
