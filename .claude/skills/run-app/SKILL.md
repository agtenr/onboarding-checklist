---
name: run-app
description: "(UNVERIFIED — toolchain not built yet) Start the Vite dev server for the React app locally."
allowed-tools: Bash
---

<!-- AIND KICKSTART DRAFT — intended design captured in conversation, NOT yet validated against
     code. Re-run /aind:onboard once code exists to reconcile. -->

# run-app

Intended command (Vite dev server):

```bash
npm run dev
```

This is expected to start the local dev server (Vite's default is http://localhost:5173) with hot
module reload.

TODO: verify once the toolchain exists — confirm `package.json` defines a `dev` script and the actual
port. This is a long-running process; stop it when done inspecting.
