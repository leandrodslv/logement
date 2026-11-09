import { useEffect, useState } from 'react'
import { SearchBar } from '../components/SearchBar'
import { FilterPanel } from '../components/FilterPanel'
import { AnnonceCard } from '../components/AnnonceCard'
import { PageSpinner } from '../components/ui/Spinner'
import { EmptyState, ErrorState } from '../components/ui/EmptyState'
import { useAnnonces } from '../hooks/useAnnonces'
import type { AnnonceFilters } from '../types'

function parsehash(): { ville: string; budget: number } {
  const hash = window.location.hash.slice(1)
  const params = new URLSearchParams(hash)
  return {
    ville: params.get('ville') ?? '',
    budget: Number(params.get('budget')) || 0,
  }
}

export default function AnnoncesPage() {
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState<AnnonceFilters>(() => {
    const { ville, budget } = parsehash()
    return {
      ville: ville || undefined,
      budget_max: budget || undefined,
    }
  })
  const [searchVille, setSearchVille] = useState(() => parsehash().ville)
  const [searchBudget, setSearchBudget] = useState(() => parsehash().budget)

  const { annonces, total, loading, error, pageSize } = useAnnonces(filters, page)
  const totalPages = Math.ceil(total / pageSize)

  useEffect(() => {
    function onHashChange() {
      const { ville, budget } = parsehash()
      setSearchVille(ville)
      setSearchBudget(budget)
      setFilters(f => ({ ...f, ville: ville || undefined, budget_max: budget || undefined }))
      setPage(1)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  function handleSearch({ ville, budget }: { ville: string; budget: number }) {
    setFilters(f => ({ ...f, ville: ville || undefined, budget_max: budget || undefined }))
    setSearchVille(ville)
    setSearchBudget(budget)
    setPage(1)
    const hash = `#ville=${encodeURIComponent(ville)}&budget=${budget}`
    window.history.replaceState(null, '', window.location.pathname + hash)
  }

  function handleFiltersChange(newFilters: AnnonceFilters) {
    setFilters(f => ({ ...f, ...newFilters, ville: f.ville, budget_max: f.budget_max }))
    setPage(1)
  }

  return (
    <main id="main-content" className="max-w-7xl mx-auto px-4 py-8">
      {/* Search bar */}
      <div className="mb-6">
        <SearchBar
          defaultVille={searchVille}
          defaultBudget={searchBudget || 700}
          onSearch={handleSearch}
        />
      </div>

      {/* Results header */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-[var(--muted)]" aria-live="polite" aria-atomic="true">
          {loading ? 'Recherche en cours…' : `${total} logement${total !== 1 ? 's' : ''} trouvé${total !== 1 ? 's' : ''}`}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters sidebar */}
        <FilterPanel
          filters={filters}
          onChange={handleFiltersChange}
          className="w-full lg:w-56 shrink-0"
        />

        {/* Grid */}
        <div className="flex-1 min-w-0">
          {loading ? (
            <PageSpinner />
          ) : error ? (
            <ErrorState message={error} />
          ) : annonces.length === 0 ? (
            <EmptyState
              icon="🔍"
              title="Aucun logement trouvé"
              description="Essayez d'élargir votre recherche ou de modifier les filtres."
            />
          ) : (
            <>
              <div
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                aria-label="Liste des annonces"
              >
                {annonces.map(annonce => (
                  <AnnonceCard key={annonce.id} annonce={annonce} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <nav aria-label="Pagination" className="mt-10 flex justify-center gap-2 flex-wrap">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 text-sm rounded-[var(--radius-md)] border border-[var(--border)]
                      disabled:opacity-40 hover:border-[var(--accent)] hover:text-[var(--accent)]
                      transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                    aria-label="Page précédente"
                  >
                    ← Précédent
                  </button>

                  {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                    const p = i + 1
                    return (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        aria-current={p === page ? 'page' : undefined}
                        className={`w-10 h-10 text-sm rounded-[var(--radius-md)] border transition-colors
                          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]
                          ${p === page
                            ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                            : 'border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
                          }`}
                      >
                        {p}
                      </button>
                    )
                  })}

                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 text-sm rounded-[var(--radius-md)] border border-[var(--border)]
                      disabled:opacity-40 hover:border-[var(--accent)] hover:text-[var(--accent)]
                      transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                    aria-label="Page suivante"
                  >
                    Suivant →
                  </button>
                </nav>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  )
}
