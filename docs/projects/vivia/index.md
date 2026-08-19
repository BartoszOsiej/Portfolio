---
sidebar_position: 1
title: VIVIA — Beyond the Known
---

import ScrollReveal from '@site/src/components/ScrollReveal'
import GlowCard from '@site/src/components/GlowCard'

<a class="tests-cta" href="./tests">🧪 282 tests passing →</a>

# VIVIA: Beyond the Known

> **A commercial voxel survival sandbox with AI-powered terrain, multiplayer networking,
> and a custom embedded neural network — built from scratch in Rust. Shipping on
> Epic Games Store, August 2026.**

<ScrollReveal>

## Overview

VIVIA (internally `NV_ENGINE`) is a **shipped commercial voxel game** written entirely
in Rust — 47 source files, 15,800+ lines, 282 tests. It features:

- **Procedural world generation** with real-world NASA climate data
- **Embedded neural network** (MeMLP) that learns vegetation placement while you play
- **Full mob system** with AI-generated 3D models, 10 hostile types, 60 animal species
- **Multiplayer TCP networking** with entity sync, chunk streaming, anti-cheat
- **Procedural audio** engine with spatial 3D sound
- **GPU rendering** via wgpu with custom WGSL shaders

**Developer:** Terra Nova Gameworks · **Version:** 1.0.0 · **Price:** $9.99 (launch $7.49)
**Platforms:** Linux, Windows · **Stores:** Epic Games Store, itch.io

</ScrollReveal>

## Tech Stack

| Layer | Technology |
|---|---|
| Language | Rust 2021 |
| GPU | wgpu 0.20, WGSL shaders |
| Window | winit 0.30 |
| Math | cgmath 0.18, OpenSimplex2 |
| Parallelism | rayon, tokio |
| Neural Net | ndarray (MeMLP embedded MLP) |
| Mesh Opt | meshopt, bincode |
| Audio | rodio |
| Text | fontdue |
| ECS | bytemuck |
| Online | Epic Online Services |
| Tools | C#/.NET 8 (content), Python (AI/texture) |

---

<ScrollReveal>

## Feature Highlights

<div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem', margin: '1.5rem 0' }}>

<GlowCard>
<div>

### 🌍 Procedural World
OpenSimplex2 heightmaps, caves, ores, 9 climate-driven biomes. 16×512×16 chunks
with async streaming and rayon parallel generation. Real-world NASA temperature
and humidity data drive vegetation, fog, and ambient color.

</div>
</GlowCard>

<GlowCard>
<div>

### 🧠 MeMLP Neural Network
Modular embedded MLP with 4 specialist heads: vegetation (8→24→16→4), biome
classification (8→12→9), texture style (8→12→6), and creature animation (8→16→6).
Learns online during gameplay from synthetic + Open-Meteo API data. 0.01ms inference.

</div>
</GlowCard>

<GlowCard>
<div>

### 🎨 Procedural Rendering
Custom wgpu pipeline: instanced voxel geometry, per-fragment lighting (Blinn-Phong),
ACES tonemapping, procedural sky with sun/moon, fog, weather, day/night cycle.
GLB model loading with automatic decimation and procedural skinning.

</div>
</GlowCard>

<GlowCard>
<div>

### 🦠 60 Creature Species
Full bestiary: 10 hostile types with AI-driven behavior (melee, ranged, combo, slam),
and 60 passive animal species across 8 biomes. Each species has unique body, color,
speed, walk cycle, and loot drops. AI-generated GLB models with pose fixes.

</div>
</GlowCard>

<GlowCard>
<div>

### 🌐 Multiplayer
TCP networking at 20 Hz: entity sync, chunk streaming, block updates, chat,
combat events. Anti-cheat validation (coordinate bombs, NaN positions, rate limiting,
handshake timeouts). Client-side interpolation for smooth remote player movement.

</div>
</GlowCard>

<GlowCard>
<div>

### ⚔️ Survival Gameplay
Hunger/thirst/warmth systems, tool durability, crafting (NVCrafter), quest chains,
rarity tiers (Common → Mythic), prestige system (Lv50+ reset with stacking bonuses),
and RPG progression with stat allocation.

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
│  Instancing  │  9 Biomes    │  60 Creatures         │
│  ACES Tonemap│  Caves/Ores  │  Quests + Crafting    │
├──────────────┼──────────────┼───────────────────────┤
│   AI Stack   │   Audio      │     Networking        │
│  MeMLP (4)   │  rodio       │  TCP 20 Hz            │
│  Online train│  Spatial 3D  │  Entity/Chunk sync    │
│  GLB models  │  Procedural  │  Anti-cheat           │
└──────────────┴──────────────┴───────────────────────┘
```

## Performance

| Metric | Value |
|---|---|
| Frame time | 16.6 ms (60 FPS target) |
| AI inference | 0.01 ms per prediction |
| Chunk generation | Async, rayon-parallel |
| Model decimation | 40K → 6K triangles per mob |
| Memory model | 1.2 KB neural network |
| Instance budget | 2048 cubes, 256 AI meshes |

---

**See also:** [Architecture](./architecture) · [AI Engine](./ai-engine) · [Rendering](./rendering) · [Multiplayer](./multiplayer) · [Gameplay](./gameplay) · [Performance](./performance)
