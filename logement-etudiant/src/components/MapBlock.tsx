import { useEffect, useState } from 'react'
import { MapPin } from 'lucide-react'

interface MapBlockProps {
  adresse: string | null
  ville: string | null
  codePostal: string | null
}

interface Coords { lat: number; lon: number }

export function MapBlock({ adresse, ville, codePostal }: MapBlockProps) {
  const [coords, setCoords] = useState<Coords | null>(null)
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading')

  const query = [adresse, codePostal, ville, 'France'].filter(Boolean).join(', ')

  useEffect(() => {
    if (!ville) { setStatus('error'); return }
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`
    fetch(url, { headers: { 'Accept-Language': 'fr' } })
      .then(r => r.json())
      .then((data: Array<{ lat: string; lon: string }>) => {
        if (data.length > 0) {
          setCoords({ lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) })
          setStatus('ok')
        } else {
          setStatus('error')
        }
      })
      .catch(() => setStatus('error'))
  }, [query, ville])

  if (status === 'error') return null

  return (
    <section aria-label="Carte">
      <h2 className="text-lg font-bold text-[var(--fg)] mb-3 flex items-center gap-2">
        <MapPin size={18} className="text-[var(--accent)]" aria-hidden="true" />
        Localisation
      </h2>

      {status === 'loading' && (
        <div className="h-64 rounded-[var(--radius-lg)] bg-[var(--surface2)] flex items-center justify-center text-[var(--muted)] text-sm">
          Chargement de la carte…
        </div>
      )}

      {status === 'ok' && coords && (
        <div className="rounded-[var(--radius-lg)] overflow-hidden border border-[var(--border)] h-64">
          <iframe
            title="Localisation du logement"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${coords.lon - 0.01},${coords.lat - 0.007},${coords.lon + 0.01},${coords.lat + 0.007}&layer=mapnik&marker=${coords.lat},${coords.lon}`}
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>
      )}

      {status === 'ok' && coords && (
        <p className="text-xs text-[var(--muted)] mt-1 text-right">
          © <a
            href={`https://www.openstreetmap.org/?mlat=${coords.lat}&mlon=${coords.lon}#map=16/${coords.lat}/${coords.lon}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--accent)]"
          >OpenStreetMap</a> contributors
        </p>
      )}
    </section>
  )
}
