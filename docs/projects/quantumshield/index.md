---
sidebar_position: 1
title: QuantumShield — Post-Quantum Encryption
---

import ScrollReveal from '@site/src/components/ScrollReveal'
import GlowCard from '@site/src/components/GlowCard'

# QuantumShield — Post-Quantum Encryption

> **Post-quantum file encryption CLI — ML-KEM-768 key exchange + AES-256-GCM
> + HKDF. NIST FIPS 203 compliant, fuzz-tested. Quantum-safe before
> quantum computers arrive.**

<ScrollReveal>

## What It Does

QuantumShield encrypts files using a hybrid approach: ML-KEM-768 (formerly
CRYSTALS-Kyber) for key encapsulation and AES-256-GCM for authenticated
encryption. The key exchange is resistant to Shor's algorithm — even a
future quantum computer can't break it.

## Key Features

<div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem', margin: '1.5rem 0' }}>

<GlowCard>
<div>

### 🔐 ML-KEM-768
NIST FIPS 203 key encapsulation — the same algorithm standardized for
post-quantum TLS. 1184-byte encapsulation key, 1088-byte ciphertext,
32-byte shared secret.

</div>
</GlowCard>

<GlowCard>
<div>

### 🔒 AES-256-GCM
Authenticated encryption with associated data. The shared secret from
ML-KEM derives a 256-bit AES key via HKDF-SHA-256. Tamper-proof:
any modification to ciphertext is detected.

</div>
</GlowCard>

<GlowCard>
<div>

### 🧪 Fuzz-Tested
Cargo-fuzz targets exercise the encryption/decryption pipeline with
random inputs. Memory-safe by construction — no `unsafe` in the
crypto path.

</div>
</GlowCard>

<GlowCard>
<div>

### 📦 Published on crates.io
Single crate: `pqguard`. Install with `cargo install pqguard`.
No external dependencies beyond the Rust crypto ecosystem.

</div>
</GlowCard>

<GlowCard>
<div>

### ⚡ CLI Interface
Simple command-line interface: `pqguard encrypt`, `pqguard decrypt`,
`pqguard keygen`. Files are self-describing — the header contains
all parameters needed for decryption.

</div>
</GlowCard>

<GlowCard>
<div>

### 🌐 Quantum-Safe
ML-KEM-768 provides 192-bit security against classical attacks and
128-bit against quantum attacks. Even if a quantum computer appears
tomorrow, encrypted files stay safe.

</div>
</GlowCard>

</div>

</ScrollReveal>

## Architecture

```
┌─────────────────────────────────────────────┐
│                Key Generation                │
│  ML-KEM-768 KeyGen → (dk, ek)              │
│  dk = 64 bytes (decapsulation key)         │
│  ek = 1184 bytes (encapsulation key)       │
└──────────────────┬──────────────────────────┘
                   │
         ┌─────────┴─────────┐
         ▼                   ▼
┌─────────────────┐  ┌─────────────────┐
│    Encrypt       │  │    Decrypt       │
│                  │  │                  │
│ 1. ML-KEM-Encap  │  │ 1. ML-KEM-Decap │
│    → (ct, ss)    │  │    → ss         │
│                  │  │                  │
│ 2. HKDF-SHA-256  │  │ 2. HKDF-SHA-256 │
│    ss → AES key  │  │    ss → AES key │
│                  │  │                  │
│ 3. AES-256-GCM   │  │ 3. AES-256-GCM  │
│    encrypt file  │  │    decrypt file │
└─────────────────┘  └─────────────────┘
```

## Tech Stack

| Component | Technology |
|---|---|
| Language | Rust (stable) |
| Key encapsulation | ml-kem 0.3 (FIPS 203) |
| Authenticated encryption | aes-gcm 0.11 |
| Key derivation | hkdf 0.12 + sha2 0.11 |
| RNG | rand 0.10 |
| Build | Cargo |
| CI | GitHub Actions |
| Testing | Unit tests + cargo-fuzz |

---

**Links:** [GitHub](https://github.com/BartoszOsiej/quantum-shield) · [crates.io](https://crates.io/crates/pqguard) · [Landing page](https://bartoszosiej.github.io/pqguard/)
