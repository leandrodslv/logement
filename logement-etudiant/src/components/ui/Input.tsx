import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  hint,
  icon,
  iconPosition = 'left',
  id,
  className,
  ...props
}, ref) => {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
  const errorId = error ? `${inputId}-error` : undefined
  const hintId = hint ? `${inputId}-hint` : undefined

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-[var(--fg)]">
          {label}
          {props.required && <span className="text-[var(--error)] ml-0.5" aria-hidden="true">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" aria-hidden="true">{icon}</span>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-describedby={cn(errorId, hintId)}
          aria-invalid={!!error}
          className={cn(
            'w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] text-[var(--fg)] text-sm px-3 py-2',
            'placeholder:text-[var(--muted)] outline-none transition-colors duration-150',
            'focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)] focus:ring-opacity-20',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-[var(--error)] focus:border-[var(--error)] focus:ring-[var(--error)]',
            icon && iconPosition === 'left' ? 'pl-9' : '',
            icon && iconPosition === 'right' ? 'pr-9' : '',
            className,
          )}
          {...props}
        />
        {icon && iconPosition === 'right' && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" aria-hidden="true">{icon}</span>
        )}
      </div>
      {error && <p id={errorId} className="text-xs text-[var(--error)]" role="alert">{error}</p>}
      {hint && !error && <p id={hintId} className="text-xs text-[var(--muted)]">{hint}</p>}
    </div>
  )
})

Input.displayName = 'Input'
export { Input }
export type { InputProps }
