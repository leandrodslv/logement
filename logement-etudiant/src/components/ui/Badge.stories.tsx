import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: { variant: { control: 'select', options: ['default', 'success', 'warning', 'error', 'info'] } },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = { args: { children: 'Studio', variant: 'default' } }
export const Success: Story = { args: { children: 'Disponible', variant: 'success' } }
export const Warning: Story = { args: { children: 'Bientôt libre', variant: 'warning' } }
export const Error: Story = { args: { children: 'Indisponible', variant: 'error' } }
export const Info: Story = { args: { children: 'Meublé', variant: 'info' } }

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Badge variant="default">Studio</Badge>
      <Badge variant="success">Disponible</Badge>
      <Badge variant="warning">Bientôt libre</Badge>
      <Badge variant="error">Indisponible</Badge>
      <Badge variant="info">Meublé</Badge>
    </div>
  ),
}
