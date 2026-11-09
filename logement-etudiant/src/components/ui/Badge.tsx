import { cn } from '../../lib/utils'

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

const variants: Record<BadgeVariant, string> = {
  default: 'bg-[var(--surface2)] text-[var(--muted)] border-[var(--border)]',
  success: 'bg-[var(--success-bg)] text-[var(--success)] border-[var(--success)]',
  warning: 'bg-[var(--warning-bg)] text-[var(--warning)] border-[var(--warning)]',
  error: 'bg-[var(--error-bg)] text-[var(--error)] border-[var(--error)]',
  info: 'bg-[var(--accent-soft)] text-[var(--accent)] border-[var(--accent)]',
}

function Badge({ variant = 'default', className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-[var(--radius-full)] border',
        variants[variant],
        className,
      )}
      {...props}
    />
  )
}

export { Badge }
export type { BadgeVariant }
