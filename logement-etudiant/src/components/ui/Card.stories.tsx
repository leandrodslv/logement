import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardHeader, CardBody, CardFooter } from './Card'
import { Button } from './Button'

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: () => (
    <Card style={{ maxWidth: '360px' }}>
      <CardBody>
        <p>Contenu de la carte</p>
      </CardBody>
    </Card>
  ),
}

export const WithHeaderFooter: Story = {
  render: () => (
    <Card style={{ maxWidth: '360px' }}>
      <CardHeader><h3 style={{ margin: 0, fontSize: '1rem' }}>Titre de la carte</h3></CardHeader>
      <CardBody><p>Corps de la carte avec du contenu pertinent.</p></CardBody>
      <CardFooter>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <Button variant="ghost" size="sm">Annuler</Button>
          <Button size="sm">Confirmer</Button>
        </div>
      </CardFooter>
    </Card>
  ),
}

export const Hoverable: Story = {
  render: () => (
    <Card hover style={{ maxWidth: '360px', cursor: 'pointer' }}>
      <CardBody><p>Carte cliquable — hover pour voir l'effet</p></CardBody>
    </Card>
  ),
}
