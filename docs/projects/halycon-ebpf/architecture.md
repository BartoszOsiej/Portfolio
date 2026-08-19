---
sidebar_position: 2
title: Architecture
---

# Halcyon — Architecture

## Project Structure

```
halcyon-process-monitor/
├── Cargo.toml                 # Workspace root
├── build.sh                   # Build script (nightly for eBPF, stable for TUI)
├── src/
│   ├── main.rs                # Entry point, CLI args
│   ├── monitor.rs             # eBPF loading, perf reader, event processing
│   ├── tracker.rs             # Per-process state tracking
│   ├── heuristic.rs           # Sliding-window ransomware detection
│   └── tui.rs                 # ratatui dashboard rendering
├── process-monitor-ebpf/      # Kernel side (#![no_std], aya-ebpf)
│   ├── Cargo.toml
│   ├── src/
│   │   ├── main.rs            # eBPF entry point
│   │   ├── execve.rs          # execve tracepoint handler
│   │   └── openat.rs          # openat tracepoint handler
│   └── build.rs               # Build configuration
└── tests/
    └── integration.rs         # End-to-end tests
```

## Kernel Side (`process-monitor-ebpf`)

### Tracepoint Programs

Two eBPF programs attached to kernel tracepoints:

1. **`execve`** — fires on every `execve()` syscall
   - Captures: PID, PPID, UID, command name, timestamp
   - Writes event to `EVENTS` PerfEventArray

2. **`openat`** — fires on every `openat()` syscall
   - Captures: PID, filename, flags, timestamp
   - Writes event to `EVENTS` PerfEventArray

### Data Structures

```rust
#[repr(C)]
struct ExecEvent {
    pid: u32,
    ppid: u32,
    uid: u32,
    comm: [u8; 16],    // process name
    timestamp_ns: u64,
}

#[repr(C)]
struct FileEvent {
    pid: u32,
    filename: [u8; 256],
    flags: u32,
    timestamp_ns: u64,
}
```

### Memory Safety

- All eBPF programs are `#![no_std]` — no heap allocation
- Stack-allocated event structs, copied to perf buffer
- Bounds-checked by the eBPF verifier before loading
- No pointer arithmetic outside verified bounds

## Userspace Side

### Event Processing Pipeline

```
PerfBuffer → Deserialise → EventTracker → HeuristicEngine → TUI
```

1. **PerfBuffer read** — async reader on the perf event array
2. **Deserialise** — bincode decode into Rust structs
3. **EventTracker** — maintains per-process state (PID → process tree)
4. **HeuristicEngine** — sliding-window analysis for ransomware detection
5. **TUI render** — ratatui draws the dashboard every 100ms

### Process Tracking

- Maintains a map of PID to process info (name, parent, start_time, file_ops)
- Process tree construction from PPID chains
- Zombie process cleanup on exit events
- Bounded memory: oldest processes evicted when map exceeds limit

### Ransomware Heuristic

Sliding window (default: 60 seconds) tracking:
- **Rename velocity:** number of file renames per second
- **Entropy change:** Shannon entropy of file contents before/after
- **Extension changes:** mass extension changes (.doc → .locked)
- **Threshold:** triggers alert when multiple signals correlate

## Build Process

```bash
# 1. Build eBPF programs (requires nightly)
cd process-monitor-ebpf
cargo +nightly build --target bpfel-unknown-none --release

# 2. Build userspace (stable Rust)
cd ..
cargo build --release

# 3. Run (requires root)
sudo ./target/release/process-monitor
```

The build script automatically:
- Compiles eBPF programs to BPF ELF objects
- Embeds the compiled object into the userspace binary
- Generates type bindings from the eBPF struct definitions
