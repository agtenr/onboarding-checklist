import { checklistItems } from '../../data/checklistItems'
import { useCompletedItems } from '../../hooks/useCompletedItems'
import { computeProgress, groupByCategory } from '../../lib/progress'
import { CategorySection } from '../CategorySection/CategorySection'
import { ProgressBar } from '../ProgressBar/ProgressBar'
import styles from './Checklist.module.css'

/**
 * Top-level container: reads the hardcoded items and the completed set, then
 * renders overall progress plus one section per category. Categories and the
 * overall total are derived from the data — nothing here is hardcoded.
 */
export function Checklist() {
  const { completed, toggle } = useCompletedItems()

  const groups = groupByCategory(checklistItems)
  const overall = computeProgress(checklistItems, completed)

  return (
    <div className={styles.checklist}>
      <div className={styles.overall}>
        <ProgressBar progress={overall} label="Overall progress" />
      </div>
      <div className={styles.sections}>
        {groups.map((group) => (
          <CategorySection
            key={group.category}
            category={group.category}
            items={group.items}
            completed={completed}
            onToggle={toggle}
          />
        ))}
      </div>
    </div>
  )
}
