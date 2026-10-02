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
    tokens: ['--paper', '--paper-sunk', '--screen', '--ink', '--ink-soft']
  },
  {
    note: 'The register is drawn in rules: hairlines between rows, ink under heads.',
    title: 'Rules',
    tokens: ['--rule', '--rule-strong']
  },
  {
    note: 'One violet, kept for the stamp press and the live state, never a flood.',
    title: 'Violet',
    tokens: ['--violet', '--on-violet', '--on-violet-soft']
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
