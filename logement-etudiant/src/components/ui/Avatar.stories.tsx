import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from './Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'UI/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] } },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const WithInitials: Story = { args: { name: 'Léandro Silva', size: 'lg' } }
export const WithImage: Story = { args: { src: 'https://i.pravatar.cc/150?u=1', name: 'Matti Dupont', size: 'lg' } }
export const Fallback: Story = { args: { name: undefined, size: 'md' } }

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Avatar name="Léandro Silva" size="sm" />
      <Avatar name="Léandro Silva" size="md" />
      <Avatar name="Léandro Silva" size="lg" />
      <Avatar name="Léandro Silva" size="xl" />
    </div>
  ),
}
