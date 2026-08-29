---
slug: /skills
title: Skills & Stack
---

import ScrollReveal from '@site/src/components/ScrollReveal'
import GlowCard from '@site/src/components/GlowCard'
import SkillBadge from '@site/src/components/SkillBadge'

# Skills & Technology Stack

<ScrollReveal>

<div className="stats-row" style={{ marginBottom: '2rem' }}>
  <div className="stat-card">
    <div className="num">6</div>
    <div className="label">Production Systems</div>
  </div>
  <div className="stat-card">
    <div className="num">400+</div>
    <div className="label">Tests Passing</div>
  </div>
  <div className="stat-card">
    <div className="num">47k+</div>
    <div className="label">Lines of Rust</div>
  </div>
  <div className="stat-card">
    <div className="num">15</div>
    <div className="label">Repos with CI/CD</div>
  </div>
</div>

</ScrollReveal>

---

<ScrollReveal>

## 🦀 Rust — Primary Language

Production-level Rust across every domain: systems programming, async runtimes, unsafe FFI,
kernel modules (`#![no_std]`), game engines, CLI tools, and embedded neural networks.

<div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.8rem', margin: '1.2rem 0' }}>
<SkillBadge name="Async" role="tokio, crossbeam, TCP/WebSocket" icon="⚡" />
<SkillBadge name="Unsafe" role="Raw pointers, FFI, SIMD, mmio" icon="🔓" />
<SkillBadge name="GPU" role="wgpu 0.20, WGSL, compute pipelines" icon="🎮" />
<SkillBadge name="Networking" role="TCP, WebRTC, bincode, MQTT" icon="🌐" />
<SkillBadge name="AI/ML" role="ndarray, MLPs, backprop, GPU training" icon="🧠" />
<SkillBadge name="CLI" role="clap, serde, colored output" icon="⌨️" />
<SkillBadge name="no_std" role="Bare-metal, zero heap, firmware" icon="🔧" />
<SkillBadge name="Cryptography" role="ML-KEM-768, AES-GCM, SHA-256" icon="🔐" />
</div>

</ScrollReveal>

---

<ScrollReveal>

## 🖥️ Linux Kernel & eBPF

Writing kernel-side eBPF programs in Rust (`#![no_std]`, aya-ebpf), attaching to
tracepoints, and building userspace TUI dashboards that visualize kernel events.

<div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.8rem', margin: '1.2rem 0' }}>
<SkillBadge name="Tracepoints" role="execve, openat, connect hooks" icon="📍" />
<SkillBadge name="Perf Buffers" role="Lock-free per-CPU streaming" icon="📊" />
<SkillBadge name="Heuristics" role="Sliding-window ransomware detection" icon="🛡️" />
<SkillBadge name="Build" role="nightly Rust + -Z build-std" icon="⚙️" />
<SkillBadge name="Aya" role="aya-ebpf kernel, aya userspace" icon="🦀" />
<SkillBadge name="FrankenTUI" role="7-panel cyberpunk dashboard" icon="🖥️" />
</div>

</ScrollReveal>

---

<ScrollReveal>

## 🎮 Game Engine Development

Building a commercial voxel engine from scratch: GPU rendering, procedural generation,
physics, audio, multiplayer networking, and embedded AI.

<div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.8rem', margin: '1.2rem 0' }}>
<SkillBadge name="Renderer" role="wgpu, Blinn-Phong, ACES, procedural sky" icon="🎨" />
<SkillBadge name="World Gen" role="OpenSimplex2, 9 biomes, async chunks" icon="🌍" />
<SkillBadge name="AI" role="MeMLP (4 modules), online training" icon="🧠" />
<SkillBadge name="Audio" role="rodio, spatial audio, 3D mob sounds" icon="🔊" />
<SkillBadge name="Multiplayer" role="TCP, entity sync, anti-cheat" icon="👥" />
<SkillBadge name="Physics" role="Collision, gravity, entity systems" icon="⚙️" />
</div>

</ScrollReveal>

---

<ScrollReveal>

## ⚙️ Compilers & Languages

Designing and implementing a custom programming language with transpilation,
a REPL, module system, and browser execution.

<div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.8rem', margin: '1.2rem 0' }}>
<SkillBadge name="Transpiler" role="Multi-target: Python, Bash, binary" icon="🔄" />
<SkillBadge name="Parser" role="Recursive descent, AST, precedence" icon="📝" />
<SkillBadge name="REPL" role="Interactive shell, history, completion" icon="💻" />
<SkillBadge name="Modules" role="Import system, stdlib in target lang" icon="📦" />
<SkillBadge name="WebAssembly" role="Pyodide browser playground" icon="🌐" />
<SkillBadge name="Testing" role="120/120 conformance tests" icon="✅" />
</div>

</ScrollReveal>

---

<ScrollReveal>

## 🔒 Security & Cybersecurity

Building and analyzing security tools: network scanners, packet analyzers,
hash utilities, and system monitors.

