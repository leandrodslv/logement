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
import { useAnnonces, createAnnonce, deleteAnnonce } from '../hooks/useAnnonces'
import type { AnnonceFilters } from '../types'

type AnnonceStep = 1 | 2 | 3 | 4

interface AnnonceForm {
  titre: string
  ville: string
  adresse: string
  code_postal: string
  type_logement: string
  prix_mensuel: string
  charges_incluses: boolean
  charges_mensuelles: string
  surface_m2: string
  disponible_le: string
  description: string
  meuble: boolean
  photos: File[]
}

const TYPES = ['studio', 'T1', 'T2', 'T3+', 'colocation', 'chambre']

const emptyForm: AnnonceForm = {
  titre: '', ville: '', adresse: '', code_postal: '',
  type_logement: 'studio', prix_mensuel: '', charges_incluses: false,
  charges_mensuelles: '', surface_m2: '', disponible_le: '',
  description: '', meuble: false, photos: [],
}

export default function ProfilBailleurPage() {
  const { user } = useAuth()
  const { profile, avis, averageNote, loading, updateProfile, uploadPhoto } = useProfile(user?.id)
  const fileRef = useRef<HTMLInputElement>(null)
  const photoDropRef = useRef<HTMLInputElement>(null)

  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ prenom: '', nom: '', bio: '' })
  const [saving, setSaving] = useState(false)
  const [uploadingPhoto, setUploadingPhoto] = useState(false)

  const [showAnnonceForm, setShowAnnonceForm] = useState(false)
  const [annonceStep, setAnnonceStep] = useState<AnnonceStep>(1)
  const [annonceForm, setAnnonceForm] = useState<AnnonceForm>(emptyForm)
  const [publishing, setPublishing] = useState(false)
  const [publishError, setPublishError] = useState<string | null>(null)

  const filters: AnnonceFilters = {}
  const { annonces, loading: annoncesLoading, refetch } = useAnnonces(filters, 1)
  const myAnnonces = annonces.filter(a => a.bailleur_id === user?.id)

  if (loading) return <PageSpinner />

  const fullName = [profile?.prenom, profile?.nom].filter(Boolean).join(' ') || 'Bailleur·se'

  async function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
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

  function setAF<K extends keyof AnnonceForm>(key: K, value: AnnonceForm[K]) {
    setAnnonceForm(f => ({ ...f, [key]: value }))
  }

  async function handlePublish() {
    if (!user) return
    setPublishing(true)
    setPublishError(null)

    // Store photos as base64 data URLs (prototype)
    const photoUrls: string[] = await Promise.all(
      annonceForm.photos.map(file => new Promise<string>(resolve => {
        const reader = new FileReader()
        reader.onload = e => resolve(e.target?.result as string)
        reader.onerror = () => resolve('')
        reader.readAsDataURL(file)
      }))
    ).then(urls => urls.filter(Boolean))

    try {
      createAnnonce({
        bailleur_id: user.id,
        titre: annonceForm.titre,
        ville: annonceForm.ville || null,
        adresse: annonceForm.adresse || null,
        code_postal: annonceForm.code_postal || null,
        type_logement: annonceForm.type_logement as 'studio' | 'T1' | 'T2' | 'T3+' | 'colocation' | 'chambre',
        prix_mensuel: Number(annonceForm.prix_mensuel),
        charges_incluses: annonceForm.charges_incluses,
        charges_mensuelles: annonceForm.charges_mensuelles ? Number(annonceForm.charges_mensuelles) : null,
        surface_m2: annonceForm.surface_m2 ? Number(annonceForm.surface_m2) : null,
        disponible_le: annonceForm.disponible_le || null,
        description: annonceForm.description || null,
        meuble: annonceForm.meuble,
        disponible: true,
        photos: photoUrls,
        source: 'direct',
      })
      setShowAnnonceForm(false)
      setAnnonceForm(emptyForm)
      setAnnonceStep(1)
      refetch()
    } catch (err) {
      setPublishError(err instanceof Error ? err.message : 'Erreur inconnue')
    }
    setPublishing(false)
  }

  function handleDeleteAnnonce(id: string) {
    if (!confirm('Supprimer cette annonce ?')) return
    deleteAnnonce(id)
    refetch()
  }

  return (
    <main id="main-content" className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-extrabold text-[var(--fg)] mb-8" style={{ fontFamily: 'var(--font-display)' }}>
        Mon espace bailleur
      </h1>

      {/* Header card */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-xl)] p-6 shadow-[var(--shadow-sm)] mb-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
        <div className="relative shrink-0">
          <Avatar src={profile?.photo_url ?? undefined} name={fullName} size="xl" />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploadingPhoto}
            className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[var(--accent)] text-white text-xs
              flex items-center justify-center hover:opacity-90 focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            aria-label="Changer la photo"
          >
            {uploadingPhoto ? '…' : '✏️'}
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h2 className="text-xl font-bold text-[var(--fg)]">{fullName}</h2>
            <Badge variant="default">Bailleur·se</Badge>
          </div>
          {profile?.email && <p className="text-sm text-[var(--muted)]">{profile.email}</p>}
          {avis.length > 0 && (
            <div className="flex items-center gap-2 mt-1">
              <StarRating value={Math.round(averageNote)} readOnly size="sm" />
              <span className="text-xs text-[var(--muted)]">{avis.length} avis</span>
            </div>
          )}
        </div>
        {!editing && <Button variant="secondary" size="sm" onClick={startEdit}>Modifier</Button>}
      </div>

      <Tabs defaultTab="annonces">
        <TabList className="mb-6">
          <Tab id="annonces">Mes annonces</Tab>
          <Tab id="infos">Informations</Tab>
          <Tab id="avis">{`Avis (${avis.length})`}</Tab>
        </TabList>

        {/* Annonces tab */}
        <TabPanel id="annonces" className="py-2">
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-[var(--muted)]">{myAnnonces.length} annonce{myAnnonces.length !== 1 ? 's' : ''}</p>
            <Button size="sm" onClick={() => { setShowAnnonceForm(true); setAnnonceStep(1) }}>
              + Nouvelle annonce
            </Button>
          </div>

          {/* New annonce form */}
          {showAnnonceForm && (
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-xl)] p-6 mb-6 shadow-[var(--shadow-md)]">
              {/* Step indicator */}
              <div className="flex items-center gap-1 mb-6">
                {([1, 2, 3, 4] as AnnonceStep[]).map((s, i) => (
                  <div key={s} className="flex items-center gap-1 flex-1">
                    <div className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0
                      ${annonceStep >= s ? 'bg-[var(--accent)] text-white' : 'bg-[var(--surface2)] text-[var(--muted)]'}`}>
                      {s}
                    </div>
                    <span className="text-xs text-[var(--muted)] hidden sm:block">
                      {['Infos', 'Équipements', 'Photos', 'Aperçu'][i]}
                    </span>
                    {i < 3 && <div className="flex-1 h-px bg-[var(--border)]" />}
                  </div>
                ))}
              </div>

              {/* Step 1: Basic info */}
              {annonceStep === 1 && (
                <div className="flex flex-col gap-4">
                  <Input label="Titre de l'annonce *" value={annonceForm.titre} onChange={e => setAF('titre', e.target.value)} required />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="Ville" value={annonceForm.ville} onChange={e => setAF('ville', e.target.value)} />
                    <Input label="Code postal" value={annonceForm.code_postal} onChange={e => setAF('code_postal', e.target.value)} />
                  </div>
                  <Input label="Adresse" value={annonceForm.adresse} onChange={e => setAF('adresse', e.target.value)} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="Prix mensuel (€) *" type="number" value={annonceForm.prix_mensuel} onChange={e => setAF('prix_mensuel', e.target.value)} required min={0} />
                    <Input label="Surface (m²)" type="number" value={annonceForm.surface_m2} onChange={e => setAF('surface_m2', e.target.value)} min={0} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--fg)] mb-1">Type de logement</label>
                    <div className="flex flex-wrap gap-2">
                      {TYPES.map(t => (
                        <button key={t} type="button" onClick={() => setAF('type_logement', t)}
                          className={`px-3 py-1 text-xs rounded-[var(--radius-full)] border transition-colors
                            ${annonceForm.type_logement === t ? 'bg-[var(--accent)] text-white border-[var(--accent)]' : 'border-[var(--border)] hover:border-[var(--accent)]'}`}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--fg)] mb-1">Description</label>
                    <textarea value={annonceForm.description} onChange={e => setAF('description', e.target.value)}
                      rows={4} className="w-full px-3 py-2 text-sm bg-[var(--surface)] border border-[var(--border)]
                        rounded-[var(--radius-md)] text-[var(--fg)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] resize-none"
                      placeholder="Décrivez votre logement…" />
                  </div>
                  <div className="flex justify-between">
                    <Button variant="ghost" onClick={() => setShowAnnonceForm(false)}>Annuler</Button>
                    <Button onClick={() => setAnnonceStep(2)} disabled={!annonceForm.titre || !annonceForm.prix_mensuel}>
                      Suivant →
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Equipment */}
              {annonceStep === 2 && (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-3">
                    {[
                      { key: 'meuble', label: 'Meublé' },
                      { key: 'charges_incluses', label: 'Charges incluses' },
                    ].map(({ key, label }) => (
                      <label key={key} className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox"
                          checked={annonceForm[key as 'meuble' | 'charges_incluses']}
                          onChange={e => setAF(key as 'meuble' | 'charges_incluses', e.target.checked)}
                          className="w-4 h-4 accent-[var(--accent)]" />
                        <span className="text-sm text-[var(--fg)]">{label}</span>
                      </label>
                    ))}
                    {!annonceForm.charges_incluses && (
                      <Input label="Charges mensuelles (€)" type="number" value={annonceForm.charges_mensuelles}
                        onChange={e => setAF('charges_mensuelles', e.target.value)} min={0} />
                    )}
                    <Input label="Disponible à partir du" type="date" value={annonceForm.disponible_le}
                      onChange={e => setAF('disponible_le', e.target.value)} />
                  </div>
                  <div className="flex justify-between">
                    <Button variant="ghost" onClick={() => setAnnonceStep(1)}>← Retour</Button>
                    <Button onClick={() => setAnnonceStep(3)}>Suivant →</Button>
                  </div>
                </div>
              )}

              {/* Step 3: Photos */}
              {annonceStep === 3 && (
                <div className="flex flex-col gap-4">
                  <div
                    className="border-2 border-dashed border-[var(--border)] rounded-[var(--radius-lg)] p-8 text-center
                      hover:border-[var(--accent)] transition-colors cursor-pointer"
                    onClick={() => photoDropRef.current?.click()}
                    onDragOver={e => e.preventDefault()}
                    onDrop={e => {
                      e.preventDefault()
                      const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'))
                      setAF('photos', [...annonceForm.photos, ...files].slice(0, 10))
                    }}
                  >
                    <p className="text-3xl mb-2" aria-hidden="true">📸</p>
                    <p className="text-sm font-medium text-[var(--fg)]">Glissez vos photos ici</p>
                    <p className="text-xs text-[var(--muted)]">ou cliquez pour sélectionner — 10 photos max</p>
                    <input ref={photoDropRef} type="file" accept="image/*" multiple className="hidden"
                      onChange={e => {
                        const files = Array.from(e.target.files ?? [])
                        setAF('photos', [...annonceForm.photos, ...files].slice(0, 10))
                      }} />
                  </div>
                  {annonceForm.photos.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {annonceForm.photos.map((f, i) => (
                        <div key={i} className="relative w-20 h-16 rounded-[var(--radius-md)] overflow-hidden bg-[var(--surface2)]">
                          <img src={URL.createObjectURL(f)} alt="" className="w-full h-full object-cover" />
                          <button type="button" onClick={() => setAF('photos', annonceForm.photos.filter((_, j) => j !== i))}
                            className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-black/60 text-white text-xs
                              flex items-center justify-center hover:bg-black/80"
                            aria-label="Supprimer cette photo">×</button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex justify-between">
                    <Button variant="ghost" onClick={() => setAnnonceStep(2)}>← Retour</Button>
                    <Button onClick={() => setAnnonceStep(4)}>Aperçu →</Button>
                  </div>
                </div>
              )}

              {/* Step 4: Preview */}
              {annonceStep === 4 && (
                <div className="flex flex-col gap-4">
                  <div className="bg-[var(--surface2)] rounded-[var(--radius-lg)] p-4 text-sm space-y-2">
                    <p><strong>Titre :</strong> {annonceForm.titre}</p>
                    <p><strong>Type :</strong> {annonceForm.type_logement}</p>
                    <p><strong>Ville :</strong> {annonceForm.ville || '—'}</p>
                    <p><strong>Prix :</strong> {annonceForm.prix_mensuel} €/mois {annonceForm.charges_incluses ? '(cc)' : ''}</p>
                    <p><strong>Surface :</strong> {annonceForm.surface_m2 ? `${annonceForm.surface_m2} m²` : '—'}</p>
                    <p><strong>Meublé :</strong> {annonceForm.meuble ? 'Oui' : 'Non'}</p>
                    <p><strong>Photos :</strong> {annonceForm.photos.length}</p>
                  </div>
                  {publishError && (
                    <p className="text-sm text-[var(--error)] p-3 bg-[var(--error-bg)] rounded-[var(--radius-md)]" role="alert">
                      {publishError}
                    </p>
                  )}
                  <div className="flex justify-between">
                    <Button variant="ghost" onClick={() => setAnnonceStep(3)}>← Retour</Button>
                    <Button onClick={handlePublish} loading={publishing}>Publier l'annonce</Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Annonces list */}
          {annoncesLoading ? (
            <p className="text-sm text-[var(--muted)]">Chargement…</p>
          ) : myAnnonces.length === 0 ? (
            <EmptyState icon="🏠" title="Aucune annonce" description="Publiez votre première annonce pour trouver des locataires." />
          ) : (
            <ul className="space-y-3">
              {myAnnonces.map(annonce => (
                <li key={annonce.id} className="flex items-center gap-4 bg-[var(--surface)] border border-[var(--border)]
                  rounded-[var(--radius-lg)] p-4">
                  {annonce.photos[0] ? (
                    <img src={annonce.photos[0]} alt="" className="w-16 h-12 object-cover rounded-[var(--radius-md)] shrink-0" />
                  ) : (
                    <div className="w-16 h-12 bg-[var(--surface2)] rounded-[var(--radius-md)] shrink-0 flex items-center justify-center text-xl" aria-hidden="true">🏠</div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[var(--fg)] line-clamp-1">{annonce.titre}</p>
                    <p className="text-xs text-[var(--muted)]">{annonce.ville} — {annonce.prix_mensuel} €/mois</p>
                  </div>
                  <Badge variant={annonce.disponible ? 'success' : 'default'}>
                    {annonce.disponible ? 'Disponible' : 'Archivée'}
                  </Badge>
                  <button type="button" onClick={() => handleDeleteAnnonce(annonce.id)}
                    className="text-xs text-[var(--error)] hover:underline focus-visible:outline-none
                      focus-visible:ring-2 focus-visible:ring-[var(--error)] rounded"
                    aria-label={`Supprimer ${annonce.titre}`}>
                    Supprimer
                  </button>
                </li>
              ))}
            </ul>
          )}
        </TabPanel>

        {/* Infos tab */}
        <TabPanel id="infos" className="py-2">
          {editing ? (
            <form onSubmit={handleSave} className="max-w-lg flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Prénom" value={form.prenom} onChange={e => setForm(f => ({ ...f, prenom: e.target.value }))} />
                <Input label="Nom" value={form.nom} onChange={e => setForm(f => ({ ...f, nom: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--fg)] mb-1">Bio</label>
                <textarea value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                  rows={3} maxLength={300}
                  className="w-full px-3 py-2 text-sm bg-[var(--surface)] border border-[var(--border)]
                    rounded-[var(--radius-md)] text-[var(--fg)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] resize-none"
                  placeholder="Présentez-vous brièvement…" />
              </div>
              <div className="flex gap-3">
                <Button type="submit" loading={saving}>Enregistrer</Button>
                <Button type="button" variant="ghost" onClick={() => setEditing(false)}>Annuler</Button>
              </div>
            </form>
          ) : (
            <dl className="max-w-lg space-y-4">
              {[
                { label: 'Email', value: profile?.email },
                { label: 'Prénom', value: profile?.prenom },
                { label: 'Nom', value: profile?.nom },
              ].map(({ label, value }) => (
                <div key={label}>
                  <dt className="text-xs text-[var(--muted)] uppercase tracking-wide">{label}</dt>
                  <dd className="text-sm text-[var(--fg)]">{value ?? '—'}</dd>
                </div>
              ))}
              <div>
                <dt className="text-xs text-[var(--muted)] uppercase tracking-wide">Bio</dt>
                <dd className="text-sm text-[var(--fg)]">{profile?.bio || <span className="italic text-[var(--muted)]">Non renseignée</span>}</dd>
              </div>
            </dl>
          )}
        </TabPanel>

        {/* Avis tab */}
        <TabPanel id="avis" className="py-2">
          {avis.length === 0 ? (
            <EmptyState icon="⭐" title="Aucun avis" description="Les étudiants pourront vous laisser un avis après une location." />
          ) : (
            <ul className="space-y-4 max-w-xl">
              {avis.map(a => (
                <li key={a.id} className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <StarRating value={a.note} readOnly size="sm" />
                    <span className="text-xs text-[var(--muted)]">{new Date(a.created_at).toLocaleDateString('fr-FR')}</span>
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
