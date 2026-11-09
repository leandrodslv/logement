import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { useAuth } from '../hooks/useAuth'
import type { UserRole } from '../types'

type Step = 'role' | 'form'

interface FormData {
  prenom: string
  nom: string
  email: string
  password: string
  rgpd: boolean
}

const ROLE_CARDS: { value: UserRole; icon: string; title: string; description: string }[] = [
  {
    value: 'etudiant',
    icon: '🎓',
    title: 'Je cherche un logement',
    description: 'Accédez à des milliers d\'annonces vérifiées, contactez des propriétaires et gérez vos candidatures.',
  },
  {
    value: 'bailleur',
    icon: '🏠',
    title: 'Je propose un logement',
    description: 'Publiez vos annonces gratuitement, gérez vos locataires et recevez des dossiers qualifiés.',
  },
]

function validate(form: FormData): Partial<Record<keyof FormData, string>> {
  const errors: Partial<Record<keyof FormData, string>> = {}
  if (!form.prenom.trim()) errors.prenom = 'Prénom requis'
  if (!form.nom.trim()) errors.nom = 'Nom requis'
  if (!form.email.includes('@')) errors.email = 'Email invalide'
  if (form.password.length < 8) errors.password = 'Minimum 8 caractères'
  if (!form.rgpd) errors.rgpd = 'Vous devez accepter les conditions'
  return errors
}

export default function InscriptionPage() {
  const { signUp, signInWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>('role')
  const [role, setRole] = useState<UserRole | null>(null)
  const [form, setForm] = useState<FormData>({ prenom: '', nom: '', email: '', password: '', rgpd: false })
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  function handleRoleSelect(r: UserRole) {
    setRole(r)
    setStep('form')
  }

  function handleChange(key: keyof FormData, value: string | boolean) {
    setForm(f => ({ ...f, [key]: value }))
    if (errors[key]) setErrors(e => ({ ...e, [key]: undefined }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!role) return
    const errs = validate(form)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setSubmitting(true)
    setServerError(null)
    const { error } = await signUp(form.email, form.password, role, form.prenom, form.nom)
    setSubmitting(false)
    if (error) { setServerError(error.message); return }
    navigate(role === 'bailleur' ? '/profil/bailleur' : '/profil/etudiant')
  }

  async function handleGoogle() {
    if (!role) return
    await signInWithGoogle(role)
  }

  return (
    <main id="main-content" className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-[var(--fg)]" style={{ fontFamily: 'var(--font-display)' }}>
            Créer un compte
          </h1>
          <p className="text-[var(--muted)] mt-1">
            Déjà inscrit ?{' '}
            <Link to="/connexion" className="text-[var(--accent)] hover:underline font-medium">
              Se connecter
            </Link>
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-8" aria-label="Étapes d'inscription">
          {(['role', 'form'] as Step[]).map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors
                  ${step === s || (s === 'role' && step === 'form')
                    ? 'bg-[var(--accent)] text-white'
                    : 'bg-[var(--surface2)] text-[var(--muted)]'}`}
                aria-current={step === s ? 'step' : undefined}
              >
                {i + 1}
              </div>
              <span className="text-xs text-[var(--muted)] hidden sm:block">
                {s === 'role' ? 'Votre profil' : 'Vos informations'}
              </span>
              {i === 0 && <div className="flex-1 h-px bg-[var(--border)]" />}
            </div>
          ))}
        </div>

        {/* Step 1: Role selection */}
        {step === 'role' && (
          <div>
            <h2 className="text-lg font-semibold text-[var(--fg)] mb-4 text-center">
              Vous êtes…
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ROLE_CARDS.map(card => (
                <button
                  key={card.value}
                  type="button"
                  onClick={() => handleRoleSelect(card.value)}
                  className="text-left bg-[var(--surface)] border-2 border-[var(--border)] rounded-[var(--radius-xl)] p-6
                    hover:border-[var(--accent)] hover:shadow-[var(--shadow-md)] transition-all
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                >
                  <span className="text-4xl mb-3 block" aria-hidden="true">{card.icon}</span>
                  <p className="font-bold text-[var(--fg)] mb-1">{card.title}</p>
                  <p className="text-sm text-[var(--muted)]">{card.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Form */}
        {step === 'form' && role && (
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-xl)] p-6 shadow-[var(--shadow-sm)]">
            <div className="flex items-center gap-2 mb-6">
              <button
                type="button"
                onClick={() => setStep('role')}
                className="text-sm text-[var(--muted)] hover:text-[var(--accent)] focus-visible:outline-none
                  focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded"
                aria-label="Retour au choix du profil"
              >
                ← Retour
              </button>
              <span className="text-sm text-[var(--muted)]">
                Profil : <strong className="text-[var(--fg)] capitalize">{role === 'etudiant' ? 'Étudiant·e' : 'Bailleur·se'}</strong>
              </span>
            </div>

            {/* Google */}
            <Button
              type="button"
              variant="secondary"
              className="w-full mb-4"
              onClick={handleGoogle}
            >
              <span className="mr-2" aria-hidden="true">G</span>
              Continuer avec Google
            </Button>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-[var(--border)]" />
              <span className="text-xs text-[var(--muted)]">ou</span>
              <div className="flex-1 h-px bg-[var(--border)]" />
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <Input
                  label="Prénom"
                  value={form.prenom}
                  onChange={e => handleChange('prenom', e.target.value)}
                  error={errors.prenom}
                  autoComplete="given-name"
                  required
                />
                <Input
                  label="Nom"
                  value={form.nom}
                  onChange={e => handleChange('nom', e.target.value)}
                  error={errors.nom}
                  autoComplete="family-name"
                  required
                />
              </div>
              <div className="mb-4">
                <Input
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={e => handleChange('email', e.target.value)}
                  error={errors.email}
                  autoComplete="email"
                  required
                />
              </div>
              <div className="mb-5">
                <Input
                  label="Mot de passe"
                  type="password"
                  value={form.password}
                  onChange={e => handleChange('password', e.target.value)}
                  error={errors.password}
                  hint="8 caractères minimum"
                  autoComplete="new-password"
                  required
                />
              </div>

              {/* RGPD */}
              <label className="flex items-start gap-3 mb-5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.rgpd}
                  onChange={e => handleChange('rgpd', e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-[var(--accent)]"
                  aria-describedby={errors.rgpd ? 'rgpd-error' : undefined}
                />
                <span className="text-sm text-[var(--fg)]">
                  J'accepte les{' '}
                  <Link to="/cgu" className="text-[var(--accent)] hover:underline" target="_blank">CGU</Link>
                  {' '}et la{' '}
                  <Link to="/confidentialite" className="text-[var(--accent)] hover:underline" target="_blank">
                    politique de confidentialité
                  </Link>
                </span>
              </label>
              {errors.rgpd && (
                <p id="rgpd-error" className="text-xs text-[var(--error)] mb-4" role="alert">{errors.rgpd}</p>
              )}

              {serverError && (
                <p className="text-sm text-[var(--error)] mb-4 p-3 bg-[var(--error-bg)] rounded-[var(--radius-md)]" role="alert">
                  {serverError}
                </p>
              )}

              <Button type="submit" className="w-full" size="lg" loading={submitting}>
                Créer mon compte
              </Button>
            </form>
          </div>
        )}
      </div>
    </main>
  )
}
