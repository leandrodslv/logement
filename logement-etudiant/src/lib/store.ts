const P = 'lge_'

export function lsGet<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(P + key)
    return v !== null ? (JSON.parse(v) as T) : fallback
  } catch {
    return fallback
  }
}

export function lsSet<T>(key: string, value: T): void {
  try {
    localStorage.setItem(P + key, JSON.stringify(value))
  } catch {}
}

export function uid(): string {
  return crypto.randomUUID()
}
