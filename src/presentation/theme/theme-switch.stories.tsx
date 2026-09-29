import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

import { ThemeSwitch } from './theme-switch'

const meta = {
  component: ThemeSwitch,
  title: 'Components/ThemeSwitch'
} satisfies Meta<typeof ThemeSwitch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/**
 * Night stamps `data-theme`; Auto removes it, handing the theme back to the
 * system instead of pinning Day.
 */
export const StampsTheChoice: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const root = document.documentElement

    await userEvent.click(canvas.getByRole('radio', { name: 'Night' }))
    await expect(root).toHaveAttribute('data-theme', 'dark')
    await expect(canvas.getByRole('radio', { name: 'Night' })).toBeChecked()

    await userEvent.click(canvas.getByRole('radio', { name: 'Auto' }))
    await expect(root).not.toHaveAttribute('data-theme')
  }
}
