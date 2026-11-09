import { useEffect, useState, useCallback } from 'react'
import { lsGet, lsSet } from '../lib/store'
import { MOCK_ANNONCES } from '../lib/mockData'
import type { Annonce, AnnonceFilters } from '../types'

const PAGE_SIZE = 12

function getAnnonces(): Annonce[] {
  const stored = lsGet<Annonce[]>('annonces', [])
  // Re-seed if empty or if seed annonces are missing photos (stale data)
  const seedIds = new Set(MOCK_ANNONCES.map(a => a.id))
  const hasStaleSeeds = stored.some(a => seedIds.has(a.id) && a.photos.length === 0)
  if (stored.length === 0 || hasStaleSeeds) {
    // Merge: keep user-created annonces, replace seed annonces with fresh data
    const userAnnonces = stored.filter(a => !seedIds.has(a.id))
    const merged = [...MOCK_ANNONCES, ...userAnnonces]
    lsSet('annonces', merged)
    return merged
  }
  return stored
}

function applyFilters(annonces: Annonce[], filters: AnnonceFilters): Annonce[] {
  return annonces.filter(a => {
    if (filters.disponible !== false && !a.disponible) return false
    if (filters.ville && !a.ville?.toLowerCase().includes(filters.ville.toLowerCase())) return false
    if (filters.budget_max && a.prix_mensuel > filters.budget_max) return false
    if (filters.type_logement && a.type_logement !== filters.type_logement) return false
    if (filters.meuble && !a.meuble) return false
    return true
  })
}

export function useAnnonces(filters: AnnonceFilters = {}, page = 1) {
  const [annonces, setAnnonces] = useState<Annonce[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error] = useState<string | null>(null)

  const fetchAnnonces = useCallback(() => {
    setLoading(true)
    const all = getAnnonces()
    const filtered = applyFilters(all, filters).sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    const from = (page - 1) * PAGE_SIZE
    setTotal(filtered.length)
    setAnnonces(filtered.slice(from, from + PAGE_SIZE))
    setLoading(false)
  }, [filters.ville, filters.budget_max, filters.type_logement, filters.meuble, filters.disponible, page]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { fetchAnnonces() }, [fetchAnnonces])

  return { annonces, total, loading, error, refetch: fetchAnnonces, pageSize: PAGE_SIZE }
}

export function useAnnonce(id: string | undefined) {
  const [annonce, setAnnonce] = useState<Annonce | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    const all = getAnnonces()
    const found = all.find(a => a.id === id) ?? null
    if (!found) setError('Annonce introuvable')
    setAnnonce(found)
    setLoading(false)
  }, [id])

  return { annonce, loading, error }
}

export function useAnnonceSimilaires(annonce: Annonce | null) {
  const [similaires, setSimilaires] = useState<Annonce[]>([])

  useEffect(() => {
    if (!annonce) return
    const all = getAnnonces()
    const result = all.filter(a =>
      a.id !== annonce.id &&
      a.disponible &&
      a.ville === annonce.ville &&
      a.prix_mensuel >= annonce.prix_mensuel * 0.8 &&
      a.prix_mensuel <= annonce.prix_mensuel * 1.2
    ).slice(0, 3)
    setSimilaires(result)
  }, [annonce])

  return similaires
}

export function createAnnonce(annonce: Omit<Annonce, 'id' | 'created_at' | 'bailleur'>): Annonce {
  const all = getAnnonces()
  const newAnnonce: Annonce = {
    ...annonce,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
  }
  lsSet('annonces', [...all, newAnnonce])
  return newAnnonce
}

export function deleteAnnonce(id: string): void {
  const all = getAnnonces()
  lsSet('annonces', all.filter(a => a.id !== id))
}
