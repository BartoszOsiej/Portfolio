---
sidebar_position: 1
title: Halcyon — eBPF Process Monitor
---

import ScrollReveal from '@site/src/components/ScrollReveal'
import GlowCard from '@site/src/components/GlowCard'

# Halcyon — eBPF Process Monitor

> **Real-time, eBPF-based process and file-operation telemetry for Linux.
> Kernel-side tracepoint programs, per-CPU perf buffers, sliding-window
> ransomware heuristic, ratatui TUI dashboard.**

<ScrollReveal>

## What It Does

Halcyon hooks into the Linux kernel at the **tracepoint level** — capturing every
`execve` (process creation) and `openat` (file open) without polling, without
`/proc` parsing, without library dependencies. Events stream through lock-free
per-CPU perf buffers into a userspace TUI that visualizes process trees,
file operations, and security anomalies in real time.

## Key Features

<div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem', margin: '1.5rem 0' }}>

<GlowCard>
<div>

### 🔬 Kernel-Level Telemetry
eBPF tracepoint programs capture `execve` and `openat` at the syscall boundary.
No polling, no `/proc` parsing, no library version dependencies. Works on any
Linux 5.8+ kernel.

</div>
</GlowCard>

<GlowCard>
<div>

### 📊 Per-CPU Perf Buffers
Lock-free per-CPU event streaming ensures zero contention between cores.
Events are batched and flushed to userspace with minimal overhead — the
kernel does the heavy lifting.

</div>
</GlowCard>

<GlowCard>
<div>

### 🛡️ Ransomware Detection
Sliding-window heuristic monitors file rename velocity and entropy changes.
When a process exhibits ransomware-like behavior (mass renames + high entropy),
Halcyon flags it in real time with process tree context.

</div>
</GlowCard>

<GlowCard>
<div>

### 🖥️ TUI Dashboard
ratatui-powered terminal UI with per-process tracking, file operation
history, and live event streaming. Keyboard-driven, zero mouse dependency.

</div>
</GlowCard>

<GlowCard>
<div>

### ⚡ Zero Dependencies
No userspace eBPF library required — the kernel does everything. Halcyon
loads the compiled eBPF object directly via `aya::Ebpf::load_file`. The
userspace side is pure Rust stable.

</div>
</GlowCard>

<GlowCard>
<div>

### 🔒 Security-First
Designed for production security monitoring. Input validation, rate limiting,
and graceful degradation under load. No data leaves the machine.

</div>
</GlowCard>

</div>

</ScrollReveal>

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Linux Kernel                            │
│  ┌──────────────────┐    ┌──────────────────────────────┐  │
│  │ execve tracepoint │    │ openat tracepoint             │  │
│  │ (process create)  │    │ (file open/creat)             │  │
│  └────────┬─────────┘    └──────────────┬───────────────┘  │
│           │                             │                   │
│           └──────────┬──────────────────┘                   │
│                      ▼                                      │
│              ┌───────────────┐                              │
│              │  EVENTS map   │  (PerfEventArray, per-CPU)  │
│              └───────┬───────┘                              │
└──────────────────────┼──────────────────────────────────────┘
                       │ lock-free
                       ▼
              ┌────────────────┐
              │  Userspace     │
              │  perf reader   │
              └───────┬────────┘
                      │
         ┌────────────┼────────────┐
         ▼            ▼            ▼
    ┌─────────┐ ┌──────────┐ ┌─────────┐
    │ Process │ │  File Op │ │ Ransom  │
    │ Tracker │ │  History │ │ Heuristic│
    └────┬────┘ └────┬─────┘ └────┬────┘
         │           │            │
         └───────────┼────────────┘
                     ▼
              ┌──────────────┐
              │  ratatui TUI │
              └──────────────┘
```

## Tech Stack

| Component | Technology |
|---|---|
| Kernel programs | Rust `#![no_std]`, aya-ebpf |
| Build (kernel) | Rust nightly, `-Z build-std` |
| Userspace | Rust stable, aya |
| TUI | ratatui |
| Perf reader | aya-ebpf perf buffer API |
| Target | Linux 5.8+ (eBPF + tracepoint support) |

## Requirements

- Linux kernel **5.8+** (eBPF + tracepoint support)
- **root** (`CAP_BPF` / `CAP_SYS_ADMIN`) to load eBPF programs
- Rust **nightly** + `rust-src` for the eBPF crate
- Rust **stable** for the userspace TUI

---

**See also:** [Architecture](./architecture) · [eBPF Program](./ebpf-program) · [Userspace](./userspace) · [Performance](./performance)
