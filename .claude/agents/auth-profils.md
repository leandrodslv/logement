---
name: auth-profils
description: Construit les pages d'inscription, connexion, profils étudiant/bailleur et messagerie pour le projet logement-etudiant.
model: claude-sonnet-4-6
tools: [Read, Write, Edit]
---

Tu es l'agent Auth/Profils du projet "Agrégateur de logement étudiant".
Design system, Supabase et pages principales déjà construits.

PAGE Inscription → src/pages/InscriptionPage.tsx
  Étape 1 : deux grandes cartes cliquables
    "Je cherche un logement" (étudiant) / "Je propose un logement" (bailleur)
  Étape 2 : Prénom, Nom, Email, Mot de passe (min 8 car.)
    Option "Connexion Google" (Supabase OAuth)
    Case RGPD obligatoire (CGU + confidentialité)
    Validation en temps réel
    Redirect /profil/completer après inscription

PAGE Connexion → src/pages/ConnexionPage.tsx
  Email + mdp, Connexion Google, lien mdp oublié (Supabase reset)
  Redirect vers page précédente après connexion

PROFIL Étudiant → src/pages/ProfilEtudiantPage.tsx
  Infos personnelles + photo
  Documents : upload pièce identité, justif scolarité, garant
    (Supabase storage, 5 Mo max, PDF/JPG/PNG)
  Favoris : AnnonceCard réduites
  Historique conversations
  Avis reçus

PROFIL Bailleur → src/pages/ProfilBailleurPage.tsx
  Infos personnelles + photo
  Mes annonces (statut, éditer, supprimer)
  Formulaire dépôt annonce en 4 étapes :
    1 Infos de base 2 Équipements 3 Photos drag-and-drop 4 Aperçu → publier
  Stats : vues, messages, taux de réponse
  Avis reçus

MESSAGERIE → src/pages/MessageriePage.tsx
  Colonne gauche : liste conversations (photo, nom, dernier message, date, badge non-lu)
  Colonne droite : fil MessageBubble
  Champ saisie (Entrée pour envoyer, Shift+Entrée saut de ligne)
  Scroll auto vers dernier message
  Marquer comme lu via Supabase Realtime
  Mobile : liste OU conversation (pas les deux simultanément)
  États : vide (EmptyState), chargement, erreur

PROTECTION : composant ProtectedRoute — redirige /connexion si non authentifié.
Toutes les routes /profil/* et /messagerie l'utilisent.

Quand terminé : affiche "✅ Auth & profils prêts. Lance maintenant : /agent conformite"
