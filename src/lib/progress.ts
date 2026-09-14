import type { ChecklistItem } from '../types'

/** A category and the items that belong to it, in first-seen order. */
export interface CategoryGroup {
  category: string
  items: ChecklistItem[]
}

/** A completed-of-total tally. `percent` is 0 when there are no items (no division by zero). */
export interface Progress {
  completed: number
  total: number
  percent: number
}

/**
 * Group items by their `category`, discovering the categories from the data itself
 * (no hardcoded category list). Category order follows first appearance in `items`,
 * so the display order is data-driven and stable.
 */
export function groupByCategory(items: ChecklistItem[]): CategoryGroup[] {
  const groups: CategoryGroup[] = []
  const indexByCategory = new Map<string, number>()

  for (const item of items) {
    const existing = indexByCategory.get(item.category)
    if (existing === undefined) {
      indexByCategory.set(item.category, groups.length)
      groups.push({ category: item.category, items: [item] })
    } else {
      groups[existing].items.push(item)
    }
  }

  return groups
}

/**
 * Derive progress for a set of items from the completed set. Always computed at
 * call time from (completed ∩ items) / total — progress is never stored, so it
 * cannot drift out of sync with the actual completion state.
 */
export function computeProgress(
  items: ChecklistItem[],
  completed: ReadonlySet<string>,
): Progress {
  const total = items.length
  const completedCount = items.reduce(
    (count, item) => (completed.has(item.id) ? count + 1 : count),
    0,
  )
  const percent = total === 0 ? 0 : Math.round((completedCount / total) * 100)
  return { completed: completedCount, total, percent }
}
