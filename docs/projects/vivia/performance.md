---
sidebar_position: 7
title: Performance
---

# VIVIA — Performance

## Benchmarks

Benchmark targets and methodology are specified in
[`BENCHMARKING.md`](https://github.com/BartoszOsiej/NV2_ENGINE/blob/main/BENCHMARKING.md)
(frame-time variance, voxel meshing latency, rendering throughput). The Criterion
harness implementing them is specified there and lands in the repo before launch —
until then, treat the numbers below as **targets, not measurements**.

### Targets

| Metric | Target |
|---|---|
| Average frame time | < 16.67 ms (60 FPS) |
| 99th percentile frame time | < 33 ms (30 FPS floor) |

The engine is built to hit these budgets: no per-frame allocations on the hot
path, rayon-parallel chunk generation off the render thread.

## MeMLP Inference

| Operation | Cost |
|---|---|
| Forward pass | sub-0.1 ms (~1,100 parameters, pure ndarray math) |
| Training epoch | single-digit ms per 100 samples (background thread) |
| Checkpoint | ~14 KB JSON |

The AI runs on a background thread — training never blocks the frame loop.

## Memory

| Component | Size |
|---|---|
| MeMLP checkpoint | ~14 KB (JSON) |
| Per-chunk storage | 128 KB (16×512×16, 1 byte/block) |
| World mesh cache | bounded, invalidated on block changes |

## Scalability

| Metric | Value |
|---|---|
| Chunk height | 512 blocks (double the standard voxel height) |
| Render distance | configurable `load_radius` / `render_radius` / `cleanup_radius` |
| Low-end mode | `low_end_pc` profile reduces radii for modest hardware |
| World size | unlimited (procedural, seed-driven) |

## The honest footnote

Every number on this page is either a **target** (frame times, to be measured by
the harness) or an **approximation on dev hardware** (Arch Linux, mid-range GPU).
The harness spec exists precisely so every claim can be reproduced — and the
store page will only publish numbers measured by it.
