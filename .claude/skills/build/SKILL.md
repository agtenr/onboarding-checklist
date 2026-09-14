---
name: build
description: "Build the React app for production with Vite."
allowed-tools: Bash
---

# build

Build the production bundle:

```bash
npm run build
```

This runs `tsc -b && vite build` (type-checks the project references, then bundles with Vite) and
emits the production output to `dist/`.
