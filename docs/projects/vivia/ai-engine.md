---
sidebar_position: 3
title: AI Engine — MeMLP
---

# VIVIA — MeMLP Neural Network

## Overview

**MeMLP** (Modular embedded Multi-layer Perceptron) is the neural network stack embedded
directly in the VIVIA engine. It runs 100% on CPU, in-process — no GPU, no cloud, no
external runtime. Every architecture number below is a `pub const` in
[`Core/Src/world/memplp.rs`](https://github.com/BartoszOsiej/NV2_ENGINE/blob/main/Core/Src/world/memplp.rs).

## Architecture

| Module | Shape (`pub const`) | Task |
|---|---|---|
| `VEGETATION_ARCH` | 8 → 24 → 16 → 4 | flower / fern / stick / pebble placement |
| `BIOME_ARCH` | 8 → 12 → 9 | biome classification (9 world biomes) |
| `TEXTURE_ARCH` | 8 → 12 → 6 | procedural texture-style selection |

- **Total parameters:** ~1,100 (vegetation head alone: 8·16+16+16·4+4 = 212 in the legacy
  layout; full current layout ≈ 1,140) · **Checkpoint:** JSON, ~14 KB
- Legacy single-hidden-layer checkpoints (8→16→4) are detected and auto-upgraded on load.

## Feature Vector (8 dimensions)

```
[0] terrain_height     — normalised 0..1
[1] terrain_slope      — 0 flat, 1 vertical
[2] biome_temperature  — from embedded NASA POWER climatology
[3] biome_humidity     — from embedded NASA POWER climatology
[4] water_distance     — proximity to water
[5] vegetation_count   — nearby plant density
[6] light_level        — sun exposure
[7] noise_seed         — procedural variation
```

## Training Pipeline

```
┌─────────────────┐
│  Synthetic Data │──┐
│  (heuristic)    │  │
└─────────────────┘  ├──► MeMLP Training Loop ──► Checkpoint Save
┌─────────────────┐  │       (online, background thread)
│ Open-Meteo API  │──┘
│ (real weather)  │
└─────────────────┘
```

- **Online training:** background thread, 100 samples/epoch
- **Loss:** cross-entropy (vegetation, biome, texture)
- **Optimiser:** SGD with gradient clipping (±5), per-parameter update bounds (±1),
  weight decay, NaN sanitisation
- **Learning rate:** 0.01 with decay

### NaN hardening (a real bug, fixed)

Background training could explode weights into **NaN**; `serde_json` serialises NaN as
`null`, which silently corrupted the checkpoint on save and discarded the trained model
on the next start. Fix (documented in `CHANGELOG.md`): non-finite inputs rejected,
gradients clipped, non-finite loss triggers a full weight sanitise, and `sanitize()`
clears NaN/Inf from weights — all covered by dedicated tests.

## Community Model Sharing (NV2.0 Phase 2)

- **Portable `ModelBundle` format** (`nv2-model-bundle` v1) wraps a checkpoint with
  author/description/biome-hint metadata — `AISystem::export_model` / `import_model`
- In-game commands: `/ai_export <path> [author]`, `/ai_import <path>` (imports are
  NaN-sanitised), `/ai_dataset <path> [epochs]` (train directly from a JSON dataset),
  `/ai_stats` (live training + preference counters)

## Player Preference Learning

`TerrainAI` tracks per-class preference counters (flower/fern/stick/pebble) persisted in
the checkpoint. Placing vegetation increments its counter; the background loop blends
heuristic targets with the learned distribution (30%), so the vegetation patterns adapt
to each player's aesthetic over time.

## Online Training (Open-Meteo)

Real weather from 8 global locations feeds training as climate features —
Warsaw, Nairobi, Dubai, Amazonas, Reykjavik, Beijing, Sydney, London (exact coordinates
in `online_trainer.rs::SAMPLE_LOCATIONS`). Falls back to synthetic data offline.

## Tests

10 MeMLP-specific tests (`Core/Src/world/memplp.rs`) covering: forward-pass validity
(softmax distribution), deterministic initialisation, training loss decrease, legacy
checkpoint migration, NaN/Inf survival, sanitisation and serialization roundtrips.
