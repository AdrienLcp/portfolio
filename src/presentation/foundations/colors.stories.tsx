import type { Meta, StoryObj } from '@storybook/react-vite'

import { Foundation, FoundationGroup, SpecimenRow } from './specimen'

const meta = {
  title: 'Foundations/Colors'
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const GROUPS = [
  {
    note: 'Each is a light-dark() pair: switch the theme in the toolbar.',
    title: 'Paper and ink',
    tokens: ['--paper', '--ink', '--ink-soft']
  },
  {
    note: 'Flat fields, edge to edge. At night they lift a few points of lightness.',
    title: 'Fields',
    tokens: ['--field-dominant', '--field-secondary']
  },
  {
    note: 'Marigold is for display type and tokens on petrol, never small text.',
    title: 'Accent and active',
    tokens: ['--accent', '--active', '--focus']
  },
  {
    note: 'A printed piece keeps these inks in both themes.',
    title: 'Print inks',
    tokens: [
      '--print-ink',
      '--print-paper',
      '--print-marigold',
      '--print-brick',
      '--token'
    ]
  }
] as const

export const Palette: Story = {
  render: () => (
    <Foundation>
      {GROUPS.map(({ note, title, tokens }) => (
        <FoundationGroup key={title} note={note} title={title}>
          {tokens.map((token) => (
            <SpecimenRow key={token} name={token} token={token}>
              <div className='swatch' style={{ '--swatch': `var(${token})` }} />
            </SpecimenRow>
          ))}
        </FoundationGroup>
      ))}
    </Foundation>
  )
}
