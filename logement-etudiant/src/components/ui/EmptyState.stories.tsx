import type { Meta, StoryObj } from '@storybook/react'
import { EmptyState } from './EmptyState'
import { Button } from './Button'

const meta: Meta<typeof EmptyState> = {
  title: 'UI/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof EmptyState>

export const NoResults: Story = {
  args: {
    icon: '🔍',
    title: 'Aucun logement trouvé',
    description: 'Essayez d\'élargir votre recherche ou de changer de ville.',
    action: <Button variant="secondary" size="sm">Modifier les filtres</Button>,
  },
}

export const NoMessages: Story = {
  args: {
    icon: '💬',
    title: 'Aucune conversation',
    description: 'Contactez un bailleur depuis une annonce pour commencer.',
  },
}

export const NoAnnonces: Story = {
  args: {
    icon: '🏠',
    title: 'Pas encore d\'annonces',
    description: 'Publiez votre première annonce pour trouver des locataires.',
    action: <Button size="sm">Déposer une annonce</Button>,
  },
}
