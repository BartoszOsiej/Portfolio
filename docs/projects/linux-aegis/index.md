---
sidebar_position: 1
title: AEGIS — Stackable Linux Security Module
---

import ScrollReveal from '@site/src/components/ScrollReveal'
import GlowCard from '@site/src/components/GlowCard'

# AEGIS — Stackable Linux Security Module

> **An in-tree Linux Security Module (LSM) that boots from upstream `torvalds/linux`.
> Process protection, SHA-256 file integrity, syscall auditing, and kernel module
> control — stacked with the existing LSMs, configurable per subsystem. Booted
> end-to-end in QEMU with a one-command reproduce script.**

<ScrollReveal>

## What It Does

AEGIS (Advanced Guardian for Integrated System Security) is C code that lives inside
the Linux kernel's `security/` tree. It registers a hook table through the LSM
framework, so instead of replacing the kernel's own security model it *stacks* on top
of it — alongside capability, Yama, and AppArmor. Every subsystem is independent and
compiled behind its own Kconfig flag.

## Key Features

<div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem', margin: '1.5rem 0' }}>

<GlowCard>
<div>

### 🛡️ Process Protection
Restricts `ptrace(PTRACE_ATTACH)` and `PTRACE_TRACEME` per process — makes
debugger-aided privilege escalation attackers work much harder.

</div>
</GlowCard>

<GlowCard>
<div>

### 🔐 SHA-256 File Integrity
Digest tracking and write-protection for critical system files, enforced from
`file_open` / `file_permission` / `inode_permission` hooks.

</div>
</GlowCard>

<GlowCard>
<div>

### 📊 Syscall Audit
Blocking and logging of dangerous syscalls per process policy, driven from the
`bprm_check_security` hook.

</div>
</GlowCard>

<GlowCard>
<div>

### 🔌 Module Control
Restricts `kernel_load_data` and `kernel_read_file` — runtime tightening of kernel
module loading.

</div>
</GlowCard>

<GlowCard>
<div>

### ⚙️ Runtime Interfaces
`/proc/sys/kernel/aegis` (sysctl) and `/sys/kernel/security/aegis` (securityfs) —
toggle features live, list protected procs/files, dump blocked syscalls.

</div>
</GlowCard>

<GlowCard>
<div>

### 🖥️ Bootable DevKit
Static PID 1 initramfs + `aegisctl` control tool + QEMU launcher. CI compiles the
module in-tree and builds the userspace. No mocking — a real built kernel.

</div>
</GlowCard>

</div>

</ScrollReveal>

## Architecture

```
┌─────────────────────────────────────────┐
│           user space (aegisctl)        │
│  status · enable · stats · procs      │
└───────────┬───────────────┬───────────┘
            ▼               ▼
   /proc/sys/kernel/aegis   /sys/kernel/security/aegis
            │               │
            ▼               ▼
┌─────────────────────────────────────────┐
│          aegis_sysctl.c   aegis_…fs.c │
└───────────────────┬───────────────────┘
                    ▼
┌─────────────────────────────────────────┐
│  aegis_lsm.c — hook table             │
│  LSM_HOOK_INIT(task_alloc, …)        │
│  LSM_HOOK_INIT(ptrace_*, …)          │
│  LSM_HOOK_INIT(file_*, inode_*, …)   │
│  LSM_HOOK_INIT(bprm_check_security)  │
│  LSM_HOOK_INIT(kernel_load_data, …)  │
└─┬──────────┬──────────┬───────────────┘
  ▼          ▼          ▼
file.c   audit.c    module.c
process.c
```

Every hook is registered through `LSM_HOOK_INIT`, so AEGIS behaves exactly like any
other mainline LSM and composes with the rest of the stack.

## Tech Stack

| Component | Technology |
|---|---|
| Language | C (six source files, ~1,900 lines) |
| Kernel | Linux 7.3-rc1 (upstream `torvalds/linux`) |
| Framework | LSM (`security/`, `LSM_HOOK_INIT`) |
| Integrity | SHA-256 |
| Interfaces | sysctl + securityfs |
| Userspace tool | `aegisctl` (C, static) |
| Runtime | QEMU (nographic / GUI / GDB) |
| Config | `CONFIG_LOCALVERSION="-aegis"` |
| CI | GitHub Actions — in-tree module build + devkit build |

## Reproduce It

```console
$ ./apply.sh
==> Cloning upstream kernel...
==> Installing AEGIS module source
==> Applying integration patches
==> Building kernel (this takes a while)...
==> Done.
    Kernel  : /tmp/aegis-build/linux/arch/x86/boot/bzImage
```

Then boot it:

```console
$ cd devkit && make initramfs && make qemu
/ # uname -r
7.3.0-1-aegis
/ # aegisctl status
  AEGIS LSM status:   enabled
  Feature flags:      process-protect file-integrity syscall-audit module-control
```

---

**Links:** [GitHub](https://github.com/BartoszOsiej/linux-aegis)