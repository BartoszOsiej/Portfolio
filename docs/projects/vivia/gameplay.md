---
sidebar_position: 6
title: Gameplay Systems
---

# VIVIA — Gameplay Systems

## Survival Mechanics

### Stats

| Stat | Max | Decay Rate | Death At |
|---|---|---|---|
| Health | 30 (+4/vitality) | starvation 2.5/s, dehydration 2.8/s | 0 |
| Hunger | 100 | 100/240s (~4 min) | starvation damage |
| Thirst | 100 | 100/300s (~5 min) | dehydration damage |
| Warmth | 100 | climate-dependent | 0 = freeze death |

### Regeneration

Requires **70%+ hunger AND 70%+ thirst** — well-fed and hydrated.
Below 15% of either: no regen, slow attrition (0.6 HP/s).

### Temperature System

- Real annual temperature from embedded NASA climatology
- Cold climates + night + wet weather chill you faster
- Torches radiate heat nearby
- Campfire: burn 2 bag items → +8 warmth for duration

## Combat

### Player Weapons

- **Melee:** range 2.4m, base damage 5 + strength bonus
- **Crit chance:** 3% per agility point (max 50%)
- **Kill streak:** +0.5 attack per kill without taking damage (max x5)

### Hostile Creatures (10 types)

| Enemy | HP | Damage | Behaviour |
|---|---|---|---|
| Shade | 8 | 1.5 | Fast melee, combo strikes |
| Crawler | 6 | 1.0 | Fast melee, combo |
| Brute | 26 | 4.5 | Heavy slam, big knockback |
| Wraith | 14 | 2.5 | Lunge attacks |
| Frost Hound | 12 | 2.0 | Lunge, cold damage |
| Sand Reaper | 10 | 2.0 | Tail swipe |
| Stone Husk | 22 | 4.0 | Slam attacks |
| Mire Wisp | 5 | 1.0 | Fast melee |
| Gale | 9 | 1.5 | Ranged projectile |
| Volt Shrike | 11 | 2.0 | Ranged projectile |
| **Gloom Tyrant** | **70** | **8.0** | **Boss: massive slam** |

### Rarity Tiers

| Tier | HP Mult | Damage Mult | Spawn Weight |
|---|---|---|---|
| Common | 1.0× | 1.0× | 100 |
| Rare | 1.5× | 1.3× | 18 |
| Ultra Rare | 2.2× | 1.8× | 4 |
| **Mythic** | **3.5×** | **2.6×** | **1** |

## RPG Progression

- **XP curve:** `30 + 25 × level^1.4` (snappy early, gentle wall endgame)
- **Stat points:** +1 per level (strength, vitality, agility)
- **Prestige:** Lv50+ → reset to Lv1 with permanent +5% damage, +8% XP, +5 max HP per tier

## Crafting (NVCrafter)

- 5×5 crafting grid
- Recipe book showing all craftable outputs
- Weapons forged from hostile trophies (permanent, enchantable)
- Armour from trophies (passive defense + regen)
- Potions from foraged ingredients

## Quest System

Guided progression chain with journal tracking:
- Explorer quests (visit biomes)
- Combat quests (defeat specific enemies)
- Crafting quests (forge weapons/armor)
- Boss quests (defeat Gloom Tyrant)
