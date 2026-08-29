---
slug: /skills
title: Skills & Stack
---

import ScrollReveal from '@site/src/components/ScrollReveal'
import GlowCard from '@site/src/components/GlowCard'

# Skills & Technology Stack

<ScrollReveal>

## 🦀 Rust (Primary)

Production-level Rust across every domain: systems programming, async runtimes, unsafe FFI,
kernel modules (`#![no_std]`), game engines, CLI tools, and embedded neural networks.

| Area | Experience |
|---|---|
| **Async** | tokio, crossbeam, async-std, TCP/WebSocket servers |
| **Unsafe** | Raw pointers, FFI bindings, memory-mapped I/O, SIMD |
| **GPU** | wgpu 0.20, WGSL shaders, instanced rendering, compute pipelines |
| **Networking** | TCP multiplayer, WebRTC P2P, bincode serialization |
| **AI/ML** | ndarray, embedded MLPs, backpropagation, online training |
| **CLI** | clap, serde, colored output, progress bars |

</ScrollReveal>

<ScrollReveal>

## 🖥️ Linux Kernel & eBPF

Writing kernel-side eBPF programs in Rust (`#![no_std]`, aya-ebpf), attaching to
tracepoints, and building userspace TUI dashboards that visualize kernel events.

- **Tracepoint programs** — `execve`, `openat`, `connect` hooks
- **Perf buffers** — lock-free per-CPU event streaming to userspace
- **Heuristics** — sliding-window ransomware detection (entropy, rename velocity)
- **Build** — nightly Rust + `-Z build-std` for kernel targets
- **Userspace** — FrankenTUI (ftui), async perf reader, per-process tracking

</ScrollReveal>

<ScrollReveal>

## 🎮 Game Engine Development

Building a commercial voxel engine from scratch: GPU rendering, procedural generation,
physics, audio, multiplayer networking, and embedded AI.

- **Renderer** — wgpu, instanced geometry, per-fragment lighting (Blinn-Phong),
  ACES tonemapping, procedural sky, fog, weather system
- **World Gen** — OpenSimplex2 heightmaps, caves, ores, 9 biome climate model,
  async chunk streaming with bounded work queue
- **AI** — MeMLP neural network (4 modules: vegetation, biome, texture, motion),
  online training, GPU texture generation pipeline
- **Audio** — rodio procedural audio, spatial audio (Source 2 pattern), 3D mob sounds
- **Multiplayer** — TCP networking, entity sync, chunk streaming, anti-cheat validation

</ScrollReveal>

<ScrollReveal>

## ⚙️ Compilers & Languages

Designing and implementing a custom programming language with transpilation,
a REPL, module system, and browser execution.

- **Transpiler** — multi-target compilation (Python, Bash, binary)
- **Parser** — recursive descent, operator precedence, AST generation
- **REPL** — interactive shell with history and tab completion
- **Modules** — import system, standard library in the target language
- **WebAssembly** — Pyodide-based browser playground, zero server
- **Testing** — 120/120 automated tests, CI/CD pipeline

</ScrollReveal>

<ScrollReveal>

## 🔒 Security & Cybersecurity

Building and analyzing security tools: network scanners, packet analyzers,
hash utilities, and system monitors.

- **Packet analysis** — raw socket capture, protocol parsing, DNS/HTTP inspection
- **Network recon** — port scanning, service fingerprinting, OS detection
- **Forensics** — hash analysis, entropy detection, file carving
- **Hardening** — input validation, rate limiting, anti-slowloris, coordinate bomb protection

</ScrollReveal>

<ScrollReveal>

## 🌐 Web & Infrastructure

Full-stack web development, CI/CD pipelines, and deployment automation.

- **Frontend** — React, TypeScript, Docusaurus, custom CSS themes
- **Backend** — FastAPI (Python), WebRTC, MQTT
- **DevOps** — GitHub Actions, Docker, automated testing, release pipelines
- **Databases** — SQLite, PostgreSQL, Redis

</ScrollReveal>

---

## Open Source Portfolio

| Project | Stack | Status |
|---|---|---|
| **VIVIA: Beyond the Known** | Rust, wgpu, neural nets, multiplayer | Shipping on EGS |
| **Talus eBPF Monitor** | Rust, eBPF, aya, FrankenTUI | Production quality |
| **Externum Language** | Python, compiler, WASM | 120/120 tests |
| **Aurora** | Web OS, React, plugins | Active development |
| **Meshcore** | WebRTC, P2P, MQTT | Deployed |
| **CyberForge** | Rust/Python, networking | Open source |

---

<div style={{ textAlign: 'center', padding: '2rem 0' }}>

**Let's build something together.**

📧 [bartosz.osiej@proton.me](mailto:bartosz.osiej@proton.me) · 🐙 [GitHub](https://github.com/BartoszOsiej)

</div>
