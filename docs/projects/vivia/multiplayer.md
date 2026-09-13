---
sidebar_position: 5
title: Multiplayer — Protocol Design (planned)
---

# VIVIA — Multiplayer Networking (DESIGN, NOT SHIPPED)

> ⚠️ **Status: designed, not implemented.** Nothing in this document exists in the
> current build — there is no networking code in the repository yet. This page
> publishes the protocol design so it can be reviewed before implementation.
> Single-player is fully functional today.

## Design Goals

- **Authoritative server** in Rust (tokio) — clients never mutate world state directly
- **TCP** with `bincode` serialization, fixed **20 Hz** tick for entity sync
- **Anti-cheat from day one** — server validates every packet against world state

## Protocol Sketch

### Client → Server

| Packet | Description |
|---|---|
| `Join` | Player name, handshake, protocol version |
| `PlayerInput` | Position, yaw, flying, sprinting (validated server-side) |
| `BlockBreak` | Block coordinates (checked against reach + hardness) |
| `BlockPlace` | Block coordinates + type (inventory validated) |
| `Attack` | Melee reach distance |
| `Chat` | Message text |
| `RequestChunks` | Chunk coordinate list (rate-limited) |
| `PingRTT` | Timestamp for RTT measurement |

### Server → Client

| Packet | Description |
|---|---|
| `Welcome` | Player ID, spawn point, seed, tick rate |
| `ChunkData` | Compressed chunk (16×512×16) |
| `EntitySnapshot` | Creature + player states at tick |
| `BlockUpdate` | Single-block delta |
| `ChatRelay` | Chat messages |
| `Kick` | Reason string |

## Anti-Cheat Validation Plan

- **Coordinate bombs** — reject positions beyond plausible movement per tick
- **NaN positions** — reject any non-finite coordinate
- **Rate limiting** — per-packet-type budgets (chunk requests especially)
- **Handshake timeouts** — drop clients that never complete `Join`
- **Server-side reach checks** — block interactions beyond reach are rejected

## Client-Side Interpolation Plan

Remote players get buffered snapshots (100 ms buffer) and interpolate between the
two most recent — the same approach used by Quake 3 source and modern shooters.

## Why publish a design before the code exists?

Because the protocol is the contract. Feedback on tick rate, compression and
anti-cheat windows is cheap now and expensive after implementation. If you have
opinions — the [repo](https://github.com/BartoszOsiej/NV2_ENGINE) has discussions open.
