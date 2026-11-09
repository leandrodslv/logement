import { useState, useEffect, useCallback } from 'react'
import { lsGet, lsSet } from '../lib/store'
import { useAuth } from './useAuth'

export function useFavoris() {
  const { user } = useAuth()
  const [favorisIds, setFavorisIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (!user) { setFavorisIds(new Set()); return }
    const all = lsGet<Record<string, string[]>>('favoris', {})
    setFavorisIds(new Set(all[user.id] ?? []))
  }, [user])

  const toggle = useCallback((annonceId: string) => {
    if (!user) return
    setFavorisIds(prev => {
      const next = new Set(prev)
      next.has(annonceId) ? next.delete(annonceId) : next.add(annonceId)
      const all = lsGet<Record<string, string[]>>('favoris', {})
      lsSet('favoris', { ...all, [user.id]: Array.from(next) })
      return next
    })
  }, [user])

  const isFavori = useCallback((annonceId: string) => favorisIds.has(annonceId), [favorisIds])

  return { favorisIds, isFavori, toggle }
}
