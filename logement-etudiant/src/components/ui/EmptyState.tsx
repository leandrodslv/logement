import { cn } from '../../lib/utils'

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 py-16 px-6 text-center',
        className,
      )}
    >
      {icon && (
        <span className="text-[var(--muted)] opacity-60" aria-hidden="true" style={{ fontSize: '2.5rem' }}>
          {icon}
        </span>
      )}
      <p className="text-base font-semibold text-[var(--fg)]">{title}</p>
      {description && <p className="text-sm text-[var(--muted)] max-w-xs">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}

function ErrorState({ message, className }: { message: string; className?: string }) {
  return (
    <EmptyState
      icon={<span style={{fontSize:'2rem'}}>⚠</span>}
      title="Une erreur est survenue"
      description={message}
      className={className}
    />
  )
}

export { EmptyState, ErrorState }
