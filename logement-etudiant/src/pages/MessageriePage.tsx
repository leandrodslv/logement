import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Avatar } from '../components/ui/Avatar'
import { EmptyState } from '../components/ui/EmptyState'
import { PageSpinner } from '../components/ui/Spinner'
import { MessageBubble } from '../components/MessageBubble'
import { useAuth } from '../hooks/useAuth'
import { useMessages, useConversations } from '../hooks/useMessages'
import { useProfile } from '../hooks/useProfile'

function ConversationList({
  userId,
  activeAnnonceId,
  onSelect,
}: {
  userId: string
  activeAnnonceId: string | null
  onSelect: (annonceId: string, partnerId: string) => void
}) {
  const { conversations, loading } = useConversations(userId)

  if (loading) return <PageSpinner />
  if (conversations.length === 0) {
    return (
      <EmptyState
        icon="💬"
        title="Aucune conversation"
        description="Contactez un propriétaire depuis une annonce pour démarrer."
      />
    )
  }

  return (
    <ul className="divide-y divide-[var(--border)]" aria-label="Conversations">
      {conversations.map(({ annonceId, partnerId, lastMessage }) => (
        <ConvItem
          key={annonceId}
          annonceId={annonceId}
          partnerId={partnerId}
          lastMessage={lastMessage}
          currentUserId={userId}
          isActive={annonceId === activeAnnonceId}
          onClick={() => onSelect(annonceId, partnerId)}
        />
      ))}
    </ul>
  )
}

