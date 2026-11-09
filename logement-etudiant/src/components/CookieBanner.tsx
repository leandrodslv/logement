import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/Button'

const COOKIE_KEY = 'logement_etudiant_cookie_consent'

type ConsentValue = 'accepted' | 'refused'

export default function CookieBanner() {
  const [visible, setVisible] = useState(() => !localStorage.getItem(COOKIE_KEY))

  const handleChoice = (choice: ConsentValue) => {
    localStorage.setItem(COOKIE_KEY, choice)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Gestion des cookies"
      aria-live="polite"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
    >
      <div className="max-w-3xl mx-auto bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-xl)] shadow-[var(--shadow-lg)] p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="flex-1">
            <p className="text-sm font-semibold text-[var(--fg)] mb-1">
              Nous utilisons des cookies
            </p>
            <p className="text-sm text-[var(--muted)]">
              Ce site utilise des cookies analytiques pour mesurer l'audience et améliorer votre expérience. Aucun traceur n'est activé avant votre consentement.{' '}
              <Link
                to="/confidentialite"
                className="text-[var(--accent)] underline underline-offset-2 hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)] rounded"
              >
                En savoir plus
              </Link>
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center flex-shrink-0">
            <Button
              variant="secondary"
              size="md"
              onClick={() => handleChoice('refused')}
              aria-label="Refuser les cookies non essentiels"
              className="w-full sm:w-auto"
            >
              Refuser
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => handleChoice('accepted')}
              aria-label="Accepter les cookies"
              className="w-full sm:w-auto"
            >
              Accepter
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
