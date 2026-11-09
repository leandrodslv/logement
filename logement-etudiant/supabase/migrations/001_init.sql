-- Migration 001 : Initialisation du schéma
-- Projet : Agrégateur de logement étudiant

-- Extension pour UUID
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─────────────────────────────────────────
-- TABLE : profiles
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS profiles (
  id          uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  role        text NOT NULL CHECK (role IN ('etudiant', 'bailleur')),
  prenom      text,
  nom         text,
  email       text,
  photo_url   text,
  bio         text,
  created_at  timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE profiles IS 'Profils utilisateurs (étudiants et bailleurs)';
COMMENT ON COLUMN profiles.role IS 'etudiant = chercheur de logement ; bailleur = propriétaire';

-- ─────────────────────────────────────────
-- TABLE : annonces
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS annonces (
  id                   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bailleur_id          uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  titre                text NOT NULL,
  description          text,
  type_logement        text CHECK (type_logement IN ('studio','T1','T2','T3+','colocation','chambre')),
  ville                text,
  adresse              text,
  code_postal          text,
  prix_mensuel         numeric(10,2) NOT NULL,
  charges_incluses     boolean NOT NULL DEFAULT false,
  charges_mensuelles   numeric(10,2),
  surface_m2           numeric(6,2),
  meuble               boolean NOT NULL DEFAULT false,
  disponible_le        date,
  disponible           boolean NOT NULL DEFAULT true,
  photos               text[] NOT NULL DEFAULT '{}',
  created_at           timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE annonces IS 'Annonces de logement publiées par les bailleurs';
COMMENT ON COLUMN annonces.charges_incluses IS 'true = CC (charges comprises), false = HC (hors charges)';

-- ─────────────────────────────────────────
-- TABLE : messages
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS messages (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  annonce_id       uuid NOT NULL REFERENCES annonces(id) ON DELETE CASCADE,
  expediteur_id    uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  destinataire_id  uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  contenu          text NOT NULL,
  lu               boolean NOT NULL DEFAULT false,
  created_at       timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT messages_different_users CHECK (expediteur_id <> destinataire_id)
);

COMMENT ON TABLE messages IS 'Messagerie directe étudiant ↔ bailleur liée à une annonce';

-- Index pour requêtes par conversation
CREATE INDEX IF NOT EXISTS idx_messages_annonce ON messages(annonce_id);
CREATE INDEX IF NOT EXISTS idx_messages_expediteur ON messages(expediteur_id);
CREATE INDEX IF NOT EXISTS idx_messages_destinataire ON messages(destinataire_id);
CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(created_at DESC);

-- ─────────────────────────────────────────
-- TABLE : avis
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS avis (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auteur_id    uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  cible_id     uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  note         integer NOT NULL CHECK (note BETWEEN 1 AND 5),
  commentaire  text,
  created_at   timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT avis_different_users CHECK (auteur_id <> cible_id),
  CONSTRAINT avis_unique_par_cible UNIQUE (auteur_id, cible_id)
);

COMMENT ON TABLE avis IS 'Avis et notes laissés entre étudiants et bailleurs';

-- Index pour calcul de note moyenne
CREATE INDEX IF NOT EXISTS idx_avis_cible ON avis(cible_id);

-- Index pour annonces par ville et prix
CREATE INDEX IF NOT EXISTS idx_annonces_ville ON annonces(ville);
CREATE INDEX IF NOT EXISTS idx_annonces_prix ON annonces(prix_mensuel);
CREATE INDEX IF NOT EXISTS idx_annonces_dispo ON annonces(disponible) WHERE disponible = true;
CREATE INDEX IF NOT EXISTS idx_annonces_bailleur ON annonces(bailleur_id);
