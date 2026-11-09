import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost', 'danger'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = { args: { children: 'Rechercher un logement', variant: 'primary' } }
export const Secondary: Story = { args: { children: 'En savoir plus', variant: 'secondary' } }
export const Ghost: Story = { args: { children: 'Annuler', variant: 'ghost' } }
export const Danger: Story = { args: { children: 'Supprimer l\'annonce', variant: 'danger' } }
export const Loading: Story = { args: { children: 'Connexion…', loading: true } }
export const Disabled: Story = { args: { children: 'Non disponible', disabled: true } }
export const Small: Story = { args: { children: 'Filtrer', size: 'sm' } }
export const Large: Story = { args: { children: 'Trouver mon logement', size: 'lg' } }

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      <Button loading>Chargement</Button>
      <Button disabled>Désactivé</Button>
    </div>
  ),
}
