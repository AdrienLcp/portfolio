import type { Meta, StoryObj } from '@storybook/react-vite'

import { Foundation, FoundationGroup, SpecimenRow } from './specimen'

const meta = {
  title: 'Foundations/Typography'
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const SCALE = [
  { mixin: 'title', sample: 'No page lives at /en/rules.' },
  { mixin: 'heading', sample: 'The lobby, on the host screen' },
  { mixin: 'lead', sample: 'Three party games, one realtime server.' },
  {
    mixin: 'body',
    sample:
      'Every phone in the room buzzes on the same instant: the server keeps the clock, and each phone corrects its own drift against it before the round starts.'
  },
  { mixin: 'control', sample: 'Open the box' },
  { mixin: 'caption', sample: 'React 19 · react-aria · Sass' }
] as const

export const Scale: Story = {
  render: () => (
    <Foundation>
      <FoundationGroup
        note='Archivo is what the box prints and what a hand presses; Literata is what a person reads as a sentence.'
        title='Two voices'
      >
        <div className='lid-sample'>
          <p className='type-lid'>Adrien Lacourpaille</p>
        </div>
        {SCALE.map(({ mixin, sample }) => (
          <SpecimenRow key={mixin} name={`typography.${mixin}`}>
            <p className={`type-${mixin}`}>{sample}</p>
          </SpecimenRow>
        ))}
      </FoundationGroup>
    </Foundation>
  )
}
