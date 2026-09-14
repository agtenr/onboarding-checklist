# Plan — Scaffold the project and seed dummy checklist content (Work item 1)

## Context

The repository has no application code yet — only AIND config and project rules. This story
bootstraps the client-side onboarding-checklist app (Vite + React 18 + TypeScript, CSS Modules,
`localStorage` persistence) so later feature work has a working foundation. It also seeds `src/data/`
with a few placeholder `ChecklistItem`s across a small set of categories and wires up a minimal but
fully working checklist: grouped rendering, toggling, derived progress, and persistence.

- *(dev-seeded)* **Scaffolding approach:** generate the base with
  `npm create vite@latest . -- --template react-ts`, then delete the template's demo boilerplate and
  build the checklist on top. This gives us ESLint flat config, `tsconfig`, and `dev`/`build`/`lint`
  scripts for free, consistent with the frontend rule that lint config is owned by ESLint rather than
  restated in the rules.

## Keep it simple

Non-goals — deliberately **not** built in this story:

- **No real onboarding content.** Categories and item copy are throwaway placeholders; writing the
  real content is a separate, later data-only change.
- **No test framework.** No test framework is chosen yet (`rules/frontend.md` TODO), and the coder
  must not bootstrap one per story — so this story ships no automated tests. (Adoption is noted under
  *Considerations*.)
- **No backend / fetch / admin UI / auth.** Data stays hardcoded in the bundle; progress stays
  local-only and single-user.
- **No routing, no state library, no UI framework.** A single-page render with React state + one
  persistence hook is sufficient; adding Redux/Zustand/Tailwind/a component library would violate the
  frontend rule and over-build the scope.
- **No storage-schema versioning / migration.** A single stored key holding the completed set is
  enough; there is no prior shape to migrate from.

## AC coverage

| AC | Status | Where |
|---|---|---|
| `package.json` with Vite + React 18 + TS; `npm install` succeeds; `build`/`lint`/`run-app` skills verified | covered | Task 1, Task 8 |
| `npm run build` succeeds and `npm run lint` clean | covered | Task 8 |
| `src/` layout: `components/`, `data/`, `hooks/`, shared `ChecklistItem` type | covered | Task 2, Task 3, Task 4, Task 5 |
| `src/data/` has placeholder items (id/title/description/category) across 2–3 categories; completion not on item | covered | Task 3 (content set → D2: 3×2) |
| Renders grouped by category, categories discovered from data (no hardcoded list/count) | covered | Task 5 |
| Items toggle; progress shown and derived at render — overall, ideally per-category | covered | Task 4, Task 6, Task 7 (per-category → D3: both) |
| Completion persists via `localStorage` through a single hook; missing/corrupt store degrades to empty | covered | Task 4 |
| CSS Modules co-located; no UI framework / CSS-in-JS | covered | all component tasks |

## Implementation approach

Scaffold with the Vite `react-ts` template into the repo root, strip its demo (the counter `App`,
demo assets, `App.css`), and keep its config (`tsconfig*.json`, `vite.config.ts`, `eslint.config.js`,
`index.html`, `src/main.tsx`, `src/vite-env.d.ts`, a minimal global `src/index.css`). Then build the
domain on top in the intended layout:

- **Type** (`src/types.ts`) — the single `ChecklistItem` shape.
- **Data** (`src/data/checklistItems.ts`) — the hardcoded array; the single source of truth.
- **Persistence hook** (`src/hooks/useCompletedItems.ts`) — the *only* place that touches
  `localStorage`; owns the storage key + serialization and guards against malformed/absent data.
- **Derivation helper** (`src/lib/progress.ts`) — pure functions to group items by category and
  compute progress, so grouping/progress are derived generically from the data (no hardcoded
  category list or item count). Kept out of components per the frontend rule.
