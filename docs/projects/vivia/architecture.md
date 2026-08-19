---
sidebar_position: 2
title: Architecture
---

# VIVIA — Architecture

## Source Layout

```
Core/Src/
├── main.rs              # Application loop, input, commands
├── gameplay.rs          # Clock, stats, enemies, animals, quests, crafting
├── inventory.rs         # Hotbar, inventory slots, stacking
├── crafting.rs          # NVCrafter recipe system
├── quests.rs            # Quest chain progression
├── commands.rs          # Chat commands (/tp, /spawn, /time, etc.)
├── settings.rs          # SharedSettings (render radius, etc.)
├── assets.rs            # Asset loading
├── input.rs             # Keyboard/mouse state
├── audio.rs             # Procedural sound engine
├── spatial_audio.rs     # 3D spatial audio (Source 2 pattern)
├── physics.rs           # Collision, gravity
├── pathfinding.rs       # A* pathfinding for mobs
├── memory_pool.rs       # Allocation-free hot path
├── job_system.rs        # Background task scheduler
├── npcs.rs              # NPC dialogue system
├── egs.rs               # Epic Online Services bridge
├── network/
│   ├── mod.rs           # Packet send/recv
│   ├── protocol.rs      # Packet definitions, validation
│   ├── server.rs        # Authoritative server
│   └── client.rs        # Client with interpolation
├── renderer/
│   ├── mod.rs           # GPU pipeline, draw calls
│   ├── camera.rs        # First-person camera
│   ├── texture_atlas.rs # Block texture atlas
│   ├── geometry.rs      # Procedural 3D primitives
│   ├── glb.rs           # GLB model loader (decimation, UV bake)
│   ├── skeleton.rs      # Joint hierarchy, inverse bind
│   ├── skin.rs          # glTF 2.0 animation engine
│   ├── anim.rs          # Procedural walk/idle animations
│   ├── text.rs          # Text rendering
│   ├── instance.rs      # Instance buffer management
│   └── *.wgsl           # GPU shaders (sky, weather, animals, models)
└── world/
    ├── mod.rs           # World state, block access
    ├── block.rs         # BlockType registry (147+ types)
    ├── chunk.rs         # 16×512×16 chunk storage
    ├── generator.rs     # OpenSimplex2 terrain generation
    ├── biomes.rs        # 9 climate-driven biomes
    ├── vegetation.rs    # Tree/plant placement
    ├── decorations.rs   # Decorative elements
    ├── ai_generator.rs  # MeMLP neural network
    ├── ai_feedback.rs   # Player preference learning
    ├── memplp.rs        # Modular MLP architecture
    ├── online_trainer.rs # Open-Meteo API training data
    ├── meteo.rs         # Embedded NASA climate data
    ├── dungeon.rs       # Procedural dungeon generation
    ├── liquid.rs        # Water/lava simulation
    ├── palette.rs       # Block color palettes
    ├── storage.rs       # Block storage optimization
    ├── raycast.rs       # Block raycasting
    └── worldgen.rs      # World generation orchestrator
```

## Data Flow

```
┌──────────┐    ┌──────────┐    ┌──────────┐
│ OpenSimplex │──►│ Chunk Gen │──►│ GPU Upload │
│ (heightmap) │   │ (rayon)  │   │ (wgpu)   │
└──────────┘    └──────────┘    └──────────┘
                      │
                ┌─────▼─────┐
                │ MeMLP AI  │
                │ (online)  │
                └───────────┘
```

## Chunk Lifecycle

1. **Request** — player position triggers chunk generation requests
2. **Generate** — OpenSimplex2 heightmap + cave/ore placement + vegetation
3. **Decorate** — AI-driven vegetation, decorations, dungeon chests
4. **Upload** — vertex/index buffers to GPU
5. **Render** — instanced draw call per chunk
6. **Unload** — chunks beyond render distance are evicted

## Block Registry

147+ block types, each with:
- Hardness (mining time)
- Tool tier (wood → stone → iron → diamond)
- Texture (16×16 PNG or procedural fallback)
- Model (13 block models: stairs, slabs, logs, etc.)
- Drops (what the player gets when mining)
- Fluid properties (water/lava propagation)
