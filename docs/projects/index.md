---
sidebar_position: 1
title: Projects
---

import ProjectCard from '@site/src/components/ProjectCard'
import ScrollReveal from '@site/src/components/ScrollReveal'

# Projects

Six production-grade systems, each solving a hard problem end-to-end.

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
  link="/projects/talus-process-monitor/"
  icon="🔬"
  title="Talus — eBPF Endpoint Security Agent"
  description="eBPF endpoint security agent for Linux — detect ransomware behaviour, respond at the kernel edge. execve/openat/connect tracepoints, per-CPU perf buffers, sliding-window heuristic, automated SIGKILL response, FrankenTUI."
  tags={['Rust', 'eBPF', 'Aya', 'FrankenTUI', 'Linux Kernel']}
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

<ProjectCard
  link="/projects/cyberforge/"
  icon="🔒"
  title="CyberForge"
  description="Four Rust security tools as one workspace — port scanner, web scanner, hash cracker, packet analyzer. Each shipped separately on crates.io. 29/29 tests green."
  tags={['Rust', 'Tokio', 'libpcap', '4 Tools']}
  tint="#f472b6"
/>

<ProjectCard
  link="/projects/quantumshield/"
  icon="🛡️"
  title="QuantumShield"
  description="Post-quantum file encryption CLI — ML-KEM-768 key exchange + AES-256-GCM + HKDF. NIST FIPS 203 compliant, fuzz-tested. Quantum-safe before quantum computers arrive."
  tags={['Rust', 'Cryptography', 'NIST', 'FIPS 203']}
  tint="#6366f1"
/>

<ProjectCard
  link="/projects/fortis/"
  icon="🔐"
  title="Fortis"
  description="Bare-metal RISC-V measured boot — SHA-256 + ML-KEM-768 chain of trust. Real crypto on real hardware (QEMU). 51 KiB binary, zero heap, no_std."
  tags={['Rust', 'RISC-V', 'no_std', 'Bare Metal']}
  tint="#10b981"
/>

</div>

</ScrollReveal>

## All Projects

| Project | Stack | Status | Tests |
|---|---|---|---|
| [VIVIA: Beyond the Known](/projects/vivia/) | Rust, wgpu, neural nets | Shipping on EGS | 282 passing |
| [Talus eBPF Monitor](/projects/talus-process-monitor/) | Rust, eBPF, aya | Production quality | 9 passing |
| [Externum Language](/projects/externum/) | Python, compiler | 120/120 tests | 120 passing |
| [CyberForge](/projects/cyberforge/) | Rust, Tokio, pcap | Open source | 29 passing |
| [QuantumShield](/projects/quantumshield/) | Rust, crypto, NIST | Open source | 18 passing |
| [Fortis](/projects/fortis/) | Rust, RISC-V, no_std | Open source | CI-tested |

---

<div style={{ textAlign: 'center', padding: '2rem 0' }}>
  <a className="btn-primary" href="mailto:mmc29213@gmail.com" style={{
    display: 'inline-block', padding: '0.75rem 1.5rem', borderRadius: 12,
    background: 'linear-gradient(135deg, #6366f1, #a855f7)', color: '#fff',
    fontWeight: 700, textDecoration: 'none',
  }}>
    Let's Talk →
  </a>
</div>
