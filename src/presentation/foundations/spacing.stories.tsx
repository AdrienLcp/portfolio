import type { Meta, StoryObj } from '@storybook/react-vite'

import { Foundation, FoundationGroup, SpecimenRow } from './specimen'

const meta = {
  title: 'Foundations/Spacing'
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const SPACES = [
  '--space-2xs',
  '--space-xs',
  '--space-s',
  '--space-m',
  '--space-l',
  '--space-xl',
  '--space-2xl',
  '--space-3xl',
  '--gutter'
] as const

export const Scale: Story = {
  render: () => (
    <Foundation>
      <FoundationGroup
        note='Tight inside a group, generous between groups. The gutter is the one horizontal padding of every field.'
        title='Spacing'
      >
        {SPACES.map((token) => (
          <SpecimenRow key={token} name={token} token={token}>
            <div className='bar' style={{ '--bar': `var(${token})` }} />
          </SpecimenRow>
        ))}
      </FoundationGroup>
    </Foundation>
  )
}
