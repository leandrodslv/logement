import { useState, useEffect, useCallback } from 'react'
import { lsGet, lsSet, uid } from '../lib/store'
import { MOCK_PROFILES } from '../lib/mockData'
import type { Profile, UserRole } from '../types'

interface StoredUser { id: string; email: string; password: string }
export interface AuthUser { id: string; email: string }

function seedProfiles() {
  const profiles = lsGet<Record<string, Profile>>('profiles', {})
  let changed = false
  for (const p of MOCK_PROFILES) {
    if (!profiles[p.id]) { profiles[p.id] = p; changed = true }
  }
  if (changed) lsSet('profiles', profiles)
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(() => lsGet('current_user', null))
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => { seedProfiles() }, [])

  useEffect(() => {
    if (user) {
      const profiles = lsGet<Record<string, Profile>>('profiles', {})
      setProfile(profiles[user.id] ?? null)
    } else {
      setProfile(null)
    }
    setLoading(false)
  }, [user])

  const signUp = useCallback(async (email: string, password: string, role: UserRole, prenom: string, nom: string) => {
    const users = lsGet<StoredUser[]>('users', [])
    if (users.find(u => u.email === email)) {
      return { error: { message: 'Un compte existe déjà avec cet email' } }
    }
    const id = uid()
    lsSet('users', [...users, { id, email, password }])
    const newProfile: Profile = { id, role, prenom, nom, email, photo_url: null, bio: null, created_at: new Date().toISOString() }
    const profiles = lsGet<Record<string, Profile>>('profiles', {})
    lsSet('profiles', { ...profiles, [id]: newProfile })
    const currentUser: AuthUser = { id, email }
    lsSet('current_user', currentUser)
    setUser(currentUser)
    setProfile(newProfile)
    return { data: currentUser }
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    const users = lsGet<StoredUser[]>('users', [])
    const found = users.find(u => u.email === email && u.password === password)
    if (!found) return { error: { message: 'Email ou mot de passe incorrect' } }
    const currentUser: AuthUser = { id: found.id, email: found.email }
    lsSet('current_user', currentUser)
    setUser(currentUser)
    return { data: currentUser }
  }, [])

  // Prototype: Google OAuth simulated locally — creates/reuses a demo account
  const signInWithGoogle = useCallback(async (role?: UserRole) => {
    const email = 'demo.google@prototype.local'
    const users = lsGet<StoredUser[]>('users', [])
    let found = users.find(u => u.email === email)
    if (!found) {
      const id = uid()
      found = { id, email, password: '' }
      lsSet('users', [...users, found])
      const newProfile: Profile = { id, role: role ?? 'etudiant', prenom: 'Demo', nom: 'Google', email, photo_url: null, bio: null, created_at: new Date().toISOString() }
      const profiles = lsGet<Record<string, Profile>>('profiles', {})
      lsSet('profiles', { ...profiles, [id]: newProfile })
    }
    const currentUser: AuthUser = { id: found.id, email }
    lsSet('current_user', currentUser)
    setUser(currentUser)
    return { error: null }
  }, [])

  const signOut = useCallback(async () => {
    lsSet('current_user', null)
    setUser(null)
    setProfile(null)
  }, [])

  const resetPassword = useCallback(async (_email: string) => {
    // Prototype: always succeeds
    return { error: null }
  }, [])

  return {
    user,
    profile,
    loading,
    error: null,
    isAuthenticated: !!user,
    isEtudiant: profile?.role === 'etudiant',
    isBailleur: profile?.role === 'bailleur',
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPassword,
  }
}
