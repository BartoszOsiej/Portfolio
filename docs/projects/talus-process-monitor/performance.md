---
sidebar_position: 5
title: Performance
---

# Talus — Performance

## Overhead

| Metric | Value |
|---|---|
| Kernel CPU per event | < 1 µs |
| Perf buffer throughput | > 1M events/sec |
| Userspace processing | ~10 µs/event |
| TUI render | 100ms refresh (10 FPS) |
| Memory (kernel) | < 64 KB (eBPF maps) |
| Memory (userspace) | < 10 MB (process map + history) |

## Comparison with Alternatives

| Tool | Method | Overhead | Granularity |
|---|---|---|---|
| **Talus** | eBPF tracepoints | < 1% CPU | Syscall-level |
| `auditd` | Audit framework | 2-5% CPU | Rule-based |
| `sysdig` | ptrace/kit | 3-8% CPU | Syscall-level |
| `inotify` | Filesystem hooks | < 1% (files only) | File-level |
| `lsof` | /proc scan | Periodic burst | Snapshot |

## Scalability

- **Per-CPU perf buffers** — no lock contention between cores
- **Bounded process map** — LRU eviction prevents memory growth
- **Sliding window** — constant memory for heuristic (fixed-size ring buffer)
- **Batch flush** — perf buffer events batched to reduce syscall overhead

## Production Readiness

- Zero panics in kernel (all error paths return error codes)
- Graceful degradation if perf buffer is full (events dropped, not crashed)
- Rate limiting in userspace to prevent TUI overwhelm
- No data leaves the machine — all processing local
