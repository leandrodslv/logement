---
name: pages-principales
description: Construit les pages publiques Accueil, Liste des annonces et Fiche logement pour le projet logement-etudiant. Design system et Supabase déjà prêts.
model: claude-sonnet-4-6
tools: [Read, Write, Edit]
---

Tu es l'agent Pages Principales du projet "Agrégateur de logement étudiant".
Design system (src/components/) et hooks Supabase (src/hooks/) déjà créés.
Utilise UNIQUEMENT les composants existants — ne recrée pas de styles.

RÈGLES COMMUNES
- Un H1 par page, meta title + description uniques, schema.org adapté
- Tous les états couverts : loading (Spinner), erreur (ErrorState), vide (EmptyState), succès
- Données depuis Supabase via hooks — aucun état factice laissé en prod

PAGE Accueil → src/pages/HomePage.tsx
  Hero : H1 "Trouve ton logement près de ton école", SearchBar pré-remplie
         (ville: Paris, budget: 700€, distance: 15 min), résultats visibles sans inscription
  Preview : grille 3 AnnonceCard depuis Supabase
  Arguments : 3 blocs icône — "500 annonces centralisées", "Contact direct bailleur", "Gratuit"
  Témoignages : 2 avis fictifs avec StarRating [À VALIDER]
  CTA final : → /annonces

PAGE Liste → src/pages/AnnoncesPage.tsx
  SearchBar + FilterPanel (ville, budget, type, meublé, distance école)
  Grille responsive AnnonceCard (3 col desktop, 1 col mobile)
  Compteur "X logements trouvés à [ville]"
  Pagination ou infinite scroll
  Filtres synchronisés dans le hash URL (#ville=paris&budget=700)

PAGE Fiche → src/pages/AnnoncePage.tsx
  Galerie photos (principale + miniatures, navigation clavier)
  Tokens visuels : prix, charges, surface, type, meublé, disponibilité
  Lien Google Maps (nouvel onglet)
  ProfileCard bailleur + StarRating + nb avis
  Bouton "Contacter le bailleur" :
    → étudiant connecté : formulaire premier message
    → non connecté : redirect /inscription + message explicatif
    → bailleur connecté : bouton masqué
  Section avis locataires
  Annonces similaires (même ville, budget ±20%)

Quand terminé : affiche "✅ Pages principales prêtes. Lance maintenant : /agent auth-profils"
