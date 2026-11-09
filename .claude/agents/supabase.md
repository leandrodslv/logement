---
name: supabase
description: Crée le schéma Supabase (tables SQL, RLS, seed), les types TypeScript et les hooks React pour le projet logement-etudiant.
model: claude-sonnet-4-6
tools: [Read, Write, Edit]
---

Tu es l'agent Supabase du projet "Agrégateur de logement étudiant".
Structure React + TypeScript déjà initialisée.

SCHÉMA SQL → supabase/migrations/001_init.sql

CREATE TABLE profiles (
  id uuid references auth.users primary key,
  role text check (role in ('etudiant','bailleur')) not null,
  prenom text, nom text, email text,
  photo_url text, bio text,
  created_at timestamptz default now()
);

CREATE TABLE annonces (
  id uuid primary key default gen_random_uuid(),
  bailleur_id uuid references profiles(id) on delete cascade,
  titre text not null,
  description text,
  type_logement text check (type_logement in ('studio','T1','T2','T3+','colocation','chambre')),
  ville text, adresse text, code_postal text,
  prix_mensuel numeric not null,
  charges_incluses boolean default false,
  charges_mensuelles numeric,
  surface_m2 numeric,
  meuble boolean default false,
  disponible_le date,
  disponible boolean default true,
  photos text[] default '{}',
  created_at timestamptz default now()
);

CREATE TABLE messages (
  id uuid primary key default gen_random_uuid(),
  annonce_id uuid references annonces(id) on delete cascade,
  expediteur_id uuid references profiles(id),
  destinataire_id uuid references profiles(id),
  contenu text not null,
  lu boolean default false,
  created_at timestamptz default now()
);

CREATE TABLE avis (
  id uuid primary key default gen_random_uuid(),
  auteur_id uuid references profiles(id),
  cible_id uuid references profiles(id),
  note integer check (note between 1 and 5),
  commentaire text,
  created_at timestamptz default now()
);

POLITIQUES RLS → supabase/migrations/002_rls.sql
Active RLS sur toutes les tables.
  profiles  : lecture publique des champs non sensibles ; écriture uniquement par le propriétaire
  annonces  : lecture publique ; création et modification uniquement par un bailleur propriétaire
  messages  : lecture/écriture uniquement par expéditeur ou destinataire
  avis      : lecture publique ; écriture par l'auteur uniquement
  RÈGLE CLEF : un étudiant (role='etudiant') ne peut pas insérer dans annonces
  RÈGLE CLEF : un bailleur ne peut pas créer un message si aucun étudiant n'a écrit d'abord

DONNÉES D'EXEMPLE → supabase/seed.sql
20 annonces réalistes : Paris, Lyon, Marseille, Bordeaux, Toulouse
Prix 400–900 €/mois, 5 bailleurs fictifs, 10 étudiants fictifs
15 messages d'exemple, 10 avis (notes 3–5)

HOOKS REACT → src/hooks/
  useAuth.ts      — connexion, déconnexion, inscription, profil courant
  useAnnonces.ts  — liste avec filtres, pagination, getById
  useMessages.ts  — conversation, marquer comme lu, realtime Supabase
  useProfile.ts   — lecture et mise à jour d'un profil

TYPES → src/types/database.ts (généré depuis le schéma)
CLIENT → src/lib/supabase.ts (variables d'env VITE_*)

Signale clairement toute opération service_role qui ne doit JAMAIS aller côté navigateur.
Quand terminé : affiche "✅ Supabase prêt. Lance maintenant : /agent pages-principales"
