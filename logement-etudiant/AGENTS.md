# Agents Claude Code — Logement Étudiant

Projet : Agrégateur de logement étudiant  
Équipe : Léandro, Matti, Emmanuel — Digital Campus Paris  
Stack : React 19 + TypeScript + Tailwind CSS v4 + Supabase

## Ordre de lancement

| # | Commande | Périmètre | Prérequis |
|---|----------|-----------|-----------|
| 0 | `/agent orchestrateur` | Init projet, structure, routes, types | Projet vide ✅ |
| 1 | `/agent design-system` | tokens.css, 10 composants UI, 6 composants métier | Orchestrateur ✅ |
| 2 | `/agent supabase` | SQL migrations, RLS, seed, 4 hooks React | Orchestrateur ✅ |
| 3 | `/agent pages-principales` | HomePage, AnnoncesPage, AnnoncePage | Design system + Supabase ✅ |
| 4 | `/agent auth-profils` | Inscription, Connexion, Profils, Messagerie | Pages principales ✅ |
| 5 | `/agent conformite` | Navbar, Footer, Cookies CNIL, Mentions légales, CGU, 404 | Tous les agents précédents ✅ |

## Règles de rôle (non négociables)

- **Étudiant** : peut chercher, contacter un bailleur, déposer des avis — **ne peut PAS créer d'annonce**
- **Bailleur** : peut créer des annonces, répondre aux messages — **ne peut PAS initier une conversation**
- Ces règles sont enforced côté SQL (RLS) ET côté React (UI conditionnelle)

## Sécurité

- Variables d'environnement : `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` uniquement
- Jamais de clé secrète côté navigateur
- Opérations `service_role` : backend uniquement (Edge Functions Supabase si nécessaire)

## Structure du projet

```
src/
├── components/
│   ├── ui/          # Button, Input, Card, Badge, Avatar, Spinner, EmptyState, ErrorState, Modal, Tabs
│   ├── AnnonceCard, SearchBar, FilterPanel, StarRating, MessageBubble, ProfileCard
│   ├── Navbar, Footer, CookieBanner, ProtectedRoute
├── pages/           # Une page = un fichier = une route
├── hooks/           # useAuth, useAnnonces, useMessages, useProfile
├── lib/             # supabase.ts, utils.ts
├── styles/          # tokens.css
└── types/           # index.ts, database.ts
supabase/
├── migrations/      # 001_init.sql, 002_rls.sql
└── seed.sql
```
