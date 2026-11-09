import { Link } from 'react-router-dom'
import { SearchBar } from '../components/SearchBar'
import { AnnonceCard } from '../components/AnnonceCard'
import { PageSpinner } from '../components/ui/Spinner'
import { ErrorState } from '../components/ui/EmptyState'
import { useAnnonces } from '../hooks/useAnnonces'

const STATS = [
  { label: 'Logements disponibles', value: '2 400+' },
  { label: 'Villes couvertes', value: '50+' },
  { label: 'Étudiants logés', value: '12 000+' },
]

const VILLES_POPULAIRES = ['Paris', 'Lyon', 'Bordeaux', 'Toulouse', 'Marseille', 'Nantes']

export default function HomePage() {
  const { annonces, loading, error } = useAnnonces({ disponible: true }, 1)
  const featured = annonces.slice(0, 3)

  return (
    <main id="main-content">
      {/* Hero */}
      <section
        className="relative text-white overflow-hidden"
        aria-label="Recherche de logement"
      >
        {/* Image de fond */}
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&h=900&fit=crop&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Overlay dégradé */}
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background: 'linear-gradient(135deg, rgba(15,23,42,0.82) 0%, rgba(37,99,235,0.65) 60%, rgba(15,23,42,0.75) 100%)',
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 py-20 sm:py-28 text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Trouvez votre logement<br />
            <span className="text-blue-300">étudiant idéal</span>
          </h1>
          <p className="text-base sm:text-lg text-blue-100 mb-10 max-w-xl mx-auto">
            Milliers d'annonces vérifiées, des studios aux colocations, dans toute la France.
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-[var(--radius-xl)] p-4 sm:p-6">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[var(--accent)] text-white py-8" aria-label="Chiffres clés">
        <div className="max-w-4xl mx-auto px-4">
          <dl className="flex flex-col sm:flex-row justify-around gap-6 text-center">
            {STATS.map(({ label, value }) => (
              <div key={label}>
                <dt className="text-blue-100 text-sm">{label}</dt>
                <dd className="text-3xl font-extrabold">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Annonces à la une */}
      <section className="max-w-6xl mx-auto px-4 py-16" aria-label="Annonces récentes">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-[var(--fg)]" style={{ fontFamily: 'var(--font-display)' }}>
            Annonces récentes
          </h2>
          <Link
            to="/annonces"
            className="text-sm text-[var(--accent)] font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded"
          >
            Voir tout →
          </Link>
        </div>

        {loading ? (
          <PageSpinner />
        ) : error ? (
          <ErrorState message={error} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map(annonce => (
              <AnnonceCard key={annonce.id} annonce={annonce} />
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            to="/annonces"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-white rounded-[var(--radius-lg)] font-semibold
              hover:bg-[var(--accent-dark)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            Voir toutes les annonces
          </Link>
        </div>
      </section>

      {/* Villes populaires */}
      <section className="bg-[var(--surface2)] py-16" aria-label="Villes populaires">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-[var(--fg)] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
            Cherchez par ville
          </h2>
          <p className="text-[var(--muted)] mb-8">Les destinations préférées des étudiants</p>
          <ul className="flex flex-wrap justify-center gap-3" role="list">
            {VILLES_POPULAIRES.map(ville => (
              <li key={ville}>
                <Link
                  to={`/annonces#ville=${encodeURIComponent(ville)}&budget=0`}
                  className="inline-block px-5 py-2.5 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-full)]
                    text-sm font-medium text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)]
                    transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                >
                  {ville}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA Bailleur */}
      <section className="max-w-3xl mx-auto px-4 py-16 text-center" aria-label="Publier une annonce">
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-xl)] p-10 shadow-[var(--shadow-md)]">
          <p className="text-3xl mb-4" aria-hidden="true">🏠</p>
          <h2 className="text-xl font-bold text-[var(--fg)] mb-3" style={{ fontFamily: 'var(--font-display)' }}>
            Vous êtes propriétaire ?
          </h2>
          <p className="text-[var(--muted)] mb-6">
            Publiez votre annonce gratuitement et touchez des milliers d'étudiants.
          </p>
          <Link
            to="/inscription"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-white rounded-[var(--radius-lg)] font-semibold
              hover:bg-[var(--accent-dark)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            Déposer une annonce
          </Link>
        </div>
      </section>
    </main>
  )
}
