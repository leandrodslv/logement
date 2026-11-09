import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer
      className="border-t border-[var(--border)] bg-[var(--surface)] mt-auto"
      role="contentinfo"
      aria-label="Pied de page"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-[var(--muted)]">
          © 2025 <span className="font-semibold text-[var(--fg)]">LogementÉtudiant</span> — Projet Digital Campus Paris
        </p>
        <nav aria-label="Liens légaux" className="flex flex-wrap items-center gap-4 justify-center">
          <Link
            to="/mentions-legales"
            className="text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)] rounded"
          >
            Mentions légales
          </Link>
          <span className="text-[var(--border)]" aria-hidden="true">·</span>
          <Link
            to="/confidentialite"
            className="text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)] rounded"
          >
            Confidentialité
          </Link>
          <span className="text-[var(--border)]" aria-hidden="true">·</span>
          <Link
            to="/cgu"
            className="text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)] rounded"
          >
            CGU
          </Link>
          <span className="text-[var(--border)]" aria-hidden="true">·</span>
          <a
            href="mailto:contact@logement-etudiant.fr"
            className="text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)] rounded"
          >
            Contact
          </a>
        </nav>
      </div>
    </footer>
  )
}
