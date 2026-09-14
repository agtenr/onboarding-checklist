import type { ChecklistItem } from '../../types'
import { computeProgress } from '../../lib/progress'
import { ChecklistItemRow } from '../ChecklistItemRow/ChecklistItemRow'
import { ProgressBar } from '../ProgressBar/ProgressBar'
import styles from './CategorySection.module.css'

interface CategorySectionProps {
  category: string
  items: ChecklistItem[]
  completed: ReadonlySet<string>
  onToggle: (id: string) => void
}

/** One category's heading, its per-category progress, and its list of items. */
export function CategorySection({
  category,
  items,
  completed,
  onToggle,
}: CategorySectionProps) {
  const progress = computeProgress(items, completed)

  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <h2 className={styles.title}>{category}</h2>
      </div>
      <ProgressBar progress={progress} label={`${category} progress`} />
      <ul className={styles.items}>
        {items.map((item) => (
          <ChecklistItemRow
            key={item.id}
            item={item}
            completed={completed.has(item.id)}
            onToggle={onToggle}
          />
        ))}
      </ul>
    </section>
  )
}
