import { useCallback, useSyncExternalStore } from 'react'

const STORAGE_KEY = 'fips-theme'

function getSnapshot(): boolean {
  return localStorage.getItem(STORAGE_KEY) === 'dark'
}

function getServerSnapshot(): boolean {
  return false
}

const listeners = new Set<() => void>()
function subscribe(cb: () => void) {
  listeners.add(cb)
  return () => listeners.delete(cb)
}

function setDark(dark: boolean) {
  localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light')
  document.documentElement.classList.toggle('dark', dark)
  listeners.forEach((cb) => cb())
}

// inicializa na carga
if (typeof window !== 'undefined') {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'dark') document.documentElement.classList.add('dark')
}

export function useFipsTheme() {
  const dark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const toggle = useCallback(() => setDark(!dark), [dark])
  return { dark, toggle }
}
