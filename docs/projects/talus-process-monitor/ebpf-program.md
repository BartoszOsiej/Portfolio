---
sidebar_position: 3
title: eBPF Kernel Program
---

# Talus — eBPF Kernel Program

## Overview

The kernel side of Talus is a `#![no_std]` Rust crate compiled to BPF bytecode
using `aya-ebpf`. It runs entirely in kernel space — no heap allocation, no system
calls, no userspace dependencies.

## Tracepoint Programs

### execve Handler

```rust
#[tracepoint]
pub fn process_monitor_execve(ctx: TracePointContext) -> u32 {
    // Safety: tracepoint context is guaranteed by the kernel
    unsafe {
        let mut event = ExecEvent {
            pid: bpf_get_current_pid_tgid() as u32,
            ppid: ...,
            uid: bpf_get_current_uid_gid() as u32,
            comm: [0u8; 16],
            timestamp_ns: bpf_ktime_get_ns(),
        };
        // Read comm from tracepoint args
        bpf_probe_read_str(&mut event.comm, ...);
        // Write to perf buffer
        EVENTS.output(&ctx, &event, 0);
    }
    0
}
```

### openat Handler

```rust
#[tracepoint]
pub fn process_monitor_openat(ctx: TracePointContext) -> u32 {
    unsafe {
        let mut event = FileEvent {
            pid: bpf_get_current_pid_tgid() as u32,
            filename: [0u8; 256],
            flags: ...,
            timestamp_ns: bpf_ktime_get_ns(),
        };
        // Read filename from tracepoint args
        bpf_probe_read_str(&mut event.filename, ...);
        EVENTS.output(&ctx, &event, 0);
    }
    0
}
```

## eBPF Maps

| Map Name | Type | Purpose |
|---|---|---|
| `EVENTS` | PerfEventArray | Stream events to userspace |
| `PROCESS_STATE` | LruHashMap | Per-process state (bounded) |

## Verifier Compliance

The eBPF verifier validates every program before loading:
- **Bounds checking:** all memory accesses are within verified bounds
- **No unbounded loops:** every loop has a provably finite iteration count
- **Stack size:** each program stays within the 512-byte stack limit
- **Helper calls:** only approved kernel helpers are used

## Build Requirements

```toml
# process-monitor-ebpf/Cargo.toml
[package]
name = "process-monitor-ebpf"
version = "0.1.0"
edition = "2021"

[dependencies]
aya-ebpf = "0.1"

[build-dependencies]
aya-build = "0.1"
```

Build command:
```bash
cargo +nightly build --target bpfel-unknown-none --release
```

Requires:
- Rust **nightly** toolchain
- `rust-src` component for the BPF target
- Linux kernel **5.8+** with eBPF support

## Safety Model

- **No unsafe in userspace** — all unsafe is confined to the eBPF kernel code
- **Verifier-guaranteed** — the kernel verifier proves memory safety before loading
- **No data leaves the machine** — events are processed locally only
- **Graceful degradation** — if eBPF loading fails, Talus exits cleanly
