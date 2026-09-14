<!-- AIND KICKSTART DRAFT — intended design captured in conversation, NOT yet validated against
     code. The rules below are written as requirements to enforce once kept; this DRAFT status means
     YOU review and decide which to keep before relying on them. Re-run /aind:onboard once code
     exists to reconcile. -->

# Checklist domain rules

What the app *is*: an **onboarding checklist**. It presents a fixed set of onboarding tasks the user
can tick off, grouped by category, with a visible sense of how far along they are. This is the
functional lens — every feature must respect the rules below regardless of the tech stack
([[frontend]] covers the tech).

- **The core domain abstraction — `ChecklistItem`.** The system is organised around a single entity:
  a checklist item with, at minimum:
  - `id` — a stable unique identifier (used as the persistence + React key; never reuse an id).
  - `title` — the short label of the task.
  - `description` — a longer explanation of the task.
  - `category` — the group the item belongs to (used to section the list).
  - completion is **not** stored on the hardcoded item — it is user progress state, held separately
    (see persistence below).
- **Items are hardcoded.** All checklist items live in one data module (`src/data/`) as the single
  source of truth. There is no backend, no fetch, no admin UI — content changes are code changes.
- **Extension recipe — how to add / change the checklist:** add (or edit) an entry in the data
  module with a new unique `id`, a `title`, a `description`, and a `category`. **No other code change
  should be required** for the item to appear, be groupable by category, and count toward progress.
  Grouping and progress must be derived generically from the data — never hardcode a category list or
  an item count anywhere else.
- **Progress indication is mandatory — the defining invariant.** The UI must always show progress:
  at least an **overall** completed-of-total (count and/or percentage), and ideally **per-category**
  progress too. Progress is **always derived** from (completed items ÷ total items) at render time —
  never stored as a separate number that could drift out of sync with the actual completion state.
- **Categories** are a grouping dimension only; every item has exactly one. The set of categories is
  whatever the data contains — the UI discovers them from the items, it does not maintain its own
  fixed list.
- **Persistence invariant:** a user's completed set persists across refreshes (`localStorage`, per
  [[frontend]]). Clearing storage resets progress to "nothing completed"; a missing/corrupt store
  must degrade to that same empty state, never to a crash.

> **TODO (undecided):** The concrete category set (e.g. "IT setup", "HR", "Team intros", "Tooling")
> is not yet decided — leave the data category-driven so any set works, and fill real categories when
> the content is written.

> **TODO (open question):** Whether completed onboarding is ever "submitted" / reported anywhere, or
> is purely a personal local aid. Assumed **local-only, single-user** for now (no backend, no auth).
