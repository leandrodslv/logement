import { cn } from '../../lib/utils'

interface AvatarProps {
  src?: string | null
  alt?: string
  name?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizes = { sm: 'w-7 h-7 text-xs', md: 'w-9 h-9 text-sm', lg: 'w-12 h-12 text-base', xl: 'w-16 h-16 text-xl' }

function getInitials(name?: string) {
  if (!name) return '?'
  return name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
}

function Avatar({ src, alt, name, size = 'md', className }: AvatarProps) {
  return (
    <div
      className={cn(
        'rounded-full overflow-hidden flex items-center justify-center font-semibold flex-shrink-0',
        'bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--border)]',
        sizes[size],
        className,
      )}
      aria-label={alt ?? name ?? 'Avatar'}
      role="img"
    >
      {src ? (
        <img src={src} alt={alt ?? name ?? ''} className="w-full h-full object-cover" />
      ) : (
        <span aria-hidden="true">{getInitials(name)}</span>
      )}
    </div>
  )
}

export { Avatar }
