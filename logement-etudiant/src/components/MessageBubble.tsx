import { Avatar } from './ui/Avatar'
import { cn, formatDate } from '../lib/utils'
import type { Message } from '../types'

interface MessageBubbleProps {
  message: Message
  isMine: boolean
}

function MessageBubble({ message, isMine }: MessageBubbleProps) {
  const sender = message.expediteur
  const name = sender ? `${sender.prenom ?? ''} ${sender.nom ?? ''}`.trim() : 'Utilisateur'

  return (
    <div
      className={cn(
        'flex gap-2 items-end max-w-[80%]',
        isMine ? 'ml-auto flex-row-reverse' : 'mr-auto',
      )}
    >
      {!isMine && (
        <Avatar
          src={sender?.photo_url}
          name={name}
          size="sm"
          aria-hidden="true"
        />
      )}
      <div>
        {!isMine && (
          <p className="text-xs text-[var(--muted)] mb-1 ml-1">{name}</p>
        )}
        <div
          className={cn(
            'px-4 py-2.5 rounded-[var(--radius-lg)] text-sm leading-relaxed',
            isMine
              ? 'bg-[var(--accent)] text-white rounded-br-[var(--radius-sm)]'
              : 'bg-[var(--surface2)] text-[var(--fg)] border border-[var(--border)] rounded-bl-[var(--radius-sm)]',
          )}
        >
          <p>{message.contenu}</p>
        </div>
        <p
          className={cn('text-[10px] text-[var(--muted)] mt-1', isMine ? 'text-right mr-1' : 'ml-1')}
          aria-label={`Envoyé le ${formatDate(message.created_at)}`}
        >
          {formatDate(message.created_at)}
          {isMine && (
            <span aria-label={message.lu ? 'Lu' : 'Non lu'} className="ml-1">
              {message.lu ? '✓✓' : '✓'}
            </span>
          )}
        </p>
      </div>
    </div>
  )
}

export { MessageBubble }
