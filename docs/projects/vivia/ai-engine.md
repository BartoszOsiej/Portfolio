---
sidebar_position: 3
title: AI Engine — MeMLP
---

# VIVIA — MeMLP Neural Network

## Overview

**MeMLP** (Modular embedded Multi-layer Perceptron Model) is the neural network
stack embedded directly in the VIVIA engine. It runs 100% on CPU, in-process,
with no GPU, no cloud, no external runtime.

## Architecture

| Module | Shape | Task |
|---|---|---|
| `vegetation` | 8 → 24 → 16 → 4 | flower / fern / stick / pebble placement |
| `biome` | 8 → 12 → 9 | biome classification (9 world biomes) |
| `texture` | 8 → 12 → 6 | procedural texture-style selection |
| `motion` | 8 → 16 → 6 | creature animation parameters (sigmoid output) |

**Total:** ~3,400 parameters · **Checkpoint size:** ~14 KB JSON · **Inference:** 0.01 ms

## Feature Vector (8 dimensions)

```
[0] terrain_height     — normalised 0..1
[1] terrain_slope      — 0 flat, 1 vertical
[2] biome_temperature  — from embedded NASA climatology
[3] biome_humidity     — from embedded NASA climatology
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
┌─────────────────┐  │         (online, background thread)
│ Open-Meteo API  │──┘
│ (real weather)  │
└─────────────────┘
```

- **Online training:** background thread, 100 samples/epoch
- **Loss function:** cross-entropy (vegetation, biome, texture) + MSE (motion)
- **Optimiser:** SGD with gradient clipping, weight decay, NaN sanitisation
- **Learning rate:** 0.01 with decay every 1000 epochs
- **Legacy migration:** old single-hidden-layer checkpoints auto-upgraded

## Motion Head (Creature Animation)

The motion module outputs **6 continuous parameters** (0..1, sigmoid) that drive
live creature animation:

| Channel | Parameter | Effect |
|---|---|---|
| 0 | gait_amp | Leg swing amplitude |
| 1 | gait_freq | Step frequency multiplier |
| 2 | breath | Torso breathing depth |
| 3 | tail_wag | Tail sway amount |
| 4 | head_dip | Grazing/head-lowering |
| 5 | hop | Vertical bounce (birds, fleeing) |

## Player Preference Learning

The AI tracks player block placements and adjusts training targets to match
the player's aesthetic preferences. This means the vegetation patterns adapt
to each player's style over time.

## Online Training (Open-Meteo)

Real-world weather data from 8 global locations (Warsaw, Nairobi, Dubai,
Amazonas, Reykjavik, Beijing, Sydney, London) feeds into training as
climate features. Falls back to synthetic data when offline.

## Tests

12 MeMLP-specific tests covering:
- Forward pass validity (probability distribution, sigmoid range)
- Deterministic initialisation
- Training loss decrease
- Legacy checkpoint migration
- Motion head independence (sigmoid vs softmax)
- NaN/Inf survival
- Roundtrip serialization
