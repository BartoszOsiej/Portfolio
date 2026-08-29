---
sidebar_position: 4
title: Userspace TUI
---

# Talus — Userspace TUI

## Overview

The userspace component reads eBPF events from perf buffers, maintains process
state, runs the ransomware heuristic, and renders a real-time terminal UI.

## Event Pipeline

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  PerfBuffer  │────►│  Deserialise │────►│  Tracker     │
│  (async read)│     │  (bincode)   │     │  (PID map)   │
└──────────────┘     └──────────────┘     └──────┬───────┘
                                                  │
                                           ┌──────▼───────┐
                                           │  Heuristic   │
                                           │  (sliding)   │
                                           └──────┬───────┘
                                                  │
                                           ┌──────▼───────┐
                                           │  TUI Render  │
                                           │  (frankentui)│
                                           └──────────────┘
```

## Process Tracker

Maintains a bounded map of active processes:

```rust
struct ProcessInfo {
    pid: u32,
    ppid: u32,
    name: String,
    start_time: u64,
    file_ops: u64,        // total file operations
    renames: u64,         // rename count in window
    last_activity: u64,   // last event timestamp
}
```

- **PID → ProcessInfo** map with LRU eviction
- Process tree construction from PPID chains
- Zombie cleanup on process exit

## Ransomware Heuristic

Sliding-window analysis (default: 60-second window):

### Signals Monitored

1. **Rename velocity** — file renames per second per process
2. **Entropy delta** — Shannon entropy change in file contents
3. **Extension mass-change** — .doc → .locked, .jpg → .enc, etc.
4. **Write-after-rename** — write to file immediately after rename

### Scoring

Each signal contributes to a confidence score:
- Rename velocity > 10/s → +0.3
- Entropy increase > 2.0 bits → +0.3
- Known ransomware extension → +0.4
- Combined score > 0.7 → **ALERT**

### Alert Output

When triggered, the TUI shows:
- Process name, PID, PPID
- Full process tree (who spawned it)
- File operations in the last 60 seconds
- Entropy profile of modified files

## TUI Layout

```
┌─ Talus eBPF Monitor ───────────────────────────────────────┐
│ Process Tree           │ File Operations      │ Alerts      │
│ ├─ systemd (1)         │ /etc/passwd   READ   │             │
│ │  ├─ sshd (1234)      │ /var/log/auth WRITE │             │
│ │  └─ bash (5678)      │ doc.pdf      RENAME  │             │
│ │     └─ vim (9012)    │ doc.locked   WRITE   │ ⚠ ALERT    │
│ │                       │                       │ suspicion   │
└─────────────────────────────────────────────────────────────┘
```

### Keyboard Controls

| Key | Action |
|---|---|
| `q` | Quit |
| `Tab` | Switch panel focus |
| `↑↓` | Navigate process tree |
| `Enter` | Expand/collapse process |
| `/` | Search process name |
| `1/2/3` | Filter: all / processes / file ops |
