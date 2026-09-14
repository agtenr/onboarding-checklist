/**
 * The core domain entity: a single onboarding task the user can tick off.
 *
 * Completion is deliberately NOT a field here — it is user progress state held
 * separately (see `hooks/useCompletedItems`), so the hardcoded item data in
 * `data/` stays the single, completion-free source of truth.
 */
export interface ChecklistItem {
  /** Stable unique identifier — used as the persistence + React key. Never reuse an id. */
  id: string
  /** Short label of the task. */
  title: string
  /** Longer explanation of the task. */
  description: string
  /** The group the item belongs to; used to section the list. */
  category: string
}
