import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
}

const styles: Record<Variant, string> = {
  primary: 'bg-[var(--accent)] text-white hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 disabled:opacity-50',
  secondary: 'bg-[var(--surface2)] text-[var(--fg)] border border-[var(--border)] hover:bg-[var(--border)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 disabled:opacity-50',
  ghost: 'bg-transparent text-[var(--accent)] hover:bg-[var(--accent-soft)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 disabled:opacity-50',
  danger: 'bg-[var(--error)] text-white hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[var(--error)] focus-visible:ring-offset-2 disabled:opacity-50',
}

const sizes: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-xs rounded-[var(--radius-md)]',
  md: 'px-4 py-2 text-sm rounded-[var(--radius-md)]',
  lg: 'px-6 py-3 text-base rounded-[var(--radius-lg)]',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  children,
  className,
  ...props
}, ref) => (
  <button
    ref={ref}
    disabled={disabled || loading}
    aria-busy={loading}
    className={cn(
      'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-150 cursor-pointer outline-none',
      styles[variant],
      sizes[size],
      (disabled || loading) && 'cursor-not-allowed',
      className,
    )}
    {...props}
  >
    {loading && (
      <span className="inline-block w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" aria-hidden="true" />
    )}
    {children}
  </button>
))

Button.displayName = 'Button'
export { Button }
export type { ButtonProps }
