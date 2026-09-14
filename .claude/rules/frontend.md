<!-- AIND KICKSTART DRAFT — intended design captured in conversation, NOT yet validated against
     code. The rules below are written as requirements to enforce once kept; this DRAFT status means
     YOU review and decide which to keep before relying on them. Re-run /aind:onboard once code
     exists to reconcile. -->

# Frontend rules

The only technical layer in this project: a client-side React single-page app. There is no backend,
no server, and no external API — all data is hardcoded in the bundle (see
[[checklist-domain]] rules).

- **Language / framework / version:** TypeScript + React 18, built and served with **Vite**. New
  code must be TypeScript (`.ts` / `.tsx`) — no plain `.js`/`.jsx` in `src/`.
- **Styling:** **Plain CSS via CSS Modules** (`*.module.css`), co-located next to the component that
  uses them. No Tailwind, no CSS-in-JS, and no component library — do not add a UI-framework
  dependency without a decision to revisit this rule.
- **Structure & key directories** (intended — verify once scaffolded):
  - `src/components/` — presentational + container components (one folder or file per component,
    PascalCase; its styles in a sibling `<Component>.module.css`).
  - `src/data/` — the **hardcoded** checklist item data (the single source of truth; see
    [[checklist-domain]]).
  - `src/hooks/` — reusable hooks (e.g. the progress / persistence hook).
  - `src/types.ts` (or `src/types/`) — shared TypeScript types such as `ChecklistItem`.
- **State & persistence:** progress (which items are completed) is React state, **persisted to
  `localStorage`** so it survives a page refresh. Reading/writing storage must go through a single
  hook or helper — components must not touch `localStorage` directly, so the storage key and
  serialization shape live in exactly one place. Guard against malformed/absent stored data (fall
  back to "nothing completed").
- **Components:** function components with hooks only (no class components). Keep the hardcoded data
  out of components — import it from `src/data/`. Derive progress from state; never store a
  duplicated "percent complete" that can drift (see [[checklist-domain]]).
- **What "done" looks like for a change here:** it builds (`npm run build`), it lints clean
  (`npm run lint`), the checklist renders, items toggle, and progress + persistence still work.

> **TODO (undecided):** Test framework not chosen yet (Vitest + React Testing Library vs Jest + RTL).
> Until it is decided, there is intentionally **no `testing.md` rule and no `test` skill** — do not
> assume one. Pick a framework, then add the rule + skill (Vitest + RTL is the natural fit for Vite).

> **TODO (undecided):** Exact `src/` folder layout above is the intended shape, not observed —
> reconcile with `/aind:onboard` once the app is scaffolded.

> **Tooling note:** Vite's React-TS template scaffolds ESLint config; treat lint rules as owned by
> ESLint (`.eslintrc` / `eslint.config.js`) rather than restating them here.
