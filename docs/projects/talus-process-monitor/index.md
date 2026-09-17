---
sidebar_position: 1
title: Talus — eBPF Endpoint Security Agent
---

import ScrollReveal from '@site/src/components/ScrollReveal'
import GlowCard from '@site/src/components/GlowCard'

# Talus — eBPF Endpoint Security Agent

> **eBPF endpoint security agent for Linux — detect ransomware behaviour,
> respond at the kernel edge. Kernel-side tracepoint programs, per-CPU perf
> buffers, sliding-window heuristic, automated SIGKILL response, FrankenTUI.**

<ScrollReveal>

## What It Does

Talus hooks into the Linux kernel at the **tracepoint level** — capturing every
`execve`, `openat`, `connect`, `accept`, `sendto` and `recvfrom` without polling,
without `/proc` parsing, without library dependencies. Events stream through
lock-free per-CPU perf buffers into a userspace detection engine that
visualizes process trees, network connections, and file operations in real time,
automatically terminating offending processes.

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
When a process exhibits ransomware-like behavior (mass opens + high entropy),
Talus flags it in real time and sends SIGKILL with full process tree context.

</div>
</GlowCard>

<GlowCard>
<div>

### 🖥️ FrankenTUI Dashboard
7-panel cyberpunk terminal UI — events, process tree, network connections,
top files, extensions, alerts, heatmap. Keyboard-driven, zero mouse dependency.

</div>
</GlowCard>

<GlowCard>
<div>

### ⚡ Zero Dependencies
No userspace eBPF library required — the kernel does everything. Talus
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

<GlowCard>
<div>

### ◆ Commercial Licensing
Enterprise features are unlocked by Ed25519-signed license keys. The binary
embeds only the public key; a Cloudflare Worker + D1 activation backend
(free tier) enforces expiry, revocation and seat limits server-side.

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
              │  FrankenTUI  │
              └──────────────┘
```

## Tech Stack

| Component | Technology |
|---|---|
| Kernel programs | Rust `#![no_std]`, aya-ebpf |
| Build (kernel) | Rust nightly, `-Z build-std` |
| Userspace | Rust stable, aya |
| TUI | FrankenTUI (ftui) |
| Perf reader | aya-ebpf perf buffer API |
| Licensing | Ed25519 (ed25519-dalek), Cloudflare Workers + D1 activation backend |
| Target | Linux 5.8+ (eBPF + tracepoint support) |

## Requirements

- Linux kernel **5.8+** (eBPF + tracepoint support)
- **root** (`CAP_BPF` / `CAP_SYS_ADMIN`) to load eBPF programs
- Rust **nightly** + `rust-src` for the eBPF crate
- Rust **stable** for the userspace TUI

## Licensing & Editions

Talus ships in two editions. **Community** is free and MIT-licensed;
**Enterprise** (auto-kill, web dashboard, Kafka, ClickHouse, MemGraph, C FFI)
is unlocked by a paid license key.

```
talus-keygen issue ──► signed key (Ed25519) ──► customer
                                                │
                                      talus license activate <KEY>
                                                ▼
            Cloudflare Worker + D1 (free tier) ── signature check,
            expiry, revocation, seat limits ──► activation token
```

- The binary embeds the Ed25519 **public** key only; the signing key never
  leaves the owner's machine
- The activation server verifies signatures server-side, enforces expiry,
  revocation and seat limits, and rate-limits activation attempts
- The local license cache is re-verified against the signed key on every
  start — local edits to tier/expiry/features fail closed
- 30-day Enterprise trial on first run; 30-day offline grace afterwards

```bash
talus license activate <KEY>   # one key = one machine
talus license show             # tier, expiry, seats, features
```

Pricing amounts are set per sale and never published in the repos — the
structure lives in the repo's
[docs/pricing-tiers.md](https://github.com/BartoszOsiej/talus-process-monitor/blob/master/docs/pricing-tiers.md).

---

**See also:** [Architecture](./architecture) · [eBPF Program](./ebpf-program) · [Userspace](./userspace) · [Performance](./performance)
