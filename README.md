# Bartosz Osiej — Portfolio

Professional portfolio site showcasing three production-grade systems:

- **VIVIA: Beyond the Known** — Commercial voxel survival engine (Rust, wgpu, neural networks)
- **Halcyon — eBPF Monitor** — Real-time kernel telemetry for Linux (Rust, eBPF, aya)
- **Externum Language** — Custom programming language (Python, compiler, WebAssembly)

**Live site:** https://bartoszosiej.github.io/Portfolio/

## Tech

- [Docusaurus](https://docusaurus.dev/) — Static site generator
- Dark aurora theme with glassmorphism
- Deployed via GitHub Actions → GitHub Pages

## Local development

```bash
npm install
npm run start           # dev server with hot reload
npm run build           # production build to build/
npm run serve           # preview the production build
```

## Publishing

Push to `main` — GitHub Actions builds the site and deploys it automatically.
