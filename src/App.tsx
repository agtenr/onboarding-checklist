import { Checklist } from './components/Checklist/Checklist'
import styles from './App.module.css'

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.title}>Onboarding Checklist</h1>
        <p className={styles.subtitle}>
          Work through your onboarding tasks — your progress is saved on this device.
        </p>
      </header>
      <main>
        <Checklist />
      </main>
    </div>
  )
}

export default App
