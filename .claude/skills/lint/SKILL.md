---
name: lint
description: "Lint the TypeScript/React source with ESLint."
allowed-tools: Bash
---

# lint

Lint the source:

```bash
npm run lint
```

This runs `eslint .` using the flat config in `eslint.config.js` (typescript-eslint +
`react-hooks` + `react-refresh`). A clean run exits 0 with no output.
