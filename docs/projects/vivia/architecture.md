---
sidebar_position: 2
title: Architecture
---

# VIVIA — Architecture

## Source Layout (as built — matches `Core/Src/` 1:1)

```
Core/Src/
├── main.rs              # App loop, input, world/actor orchestration
├── gameplay.rs          # GameClock, PlayerStats, animals, enemies, achievements
├── inventory.rs         # Hotbar, inventory slots, stacking
├── crafting.rs          # RecipeRegistry — shaped & shapeless recipes (NVCrafter)
├── commands.rs          # Chat commands (/tp, /give, /help, /ai_*)
├── settings.rs          # SharedSettings (render radius, low_end_pc, perf profiles)
├── assets.rs            # Asset loading
├── input.rs             # Keyboard/mouse state
├── interaction.rs       # Block place/break interactions
├── egs.rs               # Epic Online Services bridge (runtime-loaded, keyless)
├── renderer/
│   ├── mod.rs           # GPU pipeline, draw calls, world mesh cache
│   ├── camera.rs        # First-person camera
│   ├── mesh.rs          # Chunk meshing
│   ├── instance.rs      # Instance buffer management
│   ├── texture_atlas.rs # Block texture atlas
│   ├── texture_registry.rs # blockname.png / *_side.png conventions
│   ├── dynamic_atlas.rs # Runtime atlas updates (AI textures)
│   ├── text.rs          # Text rendering
│   ├── menu.rs          # Main menu
│   └── *.wgsl           # Shaders: terrain, sky, weather, animals, text, UI
└── world/
    ├── mod.rs           # World state, block access, spawn logic
    ├── block.rs         # BlockType registry (~124 types: hardness, tool tiers)
    ├── chunk.rs         # 16×512×16 chunk storage (CHUNK_H = 512)
    ├── generator.rs     # OpenSimplex2 terrain generation
    ├── worldgen.rs      # World generation orchestration
    ├── biomes.rs        # 9 climate-driven biomes (BiomeId)
    ├── vegetation.rs    # Tree/plant placement per biome
    ├── decorations.rs   # Decorative elements
    ├── decoration_ai.rs # AI-driven decoration placement
    ├── ai_generator.rs  # MeMLP application to world generation
    ├── ai_feedback.rs   # Player preference learning
    ├── memplp.rs        # Modular MLP (VEGETATION/BIOME/TEXTURE archs)
    ├── online_trainer.rs # Open-Meteo API training loop (8 cities)
    ├── meteo.rs         # Embedded NASA POWER climate grid + seasons
    ├── liquid.rs        # Water/lava simulation
    ├── palette.rs       # Block color palettes
    ├── storage.rs       # Block storage optimization
    └── raycast.rs       # Block raycasting
```

## Data Flow

```
┌──────────────┐    ┌────────────┐    ┌─────────────┐
│ Seed → coord │───►│ NASA POWER │───►│ Biome table │
│ (Earth map)  │    │  climatology│   │ + weather   │
└──────────────┘    └────────────┘    └──────┬──────┘
                                             │
┌──────────────┐    ┌────────────┐    ┌──────▼──────┐
│  GPU upload  │◄───│   Chunk    │◄───│ OpenSimplex2│
│  (wgpu)      │    │  meshing   │    │ + MeMLP veg │
└──────────────┘    └────────────┘    └─────────────┘
```

## Chunk Lifecycle

1. **Request** — player position triggers chunk generation requests
2. **Generate** — OpenSimplex2 heightmap + cave/ore placement (rayon-parallel)
3. **Decorate** — climate-driven vegetation, AI decoration placement
4. **Mesh + Upload** — chunk meshing, vertex/index buffers to GPU
5. **Render** — instanced draw calls per chunk
6. **Unload** — chunks beyond `cleanup_radius` are evicted

## Block Registry

~124 block types (`BlockType`), each with:
- Hardness (`hardness()`) — mining time
- Tool tier (`required_tool_tier()`) — wood → stone → iron → diamond
- Display name — inventory tooltip
- Special interactions (Chest, NVCrafter, Cactus break-speed rules)

## What is intentionally NOT here yet

Multiplayer networking, quest system, spatial audio, GLB model pipeline and
pathfinding are **designed but not implemented** — see the roadmap on the
[index](.) and the multiplayer protocol design page. This document
describes only code that exists in the repository.
