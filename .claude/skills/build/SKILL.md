---
name: build
description: "(UNVERIFIED — toolchain not built yet) Build the React app for production with Vite."
allowed-tools: Bash
---

<!-- AIND KICKSTART DRAFT — intended design captured in conversation, NOT yet validated against
     code. Re-run /aind:onboard once code exists to reconcile. -->

# build

Intended command (Vite + TypeScript project):

```bash
npm run build
```

This is expected to type-check and produce a production bundle under `dist/`.

TODO: verify once the toolchain exists — confirm `package.json` defines a `build` script (Vite's
default is `tsc && vite build`) and that the output directory is `dist/`.