function ConvItem({
  annonceId: _annonceId,
  partnerId,
  lastMessage,
  currentUserId,
  isActive,
  onClick,
}: {
  annonceId?: string
  partnerId: string
  lastMessage: { contenu: string; lu: boolean; destinataire_id: string; created_at: string }
  currentUserId: string
  isActive: boolean
  onClick: () => void
}) {
  const { profile } = useProfile(partnerId)
  const hasUnread = !lastMessage.lu && lastMessage.destinataire_id === currentUserId
  const partnerName = [profile?.prenom, profile?.nom].filter(Boolean).join(' ') || 'Utilisateur'

  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        aria-current={isActive ? 'true' : undefined}
        className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors
          ${isActive ? 'bg-[var(--accent-soft)]' : 'hover:bg-[var(--surface2)]'}
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--accent)]`}
      >
        <Avatar src={profile?.photo_url ?? undefined} name={partnerName} size="md" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <p className={`text-sm truncate ${hasUnread ? 'font-bold text-[var(--fg)]' : 'font-medium text-[var(--fg)]'}`}>
              {partnerName}
            </p>
            <time className="text-xs text-[var(--muted)] shrink-0">
              {new Date(lastMessage.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}
            </time>
          </div>
          <p className="text-xs text-[var(--muted)] truncate">{lastMessage.contenu}</p>
        </div>
        {hasUnread && (
          <span className="w-2 h-2 rounded-full bg-[var(--accent)] shrink-0" aria-label="Message non lu" />
        )}
      </button>
    </li>
  )
}

function ChatPanel({ annonceId, partnerId, currentUserId }: { annonceId: string; partnerId: string; currentUserId: string }) {
  const { messages, loading, sendMessage, markAsRead } = useMessages(annonceId, currentUserId)
  const { profile: partner } = useProfile(partnerId)
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    messages
      .filter(m => !m.lu && m.destinataire_id === currentUserId)
      .forEach(m => markAsRead(m.id))
  }, [messages, currentUserId, markAsRead])

  async function handleSend(e: React.FormEvent) {
    e.preventDefault()
    const content = text.trim()
    if (!content || sending) return
    setSending(true)
    setText('')
    await sendMessage(partnerId, content)
    setSending(false)
  }

  const partnerName = [partner?.prenom, partner?.nom].filter(Boolean).join(' ') || 'Propriétaire'

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-[var(--border)] bg-[var(--surface)] shrink-0">
        <Avatar src={partner?.photo_url ?? undefined} name={partnerName} size="md" />
        <p className="font-semibold text-[var(--fg)]">{partnerName}</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3" aria-label="Messages">
        {loading ? (
          <PageSpinner />
        ) : messages.length === 0 ? (
          <EmptyState icon="💬" title="Démarrez la conversation" description="Posez vos questions sur le logement." />
        ) : (
          messages.map(msg => (
            <MessageBubble
              key={msg.id}
              message={msg}
              isMine={msg.expediteur_id === currentUserId}
            />
          ))
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSend}
        className="p-3 border-t border-[var(--border)] bg-[var(--surface)] flex gap-2 items-end shrink-0"
      >
        <label className="sr-only" htmlFor="msg-input">Votre message</label>
        <textarea
          id="msg-input"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSend(e as unknown as React.FormEvent)
            }
          }}
          rows={1}
          placeholder="Écrivez votre message… (Entrée pour envoyer)"
          className="flex-1 px-3 py-2 text-sm bg-[var(--surface2)] border border-[var(--border)]
            rounded-[var(--radius-lg)] text-[var(--fg)] placeholder:text-[var(--muted)]
            focus:outline-none focus:ring-2 focus:ring-[var(--accent)] resize-none"
          style={{ maxHeight: '8rem' }}
        />
        <button
          type="submit"
          disabled={!text.trim() || sending}
          className="px-4 py-2 bg-[var(--accent)] text-white rounded-[var(--radius-lg)] text-sm font-medium
            hover:opacity-90 disabled:opacity-50 transition-opacity focus-visible:outline-none
            focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          aria-label="Envoyer"
        >
          Envoyer
        </button>
      </form>
    </div>
  )
}

export default function MessageriePage() {
  const { user } = useAuth()
  const [searchParams] = useSearchParams()

  const initialAnnonce = searchParams.get('annonce')
  const initialDest = searchParams.get('destinataire')

  const [activeAnnonceId, setActiveAnnonceId] = useState<string | null>(initialAnnonce)
  const [activePartnerId, setActivePartnerId] = useState<string | null>(initialDest)
  const [mobileView, setMobileView] = useState<'list' | 'chat'>(initialAnnonce ? 'chat' : 'list')

  if (!user) return null

  function handleSelect(annonceId: string, partnerId: string) {
    setActiveAnnonceId(annonceId)
    setActivePartnerId(partnerId)
    setMobileView('chat')
  }

  return (
    <main id="main-content" className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-extrabold text-[var(--fg)] mb-6" style={{ fontFamily: 'var(--font-display)' }}>
        Messagerie
      </h1>

      <div className="border border-[var(--border)] rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-sm)]"
        style={{ height: 'calc(100vh - 220px)', minHeight: '400px' }}>
        <div className="flex h-full">
          {/* Conversation list — hidden on mobile when in chat */}
          <aside
            className={`w-full sm:w-72 lg:w-80 border-r border-[var(--border)] bg-[var(--surface)] flex flex-col shrink-0
              ${mobileView === 'chat' ? 'hidden sm:flex' : 'flex'}`}
            aria-label="Liste des conversations"
          >
            <div className="p-4 border-b border-[var(--border)]">
              <p className="text-sm font-semibold text-[var(--fg)]">Conversations</p>
            </div>
            <div className="flex-1 overflow-y-auto">
              <ConversationList
                userId={user.id}
                activeAnnonceId={activeAnnonceId}
                onSelect={handleSelect}
              />
            </div>
          </aside>

          {/* Chat panel */}
          <div className={`flex-1 min-w-0 flex flex-col bg-[var(--bg)]
            ${mobileView === 'list' ? 'hidden sm:flex' : 'flex'}`}>
            {activeAnnonceId && activePartnerId ? (
              <>
                {/* Mobile back button */}
                <button
                  type="button"
                  onClick={() => setMobileView('list')}
                  className="sm:hidden text-sm text-[var(--accent)] px-4 py-2 border-b border-[var(--border)]
                    text-left hover:bg-[var(--surface2)] focus-visible:outline-none
                    focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--accent)]"
                >
                  ← Retour aux conversations
                </button>
                <ChatPanel
                  annonceId={activeAnnonceId}
                  partnerId={activePartnerId}
                  currentUserId={user.id}
                />
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <EmptyState
                  icon="💬"
                  title="Sélectionnez une conversation"
                  description="Choisissez une conversation dans la liste pour afficher les messages."
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
