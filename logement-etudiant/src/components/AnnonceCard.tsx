import { Link } from 'react-router-dom'
import { Home, MapPin, Heart } from 'lucide-react'
import { useFavoris } from '../hooks/useFavoris'
import { useAuth } from '../hooks/useAuth'
import { Badge } from './ui/Badge'
import { cn, formatPrix } from '../lib/utils'
import type { Annonce } from '../types'

const SOURCE_STYLES: Record<string, { label: string; color: string }> = {
  leboncoin:  { label: 'LeBonCoin',  color: '#f56b2a' },
  seloger:    { label: 'SeLoger',    color: '#0077c8' },
  pap:        { label: 'PAP',        color: '#e31c1c' },
  laforet:    { label: 'Laforêt',    color: '#00843d' },
  orpi:       { label: 'Orpi',       color: '#e30613' },
  century21:  { label: 'Century 21', color: '#c8972a' },
  'bien-ici': { label: 'Bien\'ici',  color: '#6c3f98' },
  direct:     { label: 'Direct',     color: '#64748b' },
}

function SourceBadge({ source }: { source: Annonce['source'] }) {
  if (!source) return null
  const s = SOURCE_STYLES[source]
  if (!s) return null
  if (source === 'direct') return null
  return (
    <span
      className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wide text-white"
      style={{ backgroundColor: s.color }}
    >
      {s.label}
    </span>
  )
}

interface AnnonceCardProps {
  annonce: Annonce
  className?: string
}

function AnnonceCard({ annonce, className }: AnnonceCardProps) {
  const photo = annonce.photos?.[0]
  const { isAuthenticated } = useAuth()
  const { isFavori, toggle } = useFavoris()

  return (
    <Link
      to={`/annonces/${annonce.id}`}
      className={cn(
        'group block bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] overflow-hidden',
        'shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:border-[var(--accent)]',
        'transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]',
        className,
      )}
      aria-label={`${annonce.titre} — ${formatPrix(annonce.prix_mensuel, annonce.charges_incluses)}`}
    >
      {/* Photo */}
      <div className="relative aspect-[4/3] bg-[var(--surface2)] overflow-hidden">
        {photo ? (
          <img
            src={photo}
            alt={annonce.titre}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[var(--muted)]">
            <Home size={40} aria-hidden="true" />
          </div>
        )}
        <div className="absolute top-2 right-2 flex flex-col items-end gap-1">
          <Badge variant={annonce.disponible ? 'success' : 'default'}>
            {annonce.disponible ? 'Disponible' : 'Indisponible'}
          </Badge>
          {isAuthenticated && (
            <button
              onClick={e => { e.preventDefault(); e.stopPropagation(); toggle(annonce.id) }}
              aria-label={isFavori(annonce.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-colors"
            >
              <Heart
                size={16}
                className={isFavori(annonce.id) ? 'text-red-400 fill-red-400' : 'text-white'}
              />
            </button>
          )}
        </div>
        {annonce.meuble && (
          <div className="absolute top-2 left-2">
            <Badge variant="info">Meublé</Badge>
          </div>
        )}
      </div>

      {/* Contenu */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-sm font-semibold text-[var(--fg)] line-clamp-1 group-hover:text-[var(--accent)] transition-colors">
            {annonce.titre}
          </h3>
          <div className="flex items-center gap-1 shrink-0">
            <SourceBadge source={annonce.source} />
            <Badge variant="default" className="capitalize">{annonce.type_logement}</Badge>
          </div>
        </div>

        {annonce.ville && (
          <p className="text-xs text-[var(--muted)] mb-3 flex items-center gap-1">
            <MapPin size={12} aria-hidden="true" />
            {annonce.ville}{annonce.code_postal ? ` (${annonce.code_postal})` : ''}
          </p>
        )}

        <div className="flex items-center justify-between">
          <p className="text-base font-bold text-[var(--accent)]">
            {formatPrix(annonce.prix_mensuel, annonce.charges_incluses)}
          </p>
          {annonce.surface_m2 && (
            <p className="text-xs text-[var(--muted)]">{annonce.surface_m2} m²</p>
          )}
        </div>
      </div>
    </Link>
  )
}

export { AnnonceCard, SourceBadge }
