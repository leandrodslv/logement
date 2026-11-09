import { useEffect, useState, useCallback } from 'react'
import { lsGet, lsSet, uid } from '../lib/store'
import type { Message } from '../types'

function getMessages(): Message[] {
  return lsGet<Message[]>('messages', [])
}

export function useMessages(annonceId: string | undefined, currentUserId: string | undefined) {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [error] = useState<string | null>(null)

  const fetchMessages = useCallback(() => {
    if (!annonceId || !currentUserId) { setLoading(false); return }
    const all = getMessages()
    const conv = all
      .filter(m => m.annonce_id === annonceId && (m.expediteur_id === currentUserId || m.destinataire_id === currentUserId))
      .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    setMessages(conv)
    setLoading(false)
  }, [annonceId, currentUserId])

  useEffect(() => { fetchMessages() }, [fetchMessages])

  const sendMessage = useCallback(async (destinataireId: string, contenu: string) => {
    if (!annonceId || !currentUserId) return { error: 'Non authentifié' }
    const newMsg: Message = {
      id: uid(),
      annonce_id: annonceId,
      expediteur_id: currentUserId,
      destinataire_id: destinataireId,
      contenu,
      lu: false,
      created_at: new Date().toISOString(),
    }
    lsSet('messages', [...getMessages(), newMsg])
    setMessages(prev => [...prev, newMsg])
    return { error: null }
  }, [annonceId, currentUserId])

  const markAsRead = useCallback(async (messageId: string) => {
    const all = getMessages()
    lsSet('messages', all.map(m => m.id === messageId ? { ...m, lu: true } : m))
    setMessages(prev => prev.map(m => m.id === messageId ? { ...m, lu: true } : m))
  }, [])

  const unreadCount = messages.filter(m => !m.lu && m.destinataire_id === currentUserId).length

  return { messages, loading, error, sendMessage, markAsRead, unreadCount }
}

export function useConversations(currentUserId: string | undefined) {
  const [conversations, setConversations] = useState<{ annonceId: string; partnerId: string; lastMessage: Message }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!currentUserId) { setLoading(false); return }
    const all = getMessages()
    const mine = all.filter(m => m.expediteur_id === currentUserId || m.destinataire_id === currentUserId)
    const seen = new Set<string>()
    const convs = mine
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .reduce<typeof conversations>((acc, msg) => {
        if (!seen.has(msg.annonce_id)) {
          seen.add(msg.annonce_id)
          const partnerId = msg.expediteur_id === currentUserId ? msg.destinataire_id : msg.expediteur_id
          acc.push({ annonceId: msg.annonce_id, partnerId, lastMessage: msg })
        }
        return acc
      }, [])
    setConversations(convs)
    setLoading(false)
  }, [currentUserId])

  return { conversations, loading }
}
