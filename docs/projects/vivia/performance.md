---
sidebar_position: 7
title: Performance
---

# VIVIA — Performance

## Benchmarks (reproducible framework)

The repo ships a real benchmarking harness —
[`BENCHMARKING.md`](https://github.com/BartoszOsiej/NV2_ENGINE/blob/main/BENCHMARKING.md)
with Criterion benches and a headless frame-time mode:

```bash
# Full benchmark suite
cargo bench --bench render_bench -- --output-format markdown

# Quick frame-time measurement (60 seconds)
cargo run --release -- --headless --bench-frame --frames 3600 --quit

# Meshing benchmark only
cargo bench --bench mesh_bench -- "greedy"
```

### Targets

| Metric | Target |
|---|---|
| Average frame time | < 16.67 ms (60 FPS) |
| 99th percentile frame time | < 33 ms (30 FPS floor) |

The engine is built to hit these budgets: no per-frame allocations on the hot
path, allocation-free world interactions (`memory_pool`-style patterns in the
hot loop), rayon-parallel chunk generation off the render thread.

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

Where this page gives a number without a benchmark link, treat it as an
approximation on dev hardware (Arch Linux, mid-range GPU). The Criterion
harness exists precisely so every number above can be reproduced — and the
store page will only publish numbers that come out of it.
