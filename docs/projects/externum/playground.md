---
sidebar_position: 6
title: Browser Playground
---

# Externum — Browser Playground

## How It Works

The Externum playground executes **entirely in your browser** — no server, no API
keys, no network requests.

```
┌─────────────────────────────────────────────────┐
│  Browser                                        │
│                                                 │
│  ┌───────────────┐    ┌──────────────────────┐  │
│  │  Externum     │    │  Pyodide             │  │
│  │  Playground   │───►│  (Python → WASM)     │  │
│  │  (React UI)   │    │                      │  │
│  └───────────────┘    └──────────────────────┘  │
│         │                       │               │
│         ▼                       ▼               │
│  ┌───────────────┐    ┌──────────────────────┐  │
│  │  Code Editor  │    │  Externum Transpiler │  │
│  │  (textarea)   │    │  (runs in WASM)      │  │
│  └───────────────┘    └──────────────────────┘  │
│         │                       │               │
│         ▼                       ▼               │
│  ┌──────────────────────────────────────────┐   │
│  │  Output Panel                            │   │
│  │  (stdout / stderr / errors)              │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

## Tech Stack

- **Pyodide** — Python runtime compiled to WebAssembly
- **Externum transpiler** — the Python-based transpiler runs inside Pyodide
- **React** — UI components (editor, output, controls)
- **No server** — everything runs client-side

## Usage

1. Write Externum code in the editor
2. Click **▶ Run**
3. The transpiler converts to Python
4. Pyodide executes the Python output
5. stdout/stderr displayed in the output panel

## Limitations

- **Shell integration** (`` `cmd` ``, `%% ... %%`) — not available in browser
- **File I/O** — browser sandboxed, no real filesystem
- **Binary compilation** — not available (Python transpilation only)
- **Module imports** — limited to built-in modules

## Running Locally

```bash
# The playground is part of the Docs site
cd docs-site
npm install
npm run start

# Navigate to /externum/playground
```

## Why WebAssembly?

Pyodide brings the full Python runtime to the browser via WebAssembly.
This means:
- **Zero server costs** — no backend to maintain
- **Instant execution** — no network latency
- **Offline capable** — works without internet (after initial load)
- **Privacy** — code never leaves the user's browser
