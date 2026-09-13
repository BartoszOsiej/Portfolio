---
sidebar_position: 6
title: Gameplay Systems
---

# VIVIA — Gameplay Systems

Everything on this page is verified against the code
([`Core/Src/gameplay.rs`](https://github.com/BartoszOsiej/NV2_ENGINE/blob/main/Core/Src/gameplay.rs)).

## Survival Stats

| Stat | Behaviour |
|---|---|
| **Health** | damage from combat, starvation and dehydration; death at 0 |
| **Hunger** | decays over time; eating (`eat`) restores it; empty → starvation damage |
| **Thirst** | decays over time; drinking (`drink`) restores it; empty → dehydration damage |

Regeneration (`heal`) works when you keep hunger and thirst topped up — starve
or dehydrate and attrition takes over. All rules live in `PlayerStats::tick`,
covered by unit tests.

## Day/Night Cycle

`GameClock` drives a real day/night cycle: `phase()`, `is_night()`, `darkness()`
(a 0..1 value the renderer feeds into sky and lighting), in-game clock
(`hour_minute()`) and `/time`-style control via commands. Hostiles spawn after
dark — daytime is for gathering, night is for surviving.

## Creatures

### Wildlife (passive, biome-matched)

| Animal | Notes |
|---|---|
| Deer | spawns in forest/mountain biomes, roams, animated walk cycle |
| Rabbit | spawns in grassland biomes, quick, animated hop |

Biome matching is data-driven (`spawns_in`) — the spawner asks the climate
system which species belong where.

### Hostiles (night spawn, 4 types)

| Enemy | Behaviour |
|---|---|
| Zombie | melee chaser |
| Skeleton | melee chaser, ranged-flavour combat tuning |
| Spider | fast melee |
| Creeper | **explodes** when close — `is_about_to_explode()` gives you a window to run |

Every hostile kill increments the session kill counter and can unlock achievements.
Kill feedback (damage flashes, XP-style session feedback) flows through
`EnemyEvent` / `SessionFeedback`.

## Achievements

A persistent achievement system with unlocks such as: `first-kill`, `hunter`,
`slayer`, `monster-slayer`, `last-stand`, `creeper-killer`, `spider-slayer`,
`skeleton-hunter`, `master-crafter`, `architect`, `builder`, `full-health`,
`explorer` — tracked across combat, crafting, building and exploration.

## Crafting (NVCrafter)

- **Recipe registry** with both **shaped** and **shapeless** recipes
- The `NVCrafter` block is the crafting station (breaks into itself —
  protected drop rules)
- Tools with material tiers (wood → stone → iron → diamond, `ToolTier`)
  and per-tool stats (`tool_stats`)
- Block hardness system (`hardness()`) gates mining speed by tool tier
- In-game inventory with hotbar, slots and item stacking

## Commands

In-game chat commands: `/tp <coords>` (teleport), `/give <item>` (item grant),
`/help`, plus the AI toolkit: `/ai_stats`, `/ai_export`, `/ai_import`,
`/ai_dataset`.

## Planned (not in this build)

Warmth/temperature survival, RPG progression (XP, levels, prestige), rarity
tiers, quest chains, boss fights, potions/armor/enchanting — all designed on
paper, none in the code yet. They will land on this page only when they ship.
