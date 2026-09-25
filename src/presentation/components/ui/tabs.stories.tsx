import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

import { Tab, TabList, TabPanel, Tabs } from './tabs'

const meta = {
  component: Tabs,
  title: 'Components/Tabs'
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const ProjectFilters: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.click(canvas.getByRole('tab', { name: 'Tooling' }))
    await expect(canvas.getByRole('tab', { name: 'Tooling' })).toHaveAttribute(
      'aria-selected',
      'true'
    )
    await expect(canvas.getByRole('tabpanel')).toHaveTextContent(
      'The shared toolkit'
    )
  },
  render: (args) => (
    <Tabs {...args}>
      <TabList aria-label='Filter the projects'>
        <Tab id='all'>All</Tab>
        <Tab id='games'>Games</Tab>
        <Tab id='tooling'>Tooling</Tab>
        <Tab id='open' isDisabled>
          Open source
        </Tab>
      </TabList>
      <TabPanel id='all'>Taverla, and the toolkit under it.</TabPanel>
      <TabPanel id='games'>Taverla: blind test, buzzer, quiz.</TabPanel>
      <TabPanel id='tooling'>The shared toolkit and its lint rules.</TabPanel>
      <TabPanel id='open'>Nothing yet.</TabPanel>
    </Tabs>
  )
}
