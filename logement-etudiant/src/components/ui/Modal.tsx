import { useEffect, useRef } from 'react'
import { cn } from '../../lib/utils'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizes = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl' }

function Modal({ open, onClose, title, children, size = 'md', className }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const firstFocusRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open) {
      dialog.showModal()
      firstFocusRef.current?.focus()
    } else {
      dialog.close()
    }
  }, [open])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const handleClose = () => onClose()
    dialog.addEventListener('close', handleClose)
    return () => dialog.removeEventListener('close', handleClose)
  }, [onClose])

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="modal-title"
      onKeyDown={e => e.key === 'Escape' && onClose()}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      className={cn(
        'w-full m-auto backdrop:bg-black/40 backdrop:backdrop-blur-sm',
        'bg-[var(--surface)] rounded-[var(--radius-xl)] shadow-[var(--shadow-lg)]',
        'border border-[var(--border)] p-0',
        sizes[size],
        className,
      )}
    >
      <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
        <h2 id="modal-title" className="text-base font-semibold text-[var(--fg)]">{title}</h2>
        <button
          ref={firstFocusRef}
          onClick={onClose}
          aria-label="Fermer"
          className="text-[var(--muted)] hover:text-[var(--fg)] transition-colors rounded-[var(--radius-sm)] p-1 outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        >
          ✕
        </button>
      </div>
      <div className="px-5 py-5">{children}</div>
    </dialog>
  )
}

export { Modal }
