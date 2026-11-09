import { Button } from './Button'
import { cn } from '../../lib/utils'

interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
  className?: string
}

function ErrorState({
  title = 'Une erreur est survenue',
  message,
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        'flex flex-col items-center justify-center gap-3 py-16 px-6 text-center',
        className,
      )}
    >
      <span aria-hidden="true" className="text-[var(--warning)]" style={{ fontSize: '2rem' }}>⚠</span>
      <p className="text-base font-semibold text-[var(--fg)]">{title}</p>
      {message && <p className="text-sm text-[var(--muted)] max-w-xs">{message}</p>}
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry} className="mt-2">
          Réessayer
        </Button>
      )}
    </div>
  )
}

export { ErrorState }
