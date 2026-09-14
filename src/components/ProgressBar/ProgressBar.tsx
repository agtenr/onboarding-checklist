import type { Progress } from '../../lib/progress'
import styles from './ProgressBar.module.css'

interface ProgressBarProps {
  progress: Progress
  /** Accessible label describing what this bar measures (e.g. "Overall progress"). */
  label: string
}

/** Reusable completed-of-total display: a labelled count, a percentage, and a bar. */
export function ProgressBar({ progress, label }: ProgressBarProps) {
  const { completed, total, percent } = progress

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        <span className={styles.count}>
          {completed} / {total} ({percent}%)
        </span>
      </div>
      <div
        className={styles.track}
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={completed}
      >
        <div className={styles.fill} style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}
