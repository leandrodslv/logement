import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'

export default function NotFoundPage() {
  return (
    <main
      id="main-content"
      className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-16 text-center"
    >
      <span className="text-7xl mb-6" role="img" aria-label="Maison avec un point d'interrogation">
        🏠❓
      </span>
      <h1
        className="text-4xl font-bold text-[var(--fg)] mb-3"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Page introuvable
      </h1>
      <p className="text-lg text-[var(--muted)] mb-2">
        Oops ! La page que vous cherchez n'existe pas ou a été déplacée.
      </p>
      <p className="text-sm text-[var(--muted)] mb-8">Code d'erreur : 404</p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link to="/">
          <Button size="lg">Retour à l'accueil</Button>
        </Link>
        <Link to="/annonces">
          <Button variant="secondary" size="lg">Voir les annonces</Button>
        </Link>
      </div>
    </main>
  )
}
