import { useCallback, useEffect, useState } from 'react'

/**
 * The single place the app reads or writes `localStorage`. Components must never
 * touch storage directly — they go through this hook, so the storage key and the
 * serialization shape live in exactly one place.
 *
 * Persisted shape: `JSON.stringify(string[])` — a flat array of completed item ids.
 * In memory the completed set is a `Set<string>` for O(1) membership tests.
 */
const STORAGE_KEY = 'onboarding-checklist.completed'

/**
 * Read the completed set from storage, degrading to an empty set on anything
 * unexpected (missing key, unavailable storage, parse error, or a value that is
 * not an array of strings). Never throws — a missing/corrupt store means
 * "nothing completed", never a crash.
 */
function readCompleted(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === null) return new Set()

    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return new Set()
    if (!parsed.every((id): id is string => typeof id === 'string')) return new Set()

    return new Set(parsed)
  } catch {
    return new Set()
  }
}

export interface UseCompletedItems {
  /** The set of completed item ids. */
  completed: Set<string>
  /** Whether a given item id is currently completed. */
  isCompleted: (id: string) => boolean
  /** Flip the completed state of a single item id. */
  toggle: (id: string) => void
}

export function useCompletedItems(): UseCompletedItems {
  const [completed, setCompleted] = useState<Set<string>>(readCompleted)

  // Persist whenever the set changes. Writing is best-effort: a storage failure
  // (e.g. quota, disabled storage) must not break the UI.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed].sort()))
    } catch {
      // ignore — persistence is a nice-to-have, not a correctness requirement
    }
  }, [completed])

  const toggle = useCallback((id: string) => {
    setCompleted((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }, [])

  const isCompleted = useCallback(
    (id: string) => completed.has(id),
    [completed],
  )

  return { completed, isCompleted, toggle }
}
