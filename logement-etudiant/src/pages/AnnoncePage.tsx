import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { MapPin, Heart } from 'lucide-react'
import { useFavoris } from '../hooks/useFavoris'
import { Badge } from '../components/ui/Badge'
import { SourceBadge } from '../components/AnnonceCard'
import { Avatar } from '../components/ui/Avatar'
import { Button } from '../components/ui/Button'
import { PageSpinner } from '../components/ui/Spinner'
import { ErrorState } from '../components/ui/EmptyState'
import { AnnonceCard } from '../components/AnnonceCard'
import { StarRating } from '../components/StarRating'
import { useAnnonce, useAnnonceSimilaires } from '../hooks/useAnnonces'
import { useAuth } from '../hooks/useAuth'
import { formatPrix } from '../lib/utils'
import { MapBlock } from '../components/MapBlock'

export default function AnnoncePage() {
  const { id } = useParams<{ id: string }>()
  const { annonce, loading, error } = useAnnonce(id)
  const similaires = useAnnonceSimilaires(annonce)
  const { user, isBailleur } = useAuth()
  const { isFavori, toggle: toggleFavori } = useFavoris()
  const navigate = useNavigate()
  const [photoIndex, setPhotoIndex] = useState(0)

  if (loading) return <PageSpinner />
  if (error || !annonce) return <ErrorState message={error ?? 'Annonce introuvable'} />

  const photos = annonce.photos ?? []
  const currentPhoto = photos[photoIndex]
  const bailleur = annonce.bailleur

  function handleContact() {
    if (!user) {
      navigate('/connexion')
      return
    }
    navigate(`/messagerie?annonce=${annonce!.id}&destinataire=${annonce!.bailleur_id}`)
  }

  return (
    <main id="main-content" className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav aria-label="Fil d'Ariane" className="mb-6">
        <ol className="flex items-center gap-2 text-sm text-[var(--muted)]">
          <li><Link to="/" className="hover:text-[var(--accent)]">Accueil</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link to="/annonces" className="hover:text-[var(--accent)]">Annonces</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-[var(--fg)] line-clamp-1">{annonce.titre}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Col gauche : galerie + details */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* Galerie */}
          <section aria-label="Photos du logement">
            <div className="relative aspect-[16/9] bg-[var(--surface2)] rounded-[var(--radius-xl)] overflow-hidden mb-3">
              {currentPhoto ? (
                <img
                  src={currentPhoto}
                  alt={`${annonce.titre} — photo ${photoIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[var(--muted)]">
                  <span style={{ fontSize: '3rem' }} aria-hidden="true">🏠</span>
                </div>
              )}
              {photos.length > 1 && (
                <>
                  <button
                    onClick={() => setPhotoIndex(i => (i - 1 + photos.length) % photos.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white
                      flex items-center justify-center hover:bg-black/70 focus-visible:outline-none
                      focus-visible:ring-2 focus-visible:ring-white transition-colors"
                    aria-label="Photo précédente"
                  >
                    ‹
                  </button>
                  <button
                    onClick={() => setPhotoIndex(i => (i + 1) % photos.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white
                      flex items-center justify-center hover:bg-black/70 focus-visible:outline-none
                      focus-visible:ring-2 focus-visible:ring-white transition-colors"
                    aria-label="Photo suivante"
                  >
                    ›
                  </button>
                  <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                    {photoIndex + 1} / {photos.length}
                  </span>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {photos.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Vignettes">
                {photos.map((src, i) => (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={i === photoIndex}
                    onClick={() => setPhotoIndex(i)}
                    className={`shrink-0 w-16 h-12 rounded-[var(--radius-md)] overflow-hidden border-2 transition-all
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]
                      ${i === photoIndex ? 'border-[var(--accent)]' : 'border-transparent opacity-60 hover:opacity-100'}`}
                    aria-label={`Photo ${i + 1}`}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* Titre + badges */}
          <section aria-label="Informations principales">
            <div className="flex flex-wrap items-start gap-2 mb-2">
              <Badge variant={annonce.disponible ? 'success' : 'default'}>
                {annonce.disponible ? 'Disponible' : 'Indisponible'}
              </Badge>
              <Badge variant="default" className="capitalize">{annonce.type_logement}</Badge>
              {annonce.meuble && <Badge variant="info">Meublé</Badge>}
              <SourceBadge source={annonce.source} />
            </div>
            <div className="flex items-start justify-between gap-3 mb-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--fg)]" style={{ fontFamily: 'var(--font-display)' }}>
                {annonce.titre}
              </h1>
              {user && !isBailleur && (
                <button
                  onClick={() => toggleFavori(annonce.id)}
                  aria-label={isFavori(annonce.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                  className="shrink-0 mt-1 w-10 h-10 flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface2)] hover:border-red-400 transition-colors"
                >
                  <Heart
                    size={18}
                    className={isFavori(annonce.id) ? 'text-red-400 fill-red-400' : 'text-[var(--muted)]'}
                  />
                </button>
              )}
            </div>
            {annonce.ville && (
              <p className="text-[var(--muted)] flex items-center gap-1 mb-4">
                <MapPin size={14} aria-hidden="true" />
                {annonce.adresse ? `${annonce.adresse}, ` : ''}{annonce.ville}
                {annonce.code_postal ? ` (${annonce.code_postal})` : ''}
              </p>
            )}

            {/* Caractéristiques */}
            <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4 border-t border-b border-[var(--border)]">
              <div>
                <dt className="text-xs text-[var(--muted)] uppercase tracking-wide">Prix</dt>
                <dd className="text-lg font-bold text-[var(--accent)]">
                  {formatPrix(annonce.prix_mensuel, annonce.charges_incluses)}
                </dd>
              </div>
              {annonce.surface_m2 && (
                <div>
                  <dt className="text-xs text-[var(--muted)] uppercase tracking-wide">Surface</dt>
                  <dd className="text-lg font-semibold text-[var(--fg)]">{annonce.surface_m2} m²</dd>
                </div>
              )}
              {annonce.charges_mensuelles && !annonce.charges_incluses && (
                <div>
                  <dt className="text-xs text-[var(--muted)] uppercase tracking-wide">Charges</dt>
                  <dd className="text-lg font-semibold text-[var(--fg)]">{annonce.charges_mensuelles} €/mois</dd>
                </div>
              )}
              {annonce.disponible_le && (
                <div>
                  <dt className="text-xs text-[var(--muted)] uppercase tracking-wide">Disponible le</dt>
                  <dd className="text-sm font-semibold text-[var(--fg)]">
                    {new Date(annonce.disponible_le).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </dd>
                </div>
              )}
            </dl>
          </section>

          {/* Description */}
          {annonce.description && (
            <section aria-label="Description">
              <h2 className="text-lg font-bold text-[var(--fg)] mb-3">Description</h2>
              <p className="text-[var(--fg)] leading-relaxed whitespace-pre-line">{annonce.description}</p>
            </section>
          )}

          {/* Carte */}
          <MapBlock
            adresse={annonce.adresse}
            ville={annonce.ville}
            codePostal={annonce.code_postal}
          />
        </div>

        {/* Col droite : bailleur + contact */}
        <aside className="flex flex-col gap-5 self-start sticky top-24" aria-label="Propriétaire et contact">
          {/* Contact card */}
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-xl)] p-5 shadow-[var(--shadow-md)]">
            <p className="text-xl font-bold text-[var(--accent)] mb-1">
              {formatPrix(annonce.prix_mensuel, annonce.charges_incluses)}
            </p>
            {annonce.charges_incluses && (
              <p className="text-xs text-[var(--muted)] mb-4">Charges incluses</p>
            )}

            {/* Bailleur */}
            {bailleur && (
              <div className="flex items-center gap-3 mb-5 pb-5 border-b border-[var(--border)]">
                <Avatar
                  src={bailleur.photo_url ?? undefined}
                  name={`${bailleur.prenom ?? ''} ${bailleur.nom ?? ''}`.trim()}
                  size="md"
                />
                <div>
                  <p className="text-sm font-semibold text-[var(--fg)]">
                    {bailleur.prenom} {bailleur.nom}
                  </p>
                  <div className="flex items-center gap-1">
                    <StarRating value={4} readOnly size="sm" />
                    <span className="text-xs text-[var(--muted)]">Propriétaire</span>
                  </div>
                </div>
              </div>
            )}

            {/* CTA */}
            {isBailleur ? (
              <p className="text-xs text-[var(--muted)] text-center py-2">
                Les bailleurs ne peuvent pas contacter d'autres bailleurs.
              </p>
            ) : (
              <Button
                onClick={handleContact}
                className="w-full"
                size="lg"
                disabled={!annonce.disponible}
              >
                {!user
                  ? 'Se connecter pour contacter'
                  : !annonce.disponible
                  ? 'Logement indisponible'
                  : 'Contacter le propriétaire'}
              </Button>
            )}

            {!user && (
              <p className="text-xs text-[var(--muted)] text-center mt-3">
                <Link to="/inscription" className="text-[var(--accent)] hover:underline">Créer un compte</Link>
                {' '}pour sauvegarder cette annonce.
              </p>
            )}
          </div>

          {/* Infos pratiques */}
          <div className="bg-[var(--surface2)] rounded-[var(--radius-lg)] p-4 text-sm text-[var(--muted)]">
            <p className="font-medium text-[var(--fg)] mb-2">📋 Infos pratiques</p>
            <ul className="space-y-1">
              <li>✓ Annonce vérifiée</li>
              <li>✓ Réponse sous 24 h en moyenne</li>
              <li>✓ Visites possibles sur rendez-vous</li>
            </ul>
          </div>
        </aside>
      </div>

      {/* Annonces similaires */}
      {similaires.length > 0 && (
        <section className="mt-16" aria-label="Annonces similaires">
          <h2 className="text-xl font-bold text-[var(--fg)] mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            Logements similaires à {annonce.ville}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {similaires.map(sim => (
              <AnnonceCard key={sim.id} annonce={sim} />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
