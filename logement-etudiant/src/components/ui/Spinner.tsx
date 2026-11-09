import { cn } from '../../lib/utils'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  label?: string
}

const sizes = { sm: 'w-4 h-4 border-2', md: 'w-7 h-7 border-2', lg: 'w-10 h-10 border-[3px]' }

function Spinner({ size = 'md', className, label = 'Chargement…' }: SpinnerProps) {
  return (
    <span role="status" aria-label={label} className={cn('inline-block', className)}>
      <span
        className={cn(
          'inline-block rounded-full border-[var(--border)] border-t-[var(--accent)] animate-spin',
          sizes[size],
        )}
        aria-hidden="true"
      />
    </span>
  )
}

function PageSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] gap-3">
      <Spinner size="lg" />
      <p className="text-sm text-[var(--muted)]">Chargement…</p>
    </div>
  )
}

export { Spinner, PageSpinner }
