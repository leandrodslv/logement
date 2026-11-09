-- Migration 002 : Row Level Security (RLS)
-- Active RLS sur toutes les tables et définit les politiques d'accès

-- ─────────────────────────────────────────
-- Activer RLS
-- ─────────────────────────────────────────
ALTER TABLE profiles  ENABLE ROW LEVEL SECURITY;
ALTER TABLE annonces  ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages  ENABLE ROW LEVEL SECURITY;
ALTER TABLE avis      ENABLE ROW LEVEL SECURITY;

-- ─────────────────────────────────────────
-- HELPER : récupérer le rôle de l'utilisateur courant
-- ─────────────────────────────────────────
CREATE OR REPLACE FUNCTION get_current_user_role()
RETURNS text
LANGUAGE sql STABLE SECURITY DEFINER
AS $$
  SELECT role FROM profiles WHERE id = auth.uid()
$$;

-- ─────────────────────────────────────────
-- POLITIQUES : profiles
-- ─────────────────────────────────────────

-- Lecture publique (champs non sensibles exposés via vue si besoin)
CREATE POLICY "profiles_select_public"
  ON profiles FOR SELECT
  USING (true);

-- Insertion : uniquement pour soi-même après inscription
CREATE POLICY "profiles_insert_own"
  ON profiles FOR INSERT
  WITH CHECK (id = auth.uid());

-- Mise à jour : uniquement son propre profil
CREATE POLICY "profiles_update_own"
  ON profiles FOR UPDATE
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- Suppression : uniquement son propre profil
CREATE POLICY "profiles_delete_own"
  ON profiles FOR DELETE
  USING (id = auth.uid());

-- ─────────────────────────────────────────
-- POLITIQUES : annonces
-- ─────────────────────────────────────────

-- Lecture publique — tout le monde peut voir les annonces
CREATE POLICY "annonces_select_public"
  ON annonces FOR SELECT
  USING (true);

-- Insertion : UNIQUEMENT les bailleurs (règle clef métier)
CREATE POLICY "annonces_insert_bailleur_only"
  ON annonces FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL
    AND get_current_user_role() = 'bailleur'
    AND bailleur_id = auth.uid()
  );

-- Mise à jour : uniquement le bailleur propriétaire
CREATE POLICY "annonces_update_own"
  ON annonces FOR UPDATE
  USING (bailleur_id = auth.uid())
  WITH CHECK (bailleur_id = auth.uid());

-- Suppression : uniquement le bailleur propriétaire
CREATE POLICY "annonces_delete_own"
  ON annonces FOR DELETE
  USING (bailleur_id = auth.uid());

-- ─────────────────────────────────────────
-- POLITIQUES : messages
-- ─────────────────────────────────────────

-- Lecture : expéditeur ou destinataire uniquement
CREATE POLICY "messages_select_participants"
  ON messages FOR SELECT
  USING (
    auth.uid() = expediteur_id
    OR auth.uid() = destinataire_id
  );

-- Insertion : règle clef — un bailleur ne peut pas initier une conversation
-- Il peut uniquement répondre (c'est-à-dire qu'un message étudiant existe déjà sur cette annonce)
CREATE POLICY "messages_insert_etudiant_initiates"
  ON messages FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL
    AND expediteur_id = auth.uid()
    AND (
      -- Un étudiant peut toujours envoyer le premier message
      get_current_user_role() = 'etudiant'
      OR
      -- Un bailleur peut répondre uniquement si un étudiant a déjà écrit sur cette annonce
      (
        get_current_user_role() = 'bailleur'
        AND EXISTS (
          SELECT 1 FROM messages m
          JOIN profiles p ON p.id = m.expediteur_id
          WHERE m.annonce_id = messages.annonce_id
            AND p.role = 'etudiant'
        )
      )
    )
  );

-- Mise à jour : marquer comme lu — destinataire uniquement
CREATE POLICY "messages_update_lu"
  ON messages FOR UPDATE
  USING (destinataire_id = auth.uid())
  WITH CHECK (destinataire_id = auth.uid());

-- Suppression : non autorisée (audit trail)
-- (pas de DELETE policy = personne ne peut supprimer)

-- ─────────────────────────────────────────
-- POLITIQUES : avis
-- ─────────────────────────────────────────

-- Lecture publique
CREATE POLICY "avis_select_public"
  ON avis FOR SELECT
  USING (true);

-- Insertion : authentifié uniquement, auteur = soi-même
CREATE POLICY "avis_insert_own"
  ON avis FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL
    AND auteur_id = auth.uid()
  );

-- Mise à jour : son propre avis uniquement
CREATE POLICY "avis_update_own"
  ON avis FOR UPDATE
  USING (auteur_id = auth.uid())
  WITH CHECK (auteur_id = auth.uid());

-- Suppression : son propre avis uniquement
CREATE POLICY "avis_delete_own"
  ON avis FOR DELETE
  USING (auteur_id = auth.uid());

-- ─────────────────────────────────────────
-- TRIGGER : créer automatiquement un profil après inscription
-- ─────────────────────────────────────────
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO profiles (id, email, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'etudiant')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
