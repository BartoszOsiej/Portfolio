---
sidebar_position: 1
title: VIVIA — Beyond the Known
---

import ScrollReveal from '@site/src/components/ScrollReveal'
import GlowCard from '@site/src/components/GlowCard'

<a class="tests-cta" href="https://github.com/BartoszOsiej/NV2_ENGINE">🧪 132 tests green →</a>

# VIVIA: Beyond the Known

> **A voxel survival sandbox with real-world climate (NASA POWER data) and an embedded
> neural network that learns while you play — built from scratch in Rust.
> EGS submission kit is ready; release date TBA.**

<ScrollReveal>

## Overview

VIVIA (internally `NV2_ENGINE`, store name **NV-2.0**) is a commercial voxel game written
entirely in Rust — 39 source files, 24,000+ lines, 132 tests. It features:

- **Real climate worlds** — every seed maps to a location on Earth; NASA POWER climatology drives biomes, weather and sky
- **Embedded neural network** (MeMLP) that learns vegetation, biome and texture decisions while you play
- **Day/night survival** — hunger, thirst, health; hostiles spawn after dark
- **Wildlife** — deer and rabbits roaming climate-appropriate biomes, 4 hostile types at night
- **Crafting** — shaped & shapeless recipe registry, tools and progression
- **Procedural rendering** — wgpu pipeline with sky, weather and animated creatures
- **Keyless Epic Games Store support** — EOS SDK loaded at runtime, clean no-op without it

**Developer:** Terra Nova Gameworks · **Build:** 1.0.0
**Platforms:** Linux, Windows · **Stores:** Epic Games Store (kit ready), itch.io (planned)

</ScrollReveal>

## Tech Stack

| Layer | Technology |
|---|---|
| Language | Rust 2021 |
| GPU | wgpu 0.20, WGSL shaders |
| Window | winit 0.30 |
| Math | cgmath 0.18, OpenSimplex2 |
| Parallelism | rayon (async chunk gen) |
| Neural Net | ndarray (MeMLP embedded MLP) |
| Climate | Embedded NASA POWER grid + Open-Meteo API |
| Text | fontdue |
| Store | Epic Online Services (runtime-loaded, keyless) |
| Tools | Python (AI/texture pipeline), Externum (manifest tooling) |

---

<ScrollReveal>

## Feature Highlights

<div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem', margin: '1.5rem 0' }}>

<GlowCard>
<div>

### 🌍 Real-Climate Worlds
OpenSimplex2 heightmaps, caves, ores, 9 climate-driven biomes. 16×512×16 chunks
with rayon-parallel generation. Embedded NASA POWER temperature and humidity
data drive vegetation, weather and ambient sky.

</div>
</GlowCard>

<GlowCard>
<div>

### 🧠 MeMLP Neural Network
Modular embedded MLP with 3 specialist heads: vegetation placement (8→24→16→4),
biome classification (8→12→9), texture style (8→12→6). Learns online during
gameplay from synthetic + Open-Meteo API data. ~1,100 parameters, sub-0.1 ms inference.

</div>
</GlowCard>

<GlowCard>
<div>

### 🎨 Procedural Rendering
Custom wgpu pipeline: instanced voxel geometry, per-fragment lighting,
procedural sky with sun/moon, rain/snow particles, day/night cycle.
Animated voxel creatures with walk cycles.

</div>
</GlowCard>

<GlowCard>
<div>

### 🦌 Living World
Deer and rabbits spawn in matching biomes; four hostile types (zombie, skeleton,
spider, creeper) emerge after dark. Kill rewards feed crafting progression.

</div>
</GlowCard>

<GlowCard>
<div>

### 🛠️ Survival & Crafting
Hunger/thirst/health stats with regeneration rules, mining with tool tiers,
shaped & shapeless crafting recipes, item drops, save/load.

</div>
</GlowCard>

<GlowCard>
<div>

### 🕹️ Console & Commands
In-game chat commands: `/tp`, `/give`, `/help` plus the AI toolkit —
`/ai_stats`, `/ai_export`, `/ai_import`, `/ai_dataset` (model bundles are
portable JSON with author metadata).

</div>
</GlowCard>

</div>

</ScrollReveal>

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                    VIVIA Engine                       │
├──────────────┬──────────────┬───────────────────────┤
│   Renderer   │   World Gen  │     Game Logic        │
│  wgpu + WGSL │  OpenSimplex │  Survival + Combat    │
│  Instancing  │  9 Biomes    │  Wildlife + Hostiles  │
│  Sky/Weather │  Caves/Ores  │  Crafting + Items     │
├──────────────┼──────────────┼───────────────────────┤
│   AI Stack   │   Climate    │     Store/Platform    │
│  MeMLP (3)   │  NASA POWER  │  EOS runtime (keyless)│
│  Online train│  Open-Meteo  │  EGS kit + manifests  │
│  Model share │  Seasons     │  Low-end PC mode      │
└──────────────┴──────────────┴───────────────────────┘
```

## Testing

132 tests (`cargo test --release`: 131 passed, 1 ignored release benchmark) covering
world generation determinism, climate realism (`embedded_grid_matches_known_real_climates`),
MeMLP forward/training/NaN-survival, crafting flows, raycasting and vegetation rules.
Benchmark targets (frame-time variance, meshing latency) are specified in
[`BENCHMARKING.md`](https://github.com/BartoszOsiej/NV2_ENGINE/blob/main/BENCHMARKING.md);
the Criterion harness lands in the repo before launch.

## Roadmap (honest list — not in the build yet)

Multiplayer (TCP protocol designed), GLB model pipeline for AI-generated creatures,
spatial audio, quest chains and boss fights. See [Multiplayer (planned)](./multiplayer)
for the protocol design. **Nothing on this page claims a feature the code doesn't have.**

---

**See also:** [Architecture](./architecture) · [AI Engine](./ai-engine) · [Rendering](./rendering) · [Multiplayer (planned)](./multiplayer) · [Gameplay](./gameplay) · [Performance](./performance)
