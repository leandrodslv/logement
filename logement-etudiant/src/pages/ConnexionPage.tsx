import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { useAuth } from '../hooks/useAuth'

type View = 'login' | 'reset'

export default function ConnexionPage() {
  const { signIn, signInWithGoogle, resetPassword } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/'

  const [view, setView] = useState<View>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [resetSent, setResetSent] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    const errs: typeof errors = {}
    if (!email.includes('@')) errs.email = 'Email invalide'
    if (!password) errs.password = 'Mot de passe requis'
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setSubmitting(true)
    setServerError(null)
    const { error } = await signIn(email, password)
    setSubmitting(false)
    if (error) { setServerError(error.message); return }
    navigate(from, { replace: true })
  }

  async function handleReset(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes('@')) { setErrors({ email: 'Email invalide' }); return }
    setSubmitting(true)
    setServerError(null)
    const { error } = await resetPassword(email)
    setSubmitting(false)
    if (error) { setServerError(error.message); return }
    setResetSent(true)
  }

  async function handleGoogle() {
    await signInWithGoogle()
  }

  return (
    <main id="main-content" className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-[var(--fg)]" style={{ fontFamily: 'var(--font-display)' }}>
            {view === 'login' ? 'Se connecter' : 'Mot de passe oublié'}
          </h1>
          <p className="text-[var(--muted)] mt-1">
            Pas encore de compte ?{' '}
            <Link to="/inscription" className="text-[var(--accent)] hover:underline font-medium">
              S'inscrire
            </Link>
          </p>
        </div>

        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-xl)] p-6 shadow-[var(--shadow-sm)]">
          {view === 'login' ? (
            <>
              {/* Google */}
              <Button type="button" variant="secondary" className="w-full mb-4" onClick={handleGoogle}>
                <span className="mr-2" aria-hidden="true">G</span>
                Continuer avec Google
              </Button>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-[var(--border)]" />
                <span className="text-xs text-[var(--muted)]">ou</span>
                <div className="flex-1 h-px bg-[var(--border)]" />
              </div>

              <form onSubmit={handleLogin} noValidate>
                <div className="mb-4">
                  <Input
                    label="Email"
                    type="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setErrors(er => ({ ...er, email: undefined })) }}
                    error={errors.email}
                    autoComplete="email"
                    required
                  />
                </div>
                <div className="mb-2">
                  <Input
                    label="Mot de passe"
                    type="password"
                    value={password}
                    onChange={e => { setPassword(e.target.value); setErrors(er => ({ ...er, password: undefined })) }}
                    error={errors.password}
                    autoComplete="current-password"
                    required
                  />
                </div>
                <div className="text-right mb-5">
                  <button
                    type="button"
                    onClick={() => setView('reset')}
                    className="text-xs text-[var(--accent)] hover:underline focus-visible:outline-none
                      focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded"
                  >
                    Mot de passe oublié ?
                  </button>
                </div>

                {serverError && (
                  <p className="text-sm text-[var(--error)] mb-4 p-3 bg-[var(--error-bg)] rounded-[var(--radius-md)]" role="alert">
                    {serverError}
                  </p>
                )}

                <Button type="submit" className="w-full" size="lg" loading={submitting}>
                  Se connecter
                </Button>
              </form>
            </>
          ) : (
            /* Reset password view */
            resetSent ? (
              <div className="text-center py-4">
                <p className="text-3xl mb-3" aria-hidden="true">📧</p>
                <p className="font-semibold text-[var(--fg)] mb-1">Email envoyé !</p>
                <p className="text-sm text-[var(--muted)] mb-5">
                  Vérifiez votre boîte mail pour réinitialiser votre mot de passe.
                </p>
                <button
                  type="button"
                  onClick={() => { setView('login'); setResetSent(false) }}
                  className="text-sm text-[var(--accent)] hover:underline"
                >
                  ← Retour à la connexion
                </button>
              </div>
            ) : (
              <form onSubmit={handleReset} noValidate>
                <button
                  type="button"
                  onClick={() => setView('login')}
                  className="text-sm text-[var(--muted)] hover:text-[var(--accent)] mb-5 block
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded"
                >
                  ← Retour
                </button>
                <p className="text-sm text-[var(--muted)] mb-4">
                  Entrez votre email pour recevoir un lien de réinitialisation.
                </p>
                <div className="mb-5">
                  <Input
                    label="Email"
                    type="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setErrors({}) }}
                    error={errors.email}
                    autoComplete="email"
                    required
                  />
                </div>
                {serverError && (
                  <p className="text-sm text-[var(--error)] mb-4 p-3 bg-[var(--error-bg)] rounded-[var(--radius-md)]" role="alert">
                    {serverError}
                  </p>
                )}
                <Button type="submit" className="w-full" size="lg" loading={submitting}>
                  Envoyer le lien
                </Button>
              </form>
            )
          )}
        </div>
      </div>
    </main>
  )
}
