---
sidebar_position: 1
title: Projects
---

import ProjectCard from '@site/src/components/ProjectCard'
import ScrollReveal from '@site/src/components/ScrollReveal'

# Projects

Three production-grade systems, each solving a hard problem end-to-end.

---

<ScrollReveal>

<div className="project-grid">

<ProjectCard
  link="/projects/vivia/"
  icon="🎮"
  title="VIVIA: Beyond the Known"
  description="Commercial voxel survival engine — procedural world with NASA climate data, embedded MeMLP neural network, multiplayer networking, 60-species creature system. Shipping on Epic Games Store, August 2026."
  tags={['Rust', 'wgpu', 'Neural Network', 'Multiplayer', 'EGS']}
  tint="#8b5cf6"
/>

<ProjectCard
  link="/projects/halycon-ebpf/"
  icon="🔬"
  title="Halcyon — eBPF Process Monitor"
  description="Real-time process and file-operation telemetry for Linux — kernel-side eBPF tracepoints, per-CPU perf buffers, sliding-window ransomware heuristic, ratatui TUI. Zero userspace library dependencies."
  tags={['Rust', 'eBPF', 'Aya', 'ratatui', 'Linux Kernel']}
  tint="#10b981"
/>

<ProjectCard
  link="/projects/externum/"
  icon="📜"
  title="Externum Language"
  description="Custom programming language compiling to Python, Bash, and binary — REPL, module system, standard library, OOP, generators, browser playground via WebAssembly. 120/120 tests."
  tags={['Python', 'Compiler', 'WebAssembly', 'REPL', '120 Tests']}
  tint="#f59e0b"
/>

</div>

</ScrollReveal>

## All Projects

| Project | Stack | Status | Tests |
|---|---|---|---|
| [VIVIA: Beyond the Known](/projects/vivia/) | Rust, wgpu, neural nets | Shipping on EGS | 282 passing |
| [Halcyon eBPF Monitor](/projects/halycon-ebpf/) | Rust, eBPF, aya | Production quality | — |
| [Externum Language](/projects/externum/) | Python, compiler | 120/120 tests | 120 passing |
| AURORA OS | Web OS, React | Active | — |
| N2 Mesh (P2P) | WebRTC, MQTT | Deployed | — |
| Cybersec Toolkit | Rust/Python | Open source | — |

---

<div style={{ textAlign: 'center', padding: '2rem 0' }}>
  <a className="btn-primary" href="mailto:bartosz.osiej@proton.me" style={{
    display: 'inline-block', padding: '0.75rem 1.5rem', borderRadius: 12,
    background: 'linear-gradient(135deg, #6366f1, #a855f7)', color: '#fff',
    fontWeight: 700, textDecoration: 'none',
  }}>
    Let's Talk →
  </a>
</div>