- **Components** (`src/components/*`) — presentational, function components with hooks only, each with
  a co-located `*.module.css`: `Checklist` (container: reads data + hook, renders groups + overall
  progress), `CategorySection` (one category's items + optional per-category progress),
  `ChecklistItemRow` (a single toggleable item), `ProgressBar` (reusable progress display).
- **`App.tsx`** renders `<Checklist />`; `main.tsx` mounts `<App />`.

Progress is always computed at render from `(completed ∩ items) / items` — never stored as a separate
number (checklist-domain invariant).

## Data contracts

One boundary only: the app ↔ `localStorage`. Pin the persisted shape so the single hook is the sole
owner of it.

- **Storage key:** `onboarding-checklist.completed` (a single string constant in the hook).
- **Serialized value:** `JSON.stringify(string[])` — a flat array of completed `ChecklistItem.id`s,
  e.g. `["it-1","hr-2"]`. *(per D1.)*
- **Read/parse (defensive):** `JSON.parse`; accept only an array whose every element is a `string`;
  on `null`/parse error/wrong shape, fall back to the empty set. Never throw to the UI.
- **In-memory shape:** a `Set<string>` of completed ids (deduped, O(1) membership); serialized to a
  sorted array on write.
- **`ChecklistItem`** (in-bundle data, not persisted): `{ id: string; title: string; description:
  string; category: string }` — completion is **not** a field on it.

## Task breakdown

Ordered so foundations precede consumers. All tasks obey `rules/frontend.md`; data/domain tasks also
obey `rules/checklist-domain.md`.

1. **Scaffold the toolchain.** Run `npm create vite@latest . -- --template react-ts` in the repo
   root, then `npm install`. Confirm `package.json` pins React 18 (`react`/`react-dom` `^18`) — if
   the template pulls React 19, downgrade to 18 per the rule. *(rules/frontend.md)*
2. **Strip demo boilerplate & set the shared type.** Remove the counter demo from `App.tsx`, delete
   `src/App.css`/demo SVG assets, trim `src/index.css` to a minimal reset. Add `src/types.ts` with
   the `ChecklistItem` interface. *(rules/frontend.md, rules/checklist-domain.md)*
3. **Seed the data module.** `src/data/checklistItems.ts` exporting `ChecklistItem[]` — ~6 placeholder
   items with stable unique `id`s across 3 categories ("IT Setup", "HR", "Team"), completion not
   stored on items (per D2). *(rules/checklist-domain.md)*
4. **Persistence hook.** `src/hooks/useCompletedItems.ts` — the single `localStorage` owner: key
   constant, defensive read (→ empty set on missing/corrupt), `Set<string>` state, `toggle(id)`,
   `isCompleted(id)`, persist on change via `useEffect`. Components never touch storage directly.
   *(rules/frontend.md, rules/checklist-domain.md — persistence invariant)*
5. **Derivation helper + Checklist container.** `src/lib/progress.ts` (pure: `groupByCategory(items)`
   preserving first-seen category order; `computeProgress(items, completed)` → `{completed, total}`).
   `src/components/Checklist/Checklist.tsx` (+ `.module.css`) wires data + hook, discovers categories
   from data, renders overall progress + a `CategorySection` per category. *(rules/frontend.md,
   rules/checklist-domain.md — derived grouping/progress, no hardcoded list/count)*
6. **Item row + category section.** `ChecklistItemRow` (+ `.module.css`): title, description,
   accessible checkbox calling `toggle(id)`, `id` as React key. `CategorySection` (+ `.module.css`):
   category heading, its items, and per-category progress (per D3). *(rules/frontend.md,
   rules/checklist-domain.md)*
7. **ProgressBar.** `src/components/ProgressBar/ProgressBar.tsx` (+ `.module.css`): reusable
   completed-of-total display (count and/or %), reused for overall and per-category (per D3). *(rules/frontend.md)*
8. **Verify the skills & done bar.** Run `npm run build` and `npm run lint`; start `npm run dev` to
   confirm render/toggle/persist. Update the three UNVERIFIED skill stubs (`build`, `lint`,
   `run-app`) to remove the UNVERIFIED marker once the actual `package.json` scripts/ports are
   confirmed. *(rules/frontend.md — "what done looks like")*

## Decisions (settled in planning with the dev)

*The genuine choices below were resolved live during planning — none remain open, so no assumption
threads are posted on the PR.*

- **D1 — Persisted shape of the completed set.** Store as a flat **array of ids**
  (`JSON.stringify(string[])`). *(decided in planning with the dev)*
- **D2 — Placeholder categories & item count.** Seed **3 categories × ~2 items each (~6 items):
  "IT Setup", "HR", "Team"** — throwaway content (the real category set stays open per the
  checklist-domain TODO). *(decided in planning with the dev)*
- **D3 — Per-category progress.** Implement **both overall *and* per-category** progress in this
  story; the "ideally per-category" AC is therefore **fully covered**, not narrowed. *(decided in
  planning with the dev)*

## Assumptions & open questions

None — all genuine choices were settled live during planning (see **Decisions** above).

## Considerations

- **Test framework adoption (FYI).** The project could adopt Vitest + React Testing Library (the
  natural fit for Vite) in a dedicated story; until then, per the rule, this story adds no tests. Not
  actioned here.
- **React version drift.** Vite's current `react-ts` template may scaffold React 19; the rule pins
  React 18, so Task 1 must verify/adjust. Called out so the coder doesn't accept the template default
  blindly.
- **Accessibility.** Item toggles should be real checkbox inputs with associated labels so the list
  is keyboard- and screen-reader-navigable; low cost, handled in Task 6.

## Testing recommendations

- **Whether to test:** the project has **no test framework, rule, or `test` skill** — so this story
  ships **no automated tests**, and the coder must **not** bootstrap a framework per story.
- **Verification is manual/live instead:** exercise the running app before merge — see the
  Definition-of-done live-verification line.

## Definition of done

- [ ] `npm install` succeeds from a clean checkout.
- [ ] `npm run build` completes with no type errors and emits `dist/`.
- [ ] `npm run lint` reports no errors.
- [ ] `src/` contains `components/`, `data/`, `hooks/`, and a shared `ChecklistItem` type in
      `src/types.ts`.
- [ ] `src/data/` holds the placeholder items (stable unique ids; no completion field on the item)
      across the agreed categories (Q2).
- [ ] The checklist renders grouped by category, with categories discovered from the data (no
      hardcoded category list or item count anywhere).
- [ ] Items toggle complete/incomplete, and both overall and per-category progress (count and/or %)
      update, derived at render (per D3).
- [ ] Completion persists across a page refresh; clearing / corrupting `localStorage` resets to
      "nothing completed" without crashing.
- [ ] Only the persistence hook/helper touches `localStorage`; no component reads/writes it directly.
- [ ] Styling is CSS Modules co-located with components; no UI framework / CSS-in-JS added.
- [ ] The `build`, `lint`, and `run-app` skill stubs are updated to match the real scripts and the
      UNVERIFIED marker removed.
- [ ] **Manual live verification before merge:** app runs via `npm run dev`, items toggle, progress
      updates, and progress survives a refresh.

## Files/areas affected

- **Created (scaffold):** `package.json`, `package-lock.json`, `tsconfig.json`, `tsconfig.node.json`,
  `vite.config.ts`, `eslint.config.js`, `index.html`, `src/main.tsx`, `src/vite-env.d.ts`,
  `src/index.css`.
- **Created (domain):** `src/types.ts`, `src/data/checklistItems.ts`,
  `src/hooks/useCompletedItems.ts`, `src/lib/progress.ts`,
  `src/components/Checklist/{Checklist.tsx,Checklist.module.css}`,
  `src/components/CategorySection/{CategorySection.tsx,CategorySection.module.css}`,
  `src/components/ChecklistItemRow/{ChecklistItemRow.tsx,ChecklistItemRow.module.css}`,
  `src/components/ProgressBar/{ProgressBar.tsx,ProgressBar.module.css}`,
  `src/App.tsx`, `src/App.module.css`.
- **Modified:** `.claude/skills/build/SKILL.md`, `.claude/skills/lint/SKILL.md`,
  `.claude/skills/run-app/SKILL.md` (remove UNVERIFIED once confirmed).
- **Note:** `.gitignore` (Vite template appends `node_modules`, `dist`, etc. — keep the existing
  AIND lines).
