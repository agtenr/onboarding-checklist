---
name: lint
description: "(UNVERIFIED — toolchain not built yet) Lint the TypeScript/React source with ESLint."
allowed-tools: Bash
---

<!-- AIND KICKSTART DRAFT — intended design captured in conversation, NOT yet validated against
     code. Re-run /aind:onboard once code exists to reconcile. -->

# lint

Intended command (ESLint, which Vite's React-TS template scaffolds):

```bash
npm run lint
```

TODO: verify once the toolchain exists — confirm `package.json` defines a `lint` script and that an
ESLint config (`eslint.config.js` / `.eslintrc`) is present. If the project later chooses a different
formatter/linter, update this skill accordingly.
