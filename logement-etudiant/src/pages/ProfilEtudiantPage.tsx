import { useRef, useState } from 'react'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Avatar } from '../components/ui/Avatar'
import { Badge } from '../components/ui/Badge'
import { Tabs, TabList, Tab, TabPanel } from '../components/ui/Tabs'
import { StarRating } from '../components/StarRating'
import { PageSpinner } from '../components/ui/Spinner'
import { EmptyState } from '../components/ui/EmptyState'
import { useAuth } from '../hooks/useAuth'
import { useProfile } from '../hooks/useProfile'

const MAX_SIZE_BYTES = 5 * 1024 * 1024 // 5 Mo
const ACCEPTED = '.pdf,.jpg,.jpeg,.png'

const DOCS = [
  { key: 'piece_identite', label: "Pièce d'identité", icon: '🪪' },
  { key: 'justif_scolarite', label: 'Justificatif de scolarité', icon: '🎓' },
  { key: 'garant', label: 'Garant (attestation)', icon: '📄' },
] as const

export default function ProfilEtudiantPage() {
  const { user, profile: authProfile } = useAuth()
  const { profile, avis, averageNote, loading, updateProfile, uploadPhoto } = useProfile(user?.id)
  const fileRef = useRef<HTMLInputElement>(null)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ prenom: '', nom: '', bio: '' })
  const [saving, setSaving] = useState(false)
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  const [docErrors, setDocErrors] = useState<Record<string, string>>({})

  if (loading) return <PageSpinner />
  if (!profile) return null

  const displayProfile = profile ?? authProfile

  async function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > MAX_SIZE_BYTES) { alert('Fichier trop volumineux (5 Mo max)'); return }
    setUploadingPhoto(true)
    await uploadPhoto(file)
    setUploadingPhoto(false)
  }

  function startEdit() {
    setForm({ prenom: profile?.prenom ?? '', nom: profile?.nom ?? '', bio: profile?.bio ?? '' })
    setEditing(true)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await updateProfile({ prenom: form.prenom, nom: form.nom, bio: form.bio })
    setSaving(false)
    setEditing(false)
  }

  async function handleDocUpload(key: string, file: File) {
    if (file.size > MAX_SIZE_BYTES) {
      setDocErrors(e => ({ ...e, [key]: 'Fichier trop volumineux (5 Mo max)' }))
      return
    }
    setDocErrors(e => ({ ...e, [key]: '' }))
    // Store doc file to Supabase storage bucket 'documents'
    const { supabase } = await import('../lib/supabase')
    const path = `${user!.id}/${key}.${file.name.split('.').pop()}`
    await supabase.storage.from('documents').upload(path, file, { upsert: true })
  }

  const fullName = [displayProfile?.prenom, displayProfile?.nom].filter(Boolean).join(' ') || 'Étudiant·e'

  return (
    <main id="main-content" className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-extrabold text-[var(--fg)] mb-8" style={{ fontFamily: 'var(--font-display)' }}>
        Mon profil
      </h1>

      {/* Header card */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-xl)] p-6 shadow-[var(--shadow-sm)] mb-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
        <div className="relative shrink-0">
          <Avatar
            src={displayProfile?.photo_url ?? undefined}
            name={fullName}
            size="xl"
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploadingPhoto}
            className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[var(--accent)] text-white text-xs
              flex items-center justify-center hover:opacity-90 focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-[var(--accent)] transition-opacity"
            aria-label="Changer la photo"
          >
            {uploadingPhoto ? '…' : '✏️'}
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h2 className="text-xl font-bold text-[var(--fg)]">{fullName}</h2>
            <Badge variant="info">Étudiant·e</Badge>
          </div>
          {displayProfile?.email && (
            <p className="text-sm text-[var(--muted)]">{displayProfile.email}</p>
          )}
          {avis.length > 0 && (
            <div className="flex items-center gap-2 mt-1">
              <StarRating value={Math.round(averageNote)} readOnly size="sm" />
              <span className="text-xs text-[var(--muted)]">{avis.length} avis</span>
            </div>
          )}
        </div>

        {!editing && (
          <Button variant="secondary" size="sm" onClick={startEdit}>
            Modifier
          </Button>
        )}
      </div>

      <Tabs defaultTab="infos">
        <TabList className="mb-6">
          <Tab id="infos">Informations</Tab>
          <Tab id="documents">Documents</Tab>
          <Tab id="avis">{`Avis (${avis.length})`}</Tab>
        </TabList>

        <TabPanel id="infos" className="py-2">
          {editing ? (
            <form onSubmit={handleSave} className="max-w-lg flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Prénom"
                  value={form.prenom}
                  onChange={e => setForm(f => ({ ...f, prenom: e.target.value }))}
                />
                <Input
                  label="Nom"
                  value={form.nom}
                  onChange={e => setForm(f => ({ ...f, nom: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--fg)] mb-1">Bio</label>
                <textarea
                  value={form.bio}
                  onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                  rows={3}
                  maxLength={300}
                  className="w-full px-3 py-2 text-sm bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-md)]
                    text-[var(--fg)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]
                    resize-none"
                  placeholder="Présentez-vous brièvement…"
                />
              </div>
              <div className="flex gap-3">
                <Button type="submit" loading={saving}>Enregistrer</Button>
                <Button type="button" variant="ghost" onClick={() => setEditing(false)}>Annuler</Button>
              </div>
            </form>
          ) : (
            <dl className="max-w-lg space-y-4">
              <div>
                <dt className="text-xs text-[var(--muted)] uppercase tracking-wide">Email</dt>
                <dd className="text-sm text-[var(--fg)]">{displayProfile?.email ?? '—'}</dd>
              </div>
              <div>
                <dt className="text-xs text-[var(--muted)] uppercase tracking-wide">Prénom</dt>
                <dd className="text-sm text-[var(--fg)]">{displayProfile?.prenom ?? '—'}</dd>
              </div>
              <div>
                <dt className="text-xs text-[var(--muted)] uppercase tracking-wide">Nom</dt>
                <dd className="text-sm text-[var(--fg)]">{displayProfile?.nom ?? '—'}</dd>
              </div>
              <div>
                <dt className="text-xs text-[var(--muted)] uppercase tracking-wide">Bio</dt>
                <dd className="text-sm text-[var(--fg)]">{displayProfile?.bio || <span className="text-[var(--muted)] italic">Non renseignée</span>}</dd>
              </div>
            </dl>
          )}
        </TabPanel>

        <TabPanel id="documents" className="py-2">
          <p className="text-sm text-[var(--muted)] mb-5">
            Vos documents sont stockés de manière sécurisée et ne sont visibles que par vous.
            Formats acceptés : PDF, JPG, PNG — 5 Mo max.
          </p>
          <ul className="space-y-3 max-w-md">
            {DOCS.map(doc => (
              <li key={doc.key} className="flex items-center gap-4 p-4 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)]">
                <span className="text-2xl shrink-0" aria-hidden="true">{doc.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--fg)]">{doc.label}</p>
                  {docErrors[doc.key] && (
                    <p className="text-xs text-[var(--error)]" role="alert">{docErrors[doc.key]}</p>
                  )}
                </div>
                <label className="shrink-0">
                  <span className="sr-only">Téléverser {doc.label}</span>
                  <input
                    type="file"
                    accept={ACCEPTED}
                    className="hidden"
                    onChange={e => { const f = e.target.files?.[0]; if (f) handleDocUpload(doc.key, f) }}
                  />
                  <span className="inline-flex items-center px-3 py-1.5 text-xs font-medium bg-[var(--surface2)]
                    border border-[var(--border)] rounded-[var(--radius-md)] cursor-pointer hover:border-[var(--accent)]
                    transition-colors">
                    Choisir
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </TabPanel>

        <TabPanel id="avis" className="py-2">
          {avis.length === 0 ? (
            <EmptyState icon="⭐" title="Aucun avis pour l'instant" description="Les bailleurs pourront vous laisser un avis après une location." />
          ) : (
            <ul className="space-y-4 max-w-xl">
              {avis.map(a => (
                <li key={a.id} className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <StarRating value={a.note} readOnly size="sm" />
                    <span className="text-xs text-[var(--muted)]">
                      {new Date(a.created_at).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  {a.commentaire && <p className="text-sm text-[var(--fg)]">{a.commentaire}</p>}
                </li>
              ))}
            </ul>
          )}
        </TabPanel>
      </Tabs>
    </main>
  )
}
