import type { Meta, StoryObj } from '@storybook/react-vite'

import { TextLink } from './text-link'

const meta = {
  args: {
    children: 'Taverla',
    href: 'https://github.com/AdrienLcp/taverla',
    target: '_blank'
  },
  component: TextLink,
  title: 'Components/TextLink'
} satisfies Meta<typeof TextLink>

export default meta
type Story = StoryObj<typeof meta>

export const InASentence: Story = {
  render: (args) => (
    <p className='story-measure'>
      Every game of <TextLink {...args} /> runs on one realtime server: one
      room, one QR code, and every phone buzzing on the same instant.
    </p>
  )
}

/** The underline takes the focus colour of the field it is printed on. */
export const OnEveryField: Story = {
  parameters: { layout: 'fullscreen' },
  render: (args) => (
    <div className='story-fields'>
      {['', 'dominant', 'secondary'].map((field) => (
        <p className={`story-field ${field}`} key={field}>
          Built alone: <TextLink {...args} />, three party games.
        </p>
      ))}
    </div>
  )
}
