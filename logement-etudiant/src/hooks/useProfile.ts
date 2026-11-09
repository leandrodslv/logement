import { useEffect, useState, useCallback } from 'react'
import { lsGet, lsSet } from '../lib/store'
import type { Profile, Avis } from '../types'

function getProfiles(): Record<string, Profile> {
  return lsGet<Record<string, Profile>>('profiles', {})
}

export function useProfile(userId: string | undefined) {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [avis, setAvis] = useState<Avis[]>([])
  const [averageNote, setAverageNote] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [error] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) { setLoading(false); return }
    const profiles = getProfiles()
    setProfile(profiles[userId] ?? null)
    const allAvis = lsGet<Avis[]>('avis', [])
    const userAvis = allAvis.filter(a => a.cible_id === userId)
    setAvis(userAvis)
    if (userAvis.length > 0) {
      setAverageNote(userAvis.reduce((s, a) => s + a.note, 0) / userAvis.length)
    }
    setLoading(false)
  }, [userId])

  const updateProfile = useCallback(async (updates: Partial<Profile>) => {
    if (!userId) return { error: 'Non authentifié' }
    const profiles = getProfiles()
    const updated = { ...profiles[userId], ...updates } as Profile
    lsSet('profiles', { ...profiles, [userId]: updated })
    setProfile(updated)
    return { error: null }
  }, [userId])

  // Prototype: store photo as base64 data URL
  const uploadPhoto = useCallback(async (file: File) => {
    if (!userId) return { error: 'Non authentifié' }
    return new Promise<{ error: string | null }>(resolve => {
      const reader = new FileReader()
      reader.onload = async e => {
        const dataUrl = e.target?.result as string
        const result = await updateProfile({ photo_url: dataUrl })
        resolve(result)
      }
      reader.onerror = () => resolve({ error: 'Erreur lecture fichier' })
      reader.readAsDataURL(file)
    })
  }, [userId, updateProfile])

  return { profile, avis, averageNote, loading, error, updateProfile, uploadPhoto }
}

export function useAvis(currentUserId: string | undefined) {
  const submitAvis = useCallback(async (cibleId: string, note: number, commentaire: string) => {
    if (!currentUserId) return { error: 'Non authentifié' }
    const allAvis = lsGet<Avis[]>('avis', [])
    const existing = allAvis.find(a => a.auteur_id === currentUserId && a.cible_id === cibleId)
    if (existing) {
      lsSet('avis', allAvis.map(a => a.auteur_id === currentUserId && a.cible_id === cibleId
        ? { ...a, note, commentaire, created_at: new Date().toISOString() }
        : a))
    } else {
      lsSet('avis', [...allAvis, {
        id: crypto.randomUUID(),
        auteur_id: currentUserId,
        cible_id: cibleId,
        note,
        commentaire,
        created_at: new Date().toISOString(),
      }])
    }
    return { error: null }
  }, [currentUserId])

  return { submitAvis }
}
