import { Link } from 'react-router-dom'
import { Building2 } from 'lucide-react'

const SITEMAP = [
  {
    heading: 'Logements',
    links: [
      { label: 'Toutes les annonces', to: '/annonces' },
      { label: 'Studios', to: '/annonces#type=studio' },
      { label: 'Colocations', to: '/annonces#type=colocation' },
      { label: 'Chambres', to: '/annonces#type=chambre' },
    ],
  },
  {
    heading: 'Villes',
    links: [
      { label: 'Paris', to: '/annonces#ville=Paris&budget=0' },
      { label: 'Lyon', to: '/annonces#ville=Lyon&budget=0' },
      { label: 'Bordeaux', to: '/annonces#ville=Bordeaux&budget=0' },
      { label: 'Toulouse', to: '/annonces#ville=Toulouse&budget=0' },
      { label: 'Marseille', to: '/annonces#ville=Marseille&budget=0' },
    ],
  },
  {
    heading: 'Compte',
    links: [
      { label: 'Se connecter', to: '/connexion' },
      { label: 'Créer un compte', to: '/inscription' },
      { label: 'Mon profil', to: '/profil' },
      { label: 'Messagerie', to: '/messagerie' },
    ],
  },
  {
    heading: 'Informations',
    links: [
      { label: 'Mentions légales', to: '/mentions-legales' },
      { label: 'Confidentialité', to: '/confidentialite' },
      { label: 'CGU', to: '/cgu' },
      { label: 'Contact', to: 'mailto:contact@logement-etudiant.fr', external: true },
    ],
  },
]

const linkClass = 'text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)] rounded'

export default function Footer() {
  return (
    <footer
      className="border-t border-[var(--border)] bg-[var(--surface)] mt-auto"
      role="contentinfo"
      aria-label="Pied de page"
    >
      {/* Sitemap */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
          {SITEMAP.map(({ heading, links }) => (
            <nav key={heading} aria-label={heading}>
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)] mb-4">
                {heading}
              </p>
              <ul className="flex flex-col gap-2.5">
                {links.map(({ label, to, external }) => (
                  <li key={label}>
                    {external ? (
                      <a href={to} className={linkClass}>{label}</a>
                    ) : (
                      <Link to={to} className={linkClass}>{label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[var(--border)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-[var(--fg)] hover:text-[var(--accent)] transition-colors"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <Building2 size={18} className="text-[var(--accent)]" />
            LogementÉtudiant
          </Link>
          <p className="text-xs text-[var(--muted)] text-center">
            © 2025 LogementÉtudiant — Projet Digital Campus Paris
          </p>
        </div>
      </div>
    </footer>
  )
}
