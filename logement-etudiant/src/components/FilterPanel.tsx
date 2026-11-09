import { Button } from './ui/Button'
import type { AnnonceFilters, Annonce } from '../types'

interface FilterPanelProps {
  filters: AnnonceFilters
  onChange: (filters: AnnonceFilters) => void
  className?: string
}

const TYPES: Array<{ value: Annonce['type_logement']; label: string }> = [
  { value: 'studio', label: 'Studio' },
  { value: 'T1', label: 'T1' },
  { value: 'T2', label: 'T2' },
  { value: 'T3+', label: 'T3+' },
  { value: 'colocation', label: 'Colocation' },
  { value: 'chambre', label: 'Chambre' },
]

function FilterPanel({ filters, onChange, className }: FilterPanelProps) {
  return (
    <aside aria-label="Filtres de recherche" className={className}>
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] p-4 flex flex-col gap-5">
        <h2 className="text-sm font-bold text-[var(--fg)]">Filtres</h2>

        {/* Type de logement */}
        <fieldset>
          <legend className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wide mb-2">Type</legend>
          <div className="flex flex-wrap gap-2">
            {TYPES.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => onChange({ ...filters, type_logement: filters.type_logement === value ? undefined : value })}
                aria-pressed={filters.type_logement === value}
                className={`px-3 py-1 text-xs font-medium rounded-[var(--radius-full)] border transition-colors outline-none
                  focus-visible:ring-2 focus-visible:ring-[var(--accent)]
                  ${filters.type_logement === value
                    ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                    : 'bg-[var(--surface2)] text-[var(--fg)] border-[var(--border)] hover:border-[var(--accent)]'
                  }`}
              >
                {label}
              </button>
            ))}
          </div>
        </fieldset>

        {/* Meublé */}
        <fieldset>
          <legend className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wide mb-2">Équipement</legend>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.meuble ?? false}
              onChange={e => onChange({ ...filters, meuble: e.target.checked || undefined })}
              className="accent-[var(--accent)] w-4 h-4"
              aria-label="Meublé uniquement"
            />
            <span className="text-sm text-[var(--fg)]">Meublé uniquement</span>
          </label>
        </fieldset>

        {/* Disponible */}
        <fieldset>
          <legend className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wide mb-2">Disponibilité</legend>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.disponible ?? false}
              onChange={e => onChange({ ...filters, disponible: e.target.checked || undefined })}
              className="accent-[var(--accent)] w-4 h-4"
              aria-label="Disponibles uniquement"
            />
            <span className="text-sm text-[var(--fg)]">Disponibles uniquement</span>
          </label>
        </fieldset>

        {/* Reset */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onChange({})}
          disabled={Object.keys(filters).length === 0}
        >
          Réinitialiser les filtres
        </Button>
      </div>
    </aside>
  )
}

export { FilterPanel }
