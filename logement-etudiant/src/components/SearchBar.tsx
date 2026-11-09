import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Euro } from 'lucide-react'
import { Button } from './ui/Button'
import { Input } from './ui/Input'

interface SearchBarProps {
  defaultVille?: string
  defaultBudget?: number
  onSearch?: (params: { ville: string; budget: number }) => void
  className?: string
}

function SearchBar({ defaultVille = '', defaultBudget = 700, onSearch, className }: SearchBarProps) {
  const navigate = useNavigate()
  const [ville, setVille] = useState(defaultVille)
  const [budget, setBudget] = useState(String(defaultBudget))

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const params = { ville, budget: Number(budget) || 0 }
    if (onSearch) {
      onSearch(params)
    } else {
      const hash = `#ville=${encodeURIComponent(ville)}&budget=${budget}`
      navigate(`/annonces${hash}`)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      aria-label="Rechercher un logement"
      className={className}
    >
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          label="Ville ou école"
          value={ville}
          onChange={e => setVille(e.target.value)}
          placeholder="Paris, Lyon, Bordeaux…"
          aria-label="Ville ou nom de l'école"
          icon={<Search size={15} aria-hidden="true" />}
          className="flex-1"
        />
        <Input
          label="Budget max (€/mois)"
          type="number"
          value={budget}
          onChange={e => setBudget(e.target.value)}
          placeholder="700"
          min={0}
          max={5000}
          aria-label="Budget maximum par mois en euros"
          icon={<Euro size={15} aria-hidden="true" />}
          iconPosition="right"
          className="w-full sm:w-40"
        />
        <div className="flex items-end">
          <Button type="submit" size="lg" className="w-full sm:w-auto">
            Rechercher
          </Button>
        </div>
      </div>
    </form>
  )
}

export { SearchBar }