<div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.8rem', margin: '1.2rem 0' }}>
<SkillBadge name="Packet Analysis" role="Raw socket, protocol parsing" icon="📦" />
<SkillBadge name="Network Recon" role="Port scan, fingerprinting, OS detect" icon="🔍" />
<SkillBadge name="Forensics" role="Hash analysis, entropy, file carving" icon="🔬" />
<SkillBadge name="Hardening" role="Input validation, rate limiting" icon="🛡️" />
<SkillBadge name="Post-Quantum" role="ML-KEM-768, NIST FIPS 203" icon="🔐" />
<SkillBadge name="Measured Boot" role="SHA-256, PCR registers, attestation" icon="⛓️" />
</div>

</ScrollReveal>

---

<ScrollReveal>

## 🌐 Web & Infrastructure

Full-stack web development, CI/CD pipelines, and deployment automation.

<div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.8rem', margin: '1.2rem 0' }}>
<SkillBadge name="Frontend" role="React, TypeScript, Docusaurus" icon="🎨" />
<SkillBadge name="Backend" role="FastAPI, WebRTC, MQTT" icon="⚙️" />
<SkillBadge name="DevOps" role="GitHub Actions, Docker, releases" icon="🚀" />
<SkillBadge name="Databases" role="SQLite, PostgreSQL, Redis" icon="💾" />
</div>

</ScrollReveal>

---

<ScrollReveal>

## 🚀 Flagship Projects

<div className="project-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem', margin: '1.4rem 0' }}>

<GlowCard>
<div style={{ padding: '0.2rem' }}>

### 🎮 VIVIA: Beyond the Known
Commercial voxel survival engine — procedural world with NASA climate data, embedded neural network, multiplayer TCP, 60-species creature system. **Shipping on Epic Games Store.**

`Rust` `wgpu` `Neural Network` `Multiplayer` `EGS`

**[→ View Project](/projects/vivia/)**

</div>
</GlowCard>

<GlowCard>
<div style={{ padding: '0.2rem' }}>

### 🔬 Talus — eBPF Endpoint Security
eBPF endpoint security agent for Linux — detect ransomware, respond at kernel edge. Tracepoints, perf buffers, sliding-window heuristic, automated SIGKILL, FrankenTUI.

`Rust` `eBPF` `Aya` `FrankenTUI` `Linux Kernel`

**[→ View Project](/projects/talus-process-monitor/)**

</div>
</GlowCard>

<GlowCard>
<div style={{ padding: '0.2rem' }}>

### 📜 Externum Language
Custom programming language compiling to Python, Bash, and binary — REPL, module system, OOP, browser playground via WebAssembly. **120/120 tests.**

`Python` `Compiler` `WebAssembly` `REPL` `120 Tests`

**[→ View Project](/projects/externum/)**

</div>
</GlowCard>

<GlowCard>
<div style={{ padding: '0.2rem' }}>

### 🔒 CyberForge
Four Rust security tools as one workspace — port scanner, web scanner, hash cracker, packet analyzer. Each shipped on crates.io. **29/29 tests.**

`Rust` `Tokio` `libpcap` `4 Tools`

**[→ View Project](/projects/cyberforge/)**

</div>
</GlowCard>

<GlowCard>
<div style={{ padding: '0.2rem' }}>

### 🛡️ QuantumShield
Post-quantum file encryption CLI — ML-KEM-768 key exchange + AES-256-GCM + HKDF. NIST FIPS 203 compliant, fuzz-tested.

`Rust` `Cryptography` `NIST` `FIPS 203`

**[→ View Project](/projects/quantumshield/)**

</div>
</GlowCard>

<GlowCard>
<div style={{ padding: '0.2rem' }}>

### 🔐 Fortis
Bare-metal RISC-V measured boot — SHA-256 + ML-KEM-768 chain of trust. Real crypto on real hardware. 51 KiB binary, zero heap.

`Rust` `RISC-V` `no_std` `Bare Metal`

**[→ View Project](/projects/fortis/)**

</div>
</GlowCard>

</div>

</ScrollReveal>

---

<ScrollReveal>

## 📦 Distribution — everything ships, nothing rots

<div className="stats-row" style={{ marginBottom: '1.5rem' }}>
  <div className="stat-card">
    <div className="num">13</div>
    <div className="label">Docker Images</div>
  </div>
  <div className="stat-card">
    <div className="num">8</div>
    <div className="label">crates.io</div>
  </div>
  <div className="stat-card">
    <div className="num">2</div>
    <div className="label">PyPI</div>
  </div>
  <div className="stat-card">
    <div className="num">6</div>
    <div className="label">npm</div>
  </div>
</div>

Every repository runs the same production-grade pipeline:

- **CodeQL** security scanning — 15/15 repos
- **Dependabot** + vulnerability alerts — 15/15 repos
- **Branch protection** + squash-merge history — 15/15 repos
- **OpenSSF Scorecard** — automated supply-chain grading
- **cosign keyless signing** — Sigstore/Fulcio OIDC
- **SLSA v1 provenance** — build attestation on every release

</ScrollReveal>

---

<div style={{ textAlign: 'center', padding: '2rem 0' }}>

**Let's build something together.**

📧 [bartosz.osiej@proton.me](mailto:bartosz.osiej@proton.me) · 🐙 [GitHub](https://github.com/BartoszOsiej)

</div>
