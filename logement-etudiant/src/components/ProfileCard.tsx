import { Avatar } from './ui/Avatar'
import { Badge } from './ui/Badge'
import { StarRating } from './StarRating'
import { cn } from '../lib/utils'
import type { Profile } from '../types'

interface ProfileCardProps {
  profile: Profile
  averageNote?: number
  nbAvis?: number
  compact?: boolean
  className?: string
}

function ProfileCard({ profile, averageNote, nbAvis, compact = false, className }: ProfileCardProps) {
  const name = `${profile.prenom ?? ''} ${profile.nom ?? ''}`.trim() || 'Utilisateur'

  return (
    <div
      className={cn(
        'bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] p-4 flex gap-4 items-start',
        className,
      )}
    >
      <Avatar src={profile.photo_url} name={name} size={compact ? 'md' : 'lg'} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="font-semibold text-[var(--fg)] truncate">{name}</p>
          <Badge variant={profile.role === 'bailleur' ? 'info' : 'default'}>
            {profile.role === 'bailleur' ? 'Bailleur' : 'Étudiant'}
          </Badge>
        </div>
        {!compact && profile.bio && (
          <p className="text-sm text-[var(--muted)] mt-1 line-clamp-2">{profile.bio}</p>
        )}
        {typeof averageNote === 'number' && averageNote > 0 && (
          <div className="flex items-center gap-2 mt-2">
            <StarRating value={averageNote} readOnly size="sm" />
            <span className="text-xs text-[var(--muted)]">
              {averageNote.toFixed(1)}{nbAvis ? ` (${nbAvis} avis)` : ''}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export { ProfileCard }
