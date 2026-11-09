import { useState } from 'react'
import { cn } from '../lib/utils'

interface StarRatingProps {
  value: number
  onChange?: (value: number) => void
  max?: number
  size?: 'sm' | 'md' | 'lg'
  readOnly?: boolean
  label?: string
  className?: string
}

const sizes = { sm: 'text-base', md: 'text-xl', lg: 'text-2xl' }

function StarRating({ value, onChange, max = 5, size = 'md', readOnly = false, label, className }: StarRatingProps) {
  const [hovered, setHovered] = useState(0)
  const display = hovered || value

  return (
    <div
      className={cn('inline-flex items-center gap-0.5', className)}
      role={readOnly ? 'img' : 'group'}
      aria-label={label ?? `Note : ${value} sur ${max}`}
    >
      {Array.from({ length: max }, (_, i) => i + 1).map(star => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => !readOnly && setHovered(star)}
          onMouseLeave={() => !readOnly && setHovered(0)}
          aria-label={`${star} étoile${star > 1 ? 's' : ''} sur ${max}`}
          className={cn(
            sizes[size],
            'transition-transform duration-100 outline-none',
            !readOnly && 'hover:scale-110 focus-visible:scale-110 cursor-pointer focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-sm',
            readOnly && 'cursor-default pointer-events-none',
          )}
        >
          <span aria-hidden="true">{star <= display ? '★' : '☆'}</span>
        </button>
      ))}
    </div>
  )
}

export { StarRating }
