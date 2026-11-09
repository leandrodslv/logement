import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Building2 } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { Avatar } from './ui/Avatar'
import { Badge } from './ui/Badge'
import { Button } from './ui/Button'
import { useMessages } from '../hooks/useMessages'

function UnreadBadge({ userId }: { userId: string | undefined }) {
  const { unreadCount } = useMessages(undefined, userId)
  if (!unreadCount) return null
  return (
    <Badge
      variant="error"
      className="absolute -top-1 -right-2 min-w-[1.1rem] h-[1.1rem] flex items-center justify-center p-0 text-[10px]"
      aria-label={`${unreadCount} message${unreadCount > 1 ? 's' : ''} non lu${unreadCount > 1 ? 's' : ''}`}
    >
      {unreadCount > 9 ? '9+' : unreadCount}
    </Badge>
  )
}

export default function Navbar() {
  const { isAuthenticated, profile, signOut } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)

  const profilPath = profile?.role === 'bailleur' ? '/profil/bailleur' : '/profil/etudiant'

  const handleSignOut = async () => {
    await signOut()
    setMenuOpen(false)
    navigate('/')
  }

  useEffect(() => {
    if (!menuOpen) return
    function handleClick(e: MouseEvent) {
      if (
        menuRef.current && !menuRef.current.contains(e.target as Node) &&
        hamburgerRef.current && !hamburgerRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [menuOpen])

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)] rounded px-1 ${
      isActive ? 'text-[var(--accent)]' : 'text-[var(--fg)]'
    }`

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-md"
      role="banner"
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--accent)] focus:text-white focus:rounded-[var(--radius-md)] focus:text-sm focus:font-semibold"
      >
        Aller au contenu principal
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-lg text-[var(--fg)] hover:text-[var(--accent)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)] rounded"
          aria-label="LogementÉtudiant — Accueil"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          <Building2 size={20} className="text-[var(--accent)]" aria-hidden="true" />
          LogementÉtudiant
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Navigation principale">
          <NavLink to="/annonces" className={navLinkClass}>Annonces</NavLink>

          {isAuthenticated ? (
            <>
              <NavLink
                to="/messagerie"
                className={({ isActive }) => `relative inline-flex items-center gap-1 ${navLinkClass({ isActive })}`}
              >
                Messagerie
                <UnreadBadge userId={profile?.id} />
              </NavLink>
              <NavLink to={profilPath} className={navLinkClass}>Mon profil</NavLink>
              <div className="flex items-center gap-3 pl-3 border-l border-[var(--border)]">
                <Avatar
                  src={profile?.photo_url}
                  name={[profile?.prenom, profile?.nom].filter(Boolean).join(' ') || undefined}
                  size="sm"
                  alt={`Avatar de ${profile?.prenom ?? 'utilisateur'}`}
                />
                <span className="text-sm font-medium text-[var(--fg)]">
                  {profile?.prenom ?? 'Utilisateur'}
                </span>
                <span className="text-xs text-[var(--muted)] capitalize">{profile?.role}</span>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  Déconnexion
                </Button>
              </div>
            </>
          ) : (
            <>
              <NavLink to="/connexion" className={navLinkClass}>Connexion</NavLink>
              <Link to="/inscription">
                <Button size="sm">S'inscrire</Button>
              </Link>
            </>
          )}
        </nav>

        {/* Hamburger */}
        <button
          ref={hamburgerRef}
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-[var(--radius-md)] hover:bg-[var(--surface2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)] transition-colors"
          onClick={() => setMenuOpen(o => !o)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Fermer le menu de navigation' : 'Ouvrir le menu de navigation'}
        >
          <span className={`block w-5 h-0.5 bg-[var(--fg)] transition-transform duration-200 origin-center ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} aria-hidden="true" />
          <span className={`block w-5 h-0.5 bg-[var(--fg)] transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} aria-hidden="true" />
          <span className={`block w-5 h-0.5 bg-[var(--fg)] transition-transform duration-200 origin-center ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} aria-hidden="true" />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="md:hidden border-t border-[var(--border)] bg-[var(--surface)] px-4 py-4 flex flex-col gap-3"
          role="navigation"
          aria-label="Menu de navigation mobile"
        >
          {isAuthenticated && (
            <div className="flex items-center gap-3 pb-3 border-b border-[var(--border)]">
              <Avatar
                src={profile?.photo_url}
                name={[profile?.prenom, profile?.nom].filter(Boolean).join(' ') || undefined}
                size="md"
                alt={`Avatar de ${profile?.prenom ?? 'utilisateur'}`}
              />
              <div>
                <p className="text-sm font-semibold text-[var(--fg)]">{profile?.prenom} {profile?.nom}</p>
                <p className="text-xs text-[var(--muted)] capitalize">{profile?.role}</p>
              </div>
            </div>
          )}

          <NavLink to="/annonces" className={navLinkClass} onClick={() => setMenuOpen(false)}>
            Annonces
          </NavLink>

          {isAuthenticated ? (
            <>
              <NavLink
                to="/messagerie"
                className={({ isActive }) => `relative inline-flex items-center gap-2 ${navLinkClass({ isActive })}`}
                onClick={() => setMenuOpen(false)}
              >
                Messagerie
                <UnreadBadge userId={profile?.id} />
              </NavLink>
              <NavLink to={profilPath} className={navLinkClass} onClick={() => setMenuOpen(false)}>
                Mon profil
              </NavLink>
              <Button variant="ghost" size="sm" className="self-start mt-1" onClick={handleSignOut}>
                Déconnexion
              </Button>
            </>
          ) : (
            <>
              <NavLink to="/connexion" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                Connexion
              </NavLink>
              <Link to="/inscription" onClick={() => setMenuOpen(false)}>
                <Button size="sm" className="w-full">S'inscrire</Button>
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  )
}
