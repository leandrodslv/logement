export type UserRole = 'etudiant' | 'bailleur'

export interface Profile {
  id: string
  role: UserRole
  prenom: string | null
  nom: string | null
  email: string | null
  photo_url: string | null
  bio: string | null
  created_at: string
}

export interface Annonce {
  id: string
  bailleur_id: string
  titre: string
  description: string | null
  type_logement: 'studio' | 'T1' | 'T2' | 'T3+' | 'colocation' | 'chambre'
  ville: string | null
  adresse: string | null
  code_postal: string | null
  prix_mensuel: number
  charges_incluses: boolean
  charges_mensuelles: number | null
  surface_m2: number | null
  meuble: boolean
  disponible_le: string | null
  disponible: boolean
  photos: string[]
  source: 'direct' | 'leboncoin' | 'seloger' | 'pap' | 'laforet' | 'orpi' | 'century21' | 'bien-ici' | null
  created_at: string
  bailleur?: Profile
}

export interface Message {
  id: string
  annonce_id: string
  expediteur_id: string
  destinataire_id: string
  contenu: string
  lu: boolean
  created_at: string
  expediteur?: Profile
  destinataire?: Profile
}

export interface Avis {
  id: string
  auteur_id: string
  cible_id: string
  note: number
  commentaire: string | null
  created_at: string
  auteur?: Profile
}

export interface AnnonceFilters {
  ville?: string
  budget_max?: number
  type_logement?: Annonce['type_logement']
  meuble?: boolean
  disponible?: boolean
}
