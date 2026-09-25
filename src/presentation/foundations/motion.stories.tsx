import type { Meta, StoryObj } from '@storybook/react-vite'

import { Foundation, FoundationGroup, SpecimenRow } from './specimen'

const meta = {
  title: 'Foundations/Motion'
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const DURATIONS = [
  '--transition-fast',
  '--transition-base',
  '--transition-slow'
] as const

export const Durations: Story = {
  render: () => (
    <Foundation>
      <FoundationGroup
        note='One exponential ease-out for every move. Under reduced motion every duration drops to zero, and these dots stand still.'
        title='Durations'
      >
        {DURATIONS.map((token) => (
          <SpecimenRow key={token} name={token} token={token}>
            <div className='motion-track'>
              <div
                className='motion-dot'
                style={{ '--duration': `calc(var(${token}) * 4)` }}
              />
            </div>
          </SpecimenRow>
        ))}
        <SpecimenRow name='--timing' token='--timing'>
          <span className='type-caption'>cubic-bezier(0.16, 1, 0.3, 1)</span>
        </SpecimenRow>
      </FoundationGroup>
    </Foundation>
  )
}
