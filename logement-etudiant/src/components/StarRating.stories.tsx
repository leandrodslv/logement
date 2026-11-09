import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { StarRating } from './StarRating'

const meta: Meta<typeof StarRating> = {
  title: 'Métier/StarRating',
  component: StarRating,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof StarRating>

export const ReadOnly: Story = { args: { value: 4, readOnly: true } }
function InteractiveStory() {
  const [note, setNote] = useState(0)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <StarRating value={note} onChange={setNote} />
      <p style={{ fontSize: '0.875rem', color: 'var(--muted)' }}>Note choisie : {note}/5</p>
    </div>
  )
}

export const Interactive: Story = {
  render: () => <InteractiveStory />,
}
export const AllScores: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {[1, 2, 3, 4, 5].map(n => (
        <div key={n} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <StarRating value={n} readOnly size="sm" />
          <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{n}/5</span>
        </div>
      ))}
    </div>
  ),
}
