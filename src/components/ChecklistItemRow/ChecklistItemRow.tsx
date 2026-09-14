import type { ChecklistItem } from '../../types'
import styles from './ChecklistItemRow.module.css'

interface ChecklistItemRowProps {
  item: ChecklistItem
  completed: boolean
  onToggle: (id: string) => void
}

/** A single onboarding task: an accessible checkbox with its title and description. */
export function ChecklistItemRow({ item, completed, onToggle }: ChecklistItemRowProps) {
  const descriptionId = `${item.id}-description`

  return (
    <li className={styles.row}>
      <label className={styles.label}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={completed}
          onChange={() => onToggle(item.id)}
          aria-describedby={descriptionId}
        />
        <span className={styles.text}>
          <span className={`${styles.title} ${completed ? styles.titleDone : ''}`}>
            {item.title}
          </span>
          <span id={descriptionId} className={styles.description}>
            {item.description}
          </span>
        </span>
      </label>
    </li>
  )
}
