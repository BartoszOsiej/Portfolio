---
sidebar_position: 1
title: Fortis — Bare-Metal RISC-V Chain of Trust
---

import ScrollReveal from '@site/src/components/ScrollReveal'
import GlowCard from '@site/src/components/GlowCard'

# Fortis — Bare-Metal RISC-V Chain of Trust

> **Bare-metal RISC-V measured boot — SHA-256 + ML-KEM-768 chain of trust.
> Real crypto on real hardware (QEMU). Proof of concept for Caliptra-style
> root of trust. 51 KiB binary, zero heap, no_std.**

<ScrollReveal>

## What It Does

Fortis is a bare-metal RISC-V firmware that implements a measured boot chain —
the same technology used by cloud providers to verify that server firmware
hasn't been tampered with. Each boot stage is hashed (SHA-256) and stored in
PCR-like measurement registers. A post-quantum key exchange (ML-KEM-768)
verifies the firmware's authenticity. The entire chain runs without an OS,
without heap allocation, and without standard library.

## Key Features

<div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem', margin: '1.5rem 0' }}>

<GlowCard>
<div>

### 🔐 SHA-256 Measurement
Real FIPS 180-4 SHA-256 via the `sha2` crate — not a placeholder. Each
boot stage is hashed and chained: PCR[0] → PCR[1] → PCR[2]. Changing
any stage cascades through all measurements.

</div>
</GlowCard>

<GlowCard>
<div>

### 🛡️ ML-KEM-768
Post-quantum key encapsulation (FIPS 203) running on bare metal. The
firmware decapsulates a ciphertext to derive a shared secret — proving
identity without quantum-vulnerable cryptography.

</div>
</GlowCard>

<GlowCard>
<div>

### 📊 PCR Registers
3 Platform Configuration Register-like measurement registers. Chained
via `SHA-256(old_pcr || new_measurement)`. Exactly how TPM/Caliptra
works in production hardware.

</div>
</GlowCard>

<GlowCard>
<div>

### 🖥️ MMIO UART
Direct hardware register access to ns16550a UART at `0x10000000`.
No OS, no drivers, no abstraction — raw `read_volatile`/`write_volatile`
to QEMU's virt machine.

</div>
</GlowCard>

<GlowCard>
<div>

### ⚡ 51 KiB Binary
Entire firmware fits in 51 KiB of loadable content. No heap, no
alloc, no standard library. Every byte is accounted for. Runs on
QEMU virt with OpenSBI.

</div>
</GlowCard>

<GlowCard>
<div>

### 🧪 CI-Tested on QEMU
GitHub Actions builds the firmware and runs it in `qemu-system-riscv64`.
Automatically verifies "CHAIN OF TRUST: PASSED" in the output. No
mocking — real RISC-V execution.

</div>
</GlowCard>

</div>

</ScrollReveal>

## Architecture

```
┌─────────────────────────────────────────┐
│          OpenSBI (M-mode)               │
│          Firmware base: 0x80200000       │
└──────────────────┬──────────────────────┘
                   │ jump to S-mode
                   ▼
┌─────────────────────────────────────────┐
│           Fortis Entry Point             │
│  1. Mask interrupts                      │
│  2. Set up 64 KiB stack                 │
│  3. Clear BSS section                   │
│  4. Jump to rust_main                   │
└──────────────────┬──────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────┐
│            Stage 1: Boot Stub           │
│  SHA-256(stub_data) → PCR[0]           │
│  Verify: PCR[0] matches expected       │
└──────────────────┬──────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────┐
│           Stage 2: Firmware             │
│  SHA-256(PCR[0] || fw_data) → PCR[1]  │
│  Verify: PCR[1] matches expected       │
└──────────────────┬──────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────┐
│      Stage 3: Post-Quantum Verify       │
│  ML-KEM-768 decapsulate(ct) → ss      │
│  SHA-256(PCR[1] || ss) → PCR[2]       │
│  Verify: shared secret matches         │
└──────────────────┬──────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────┐
│         Stage 4: Attestation Report     │
│  Print all PCR values + verification   │
│  CHAIN OF TRUST: PASSED (3/3)          │
└─────────────────────────────────────────┘
```

## Tech Stack

| Component | Technology |
|---|---|
| Language | Rust (`#![no_std]`, no heap) |
| Target | `riscv64gc-unknown-none-elf` |
| SHA-256 | `sha2` 0.11 (FIPS 180-4) |
| ML-KEM-768 | `ml-kem` 0.3 (FIPS 203) |
| UART driver | ns16550a MMIO (custom) |
| Platform | QEMU virt (RISC-V 64) |
| Firmware | OpenSBI (M-mode) |
| Binary size | ~51 KiB (.text + .rodata) |
| CI | GitHub Actions + QEMU |

---

**Links:** [GitHub](https://github.com/BartoszOsiej/fortis)
