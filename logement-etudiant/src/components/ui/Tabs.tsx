import { createContext, useContext, useState, useId } from 'react'
import { cn } from '../../lib/utils'

interface TabsContextValue {
  active: string
  setActive: (id: string) => void
  baseId: string
}

const TabsContext = createContext<TabsContextValue | null>(null)

function useTabs() {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('Tabs must be used within a Tabs component')
  return ctx
}

interface TabsProps {
  defaultTab: string
  children: React.ReactNode
  className?: string
}

function Tabs({ defaultTab, children, className }: TabsProps) {
  const [active, setActive] = useState(defaultTab)
  const baseId = useId()
  return (
    <TabsContext.Provider value={{ active, setActive, baseId }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

function TabList({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div role="tablist" className={cn('flex gap-1 border-b border-[var(--border)]', className)}>
      {children}
    </div>
  )
}

interface TabProps {
  id: string
  children: React.ReactNode
  className?: string
}

function Tab({ id, children, className }: TabProps) {
  const { active, setActive, baseId } = useTabs()
  const isActive = active === id
  return (
    <button
      role="tab"
      id={`${baseId}-tab-${id}`}
      aria-selected={isActive}
      aria-controls={`${baseId}-panel-${id}`}
      tabIndex={isActive ? 0 : -1}
      onClick={() => setActive(id)}
      onKeyDown={e => e.key === 'Enter' || e.key === ' ' ? setActive(id) : undefined}
      className={cn(
        'px-4 py-2.5 text-sm font-medium border-b-2 transition-colors outline-none',
        'focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-inset',
        isActive
          ? 'border-[var(--accent)] text-[var(--accent)]'
          : 'border-transparent text-[var(--muted)] hover:text-[var(--fg)]',
        className,
      )}
    >
      {children}
    </button>
  )
}

interface TabPanelProps {
  id: string
  children: React.ReactNode
  className?: string
}

function TabPanel({ id, children, className }: TabPanelProps) {
  const { active, baseId } = useTabs()
  return (
    <div
      role="tabpanel"
      id={`${baseId}-panel-${id}`}
      aria-labelledby={`${baseId}-tab-${id}`}
      hidden={active !== id}
      className={className}
    >
      {children}
    </div>
  )
}

export { Tabs, TabList, Tab, TabPanel }
