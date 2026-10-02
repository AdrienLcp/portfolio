import type { Meta, StoryObj } from '@storybook/react-vite'

import { Foundation, FoundationGroup, SpecimenRow } from './specimen'

const meta = {
  title: 'Foundations/Typography'
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const SCALE = [
  { mixin: 'label', sample: 'Entry · Released · Status' },
  { mixin: 'figures', sample: '2026-10-02 · v1.4.0 · 98.2%' },
  {
    mixin: 'body',
    sample:
      'Every phone in the room buzzes on the same instant: the server keeps the clock, and each phone corrects its own drift against it before the round starts.'
  },
  { mixin: 'code', sample: 'pnpm add @adrienlcp/result' }
] as const

export const Scale: Story = {
  render: () => (
    <Foundation>
      <FoundationGroup
        note='Sofia Sans Condensed letters the register; Sofia Sans carries every sentence.'
        title='One family, two widths'
      >
        {SCALE.map(({ mixin, sample }) => (
          <SpecimenRow key={mixin} name={`typography.${mixin}`}>
            <p className={`type-${mixin}`}>{sample}</p>
          </SpecimenRow>
        ))}
      </FoundationGroup>
    </Foundation>
  )
}
