import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = { args: { label: 'Ville', placeholder: 'Paris, Lyon…' } }
export const WithIcon: Story = { args: { label: 'Recherche', placeholder: 'Rechercher…', icon: '🔍' } }
export const WithError: Story = { args: { label: 'Email', placeholder: 'vous@exemple.fr', error: 'Email invalide', value: 'pas-un-email' } }
export const WithHint: Story = { args: { label: 'Mot de passe', type: 'password', hint: 'Minimum 8 caractères' } }
export const Required: Story = { args: { label: 'Prénom', required: true, placeholder: 'Votre prénom' } }
export const Disabled: Story = { args: { label: 'Ville', value: 'Paris', disabled: true } }
