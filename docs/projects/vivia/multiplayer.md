---
sidebar_position: 5
title: Multiplayer Networking
---

# VIVIA — Multiplayer Networking

## Protocol

TCP-based protocol at **20 Hz** with bincode serialization:

### Client → Server

| Packet | Description |
|---|---|
| `Join` | Player name, handshake |
| `PlayerInput` | Position, yaw, flying, sprinting |
| `BlockBreak` | Block coordinates |
| `BlockPlace` | Block coordinates + type |
| `Attack` | Melee reach distance |
| `Chat` | Message text |
| `RequestChunks` | Chunk coordinate list |
| `DamageEntity` | Entity ID + damage amount |
| `PingRTT` | Timestamp for RTT measurement |

### Server → Client

| Packet | Description |
|---|---|
| `Welcome` | Player ID, spawn, seed, tick rate |
| `Chunk` | Block data (compressed) |
| `PlayerUpdate` | Other player positions |
| `EntityBatch` | Bulk mob updates |
| `EntitySpawn` / `EntityDespawn` | Mob lifecycle |
| `BlockUpdate` | Block changes from other players |
| `StatsSync` | Server-authoritative stats |
| `CombatEvent` | Damage, knockback, enrage |
| `ServerTick` | Day time, night, blood moon |
| `PlayerList` | Connected players |
| `ServerChat` | System/player messages |

## Anti-Cheat

- **Name sanitisation** — max 24 chars, no control characters
- **Chat sanitisation** — max 256 chars, control chars stripped
- **Block coordinate validation** — ±16,384 X/Z, 0..512 Y
- **Position validation** — finite, ±1,000,000 (rejects NaN/Inf/teleport bombs)
- **Rate limiting** — >120 packets/sec → disconnect
- **Handshake timeout** — 10s anti-slowloris
- **Pending connection limit** — 64 max pre-handshake

## Client-Side Interpolation

Remote players and entities are interpolated between updates:
- Each update stores previous position + new position
- Interpolation factor `t` advances with delta time
- Position = lerp(prev, new, t) for smooth movement at any frame rate

## Chunk Streaming

- **View distance:** 8 chunks radius
- **Backpressure:** max 4 chunks sent per tick per client
- **Dedup:** client sends `ChunkAck`, server skips already-sent chunks
- **Request filtering:** client doesn't re-request cached chunks

## Server Architecture

- **Authoritative:** server owns all entity HP, positions, block state
- **Broadcast:** all state changes broadcast to all clients
- **Per-entity sync:** only entities within `ENTITY_SYNC_RADIUS` (48m) are synced
- **Despawn radius:** entities beyond 64m are despawned on client
