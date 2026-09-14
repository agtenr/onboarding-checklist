import type { ChecklistItem } from '../types'

/**
 * The single source of truth for checklist content.
 *
 * These are PLACEHOLDER (dummy) items — the real onboarding tasks and the final
 * category set are still to be decided. To add or change an item, edit this array
 * with a new unique `id`, `title`, `description`, and `category`: grouping and
 * progress are derived generically from the data, so no other code change is needed.
 */
export const checklistItems: ChecklistItem[] = [
  {
    id: 'it-laptop',
    title: 'Pick up your laptop',
    description: 'Collect your work laptop from IT and sign in with your company account.',
    category: 'IT Setup',
  },
  {
    id: 'it-vpn',
    title: 'Install the VPN client',
    description: 'Install and connect to the VPN so you can reach internal tools from anywhere.',
    category: 'IT Setup',
  },
  {
    id: 'hr-contract',
    title: 'Sign your contract',
    description: 'Review and sign your employment contract in the HR portal.',
    category: 'HR',
  },
  {
    id: 'hr-benefits',
    title: 'Choose your benefits',
    description: 'Select your health insurance and other benefits before the enrolment deadline.',
    category: 'HR',
  },
  {
    id: 'team-intro',
    title: 'Meet your team',
    description: 'Introduce yourself in the team channel and say hello at the next stand-up.',
    category: 'Team',
  },
  {
    id: 'team-buddy',
    title: 'Set up a buddy chat',
    description: 'Schedule a first coffee chat with your assigned onboarding buddy.',
    category: 'Team',
  },
]
