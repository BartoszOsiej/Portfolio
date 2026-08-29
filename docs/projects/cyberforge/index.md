---
sidebar_position: 1
title: CyberForge — Security Toolkit
---

import ScrollReveal from '@site/src/components/ScrollReveal'
import GlowCard from '@site/src/components/GlowCard'

# CyberForge — Security Toolkit

> **Four Rust security tools as one workspace — port scanner, web scanner,
> hash cracker, packet analyzer. Each shipped separately on crates.io.
> 29/29 tests green.**

<ScrollReveal>

## What It Does

CyberForge is a monorepo of four focused security tools, each built as an
independent crate with its own CLI, tests, and crates.io package. Together
they cover the full recon-to-analysis pipeline: discover hosts, scan for
vulnerabilities, crack password hashes, and dissect network traffic.

## Key Features

<div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem', margin: '1.5rem 0' }}>

<GlowCard>
<div>

### 🔍 NetRecon
Concurrent TCP port scanner — CIDR expansion, hostname resolution,
banner grabbing, JSON output, configurable worker pool. Scans a /24
in seconds.

</div>
</GlowCard>

<GlowCard>
<div>

### 🕵️ ShadowScan
Web vulnerability scanner — security header audit, TLS/certificate
inspection, reflected XSS/SQLi probes, path discovery. Finds the
low-hanging fruit before attackers do.

</div>
</GlowCard>

<GlowCard>
<div>

### 🔑 HashSleuth
Hash identification & cracking — fingerprinting of 15+ formats
(MD5, SHA-256, bcrypt, Django, LDAP, phpass), parallel dictionary
attack, masked brute force.

</div>
</GlowCard>

<GlowCard>
<div>

### 📦 PacketEye
pcap traffic analyzer — live + offline capture, protocol mix breakdown,
top talkers, TCP handshake stats. Reads standard pcap files without
libpcap dependencies.

</div>
</GlowCard>

<GlowCard>
<div>

### ⚡ Async Tokio
All network-bound tools use Tokio async runtime for concurrent
connections. Non-blocking I/O means fast scans without thread
explosion.

</div>
</GlowCard>

<GlowCard>
<div>

### 📦 Published on crates.io
Each tool is a separate crate: `netrecon`, `shadowscan`, `hashsleuth`,
`packeteye`. Install with `cargo install` — no workspace needed.

</div>
</GlowCard>

</div>

</ScrollReveal>

## Architecture

```
cyberforge/
├── netrecon/          # TCP port scanner
│   ├── src/main.rs    # CLI + scanner logic
│   └── Cargo.toml     # Independent crate
├── shadowscan/        # Web vuln scanner
│   ├── src/main.rs    # HTTP probes + header audit
│   └── Cargo.toml
├── hashsleuth/        # Hash cracker
│   ├── src/main.rs    # Fingerprint + dictionary attack
│   └── Cargo.toml
├── packeteye/         # pcap analyzer
│   ├── src/main.rs    # Packet parsing + stats
│   └── Cargo.toml
├── fuzz/              # Cargo-fuzz targets
└── Cargo.toml         # Workspace root
```

## Tech Stack

| Component | Technology |
|---|---|
| Language | Rust (stable) |
| Async runtime | Tokio |
| Packet capture | pcap crate (PacketEye) |
| HTTP client | ureq |
| Hashing | sha1, md-5, bcrypt |
| Build | Cargo workspace |
| CI | GitHub Actions (5 platforms) |

## Test Results

| Tool | Tests | Status |
|------|:-----:|:------:|
| hashsleuth | 8 | ✅ |
| netrecon | 8 | ✅ |
| packeteye | 8 | ✅ |
| shadowscan | 5 | ✅ |
| **Total** | **29** | **✅** |

---

**Links:** [GitHub](https://github.com/BartoszOsiej/CyberForge) · [crates.io (netrecon)](https://crates.io/crates/netrecon) · [crates.io (shadowscan)](https://crates.io/crates/shadowscan) · [crates.io (hashsleuth)](https://crates.io/crates/hashsleuth) · [crates.io (packeteye)](https://crates.io/crates/packeteye)
