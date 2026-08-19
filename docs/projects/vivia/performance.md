---
sidebar_position: 7
title: Performance
---

# VIVIA — Performance

## Benchmarks

| Operation | Time | Notes |
|---|---|---|
| Frame target | 16.6 ms | 60 FPS |
| AI forward pass | 0.01 ms | Per prediction |
| AI training epoch | 5-10 ms | 100 samples |
| Chunk generation | ~2 ms | Async, rayon-parallel |
| GLB decimation | ~50 ms | Once, cached |
| Mesh cache load | 0.3 ms | From disk |
| Cold start | 2.4 s | Including mesh bake |
| Cached start | 0.3 s | Meshes on disk |

## Memory

| Component | Size |
|---|---|
| MeMLP model | ~14 KB JSON |
| Per chunk | ~256 KB (16×512×16 × 1 byte/block) |
| Texture atlas | ~4 MB |
| GLB models | 230-285 KB each (cached) |
| Instance buffer | 2048 cubes × 64 bytes = 128 KB |
| AI mesh buffer | 256 models × variable |

## GPU

- **Instanced rendering** — one draw call per shape per chunk
- **No per-frame allocations** — hot path is allocation-free
- **Deterministic cache** — GLB meshes cached by content hash
- **Bilinear upscale** — texture filtering for close-up detail
- **Low-end auto-detect** — reduced render radius for old GPUs

## Scalability

| Metric | Value |
|---|---|
| Render radius | 4-8 chunks (configurable) |
| Max creatures | 24 animals + 10 hostiles per frame |
| Max instances | 2048 cubes + 256 AI meshes |
| Chunk height | 512 blocks (double standard) |
| World size | Unlimited (procedural) |
