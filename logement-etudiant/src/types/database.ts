export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          role: 'etudiant' | 'bailleur'
          prenom: string | null
          nom: string | null
          email: string | null
          photo_url: string | null
          bio: string | null
          created_at: string
        }
        Insert: {
          id: string
          role: 'etudiant' | 'bailleur'
          prenom?: string | null
          nom?: string | null
          email?: string | null
          photo_url?: string | null
          bio?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          role?: 'etudiant' | 'bailleur'
          prenom?: string | null
          nom?: string | null
          email?: string | null
          photo_url?: string | null
          bio?: string | null
        }
      }
      annonces: {
        Row: {
          id: string
          bailleur_id: string
          titre: string
          description: string | null
          type_logement: 'studio' | 'T1' | 'T2' | 'T3+' | 'colocation' | 'chambre' | null
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
        }
        Insert: {
          id?: string
          bailleur_id: string
          titre: string
          description?: string | null
          type_logement?: 'studio' | 'T1' | 'T2' | 'T3+' | 'colocation' | 'chambre' | null
          ville?: string | null
          adresse?: string | null
          code_postal?: string | null
          prix_mensuel: number
          charges_incluses?: boolean
          charges_mensuelles?: number | null
          surface_m2?: number | null
          meuble?: boolean
          disponible_le?: string | null
          disponible?: boolean
          photos?: string[]
          source?: 'direct' | 'leboncoin' | 'seloger' | 'pap' | 'laforet' | 'orpi' | 'century21' | 'bien-ici' | null
        }
        Update: {
          titre?: string
          description?: string | null
          type_logement?: 'studio' | 'T1' | 'T2' | 'T3+' | 'colocation' | 'chambre' | null
          ville?: string | null
          adresse?: string | null
          code_postal?: string | null
          prix_mensuel?: number
          charges_incluses?: boolean
          charges_mensuelles?: number | null
          surface_m2?: number | null
          meuble?: boolean
          disponible_le?: string | null
          disponible?: boolean
          photos?: string[]
          source?: 'direct' | 'leboncoin' | 'seloger' | 'pap' | 'laforet' | 'orpi' | 'century21' | 'bien-ici' | null
        }
      }
      messages: {
        Row: {
          id: string
          annonce_id: string
          expediteur_id: string
          destinataire_id: string
          contenu: string
          lu: boolean
          created_at: string
        }
        Insert: {
          id?: string
          annonce_id: string
          expediteur_id: string
          destinataire_id: string
          contenu: string
          lu?: boolean
        }
        Update: {
          lu?: boolean
        }
      }
      avis: {
        Row: {
          id: string
          auteur_id: string
          cible_id: string
          note: number
          commentaire: string | null
          created_at: string
        }
        Insert: {
          id?: string
          auteur_id: string
          cible_id: string
          note: number
          commentaire?: string | null
        }
        Update: {
          note?: number
          commentaire?: string | null
        }
      }
    }
  }
}
