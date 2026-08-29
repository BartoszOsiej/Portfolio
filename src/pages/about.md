---
slug: /about
title: About
---

import AuroraBackground from '@site/src/components/AuroraBackground'
import ScrollReveal from '@site/src/components/ScrollReveal'

<AuroraBackground />

<div className="about-hero">
<div className="about-avatar">B</div>

# About Me

**Bartosz Osiej** · Systems Engineer
</div>

<div className="about-text">

I'm a systems engineer who builds production-grade software from the ground up —
from GPU renderers to kernel eBPF programs, from neural networks to compiler frontends.

## What I Build

**Game Engines.** My flagship project, [VIVIA: Beyond the Known](/projects/vivia/), is a
commercial voxel survival engine written in Rust — 47,000+ lines, 282 tests, shipping on
the Epic Games Store. It features procedural terrain with real-world NASA climate data,
an embedded neural network (MeMLP) that learns while you play, multiplayer TCP networking,
procedural audio, and a 60-species creature system with AI-generated 3D models.

**Kernel Telemetry.** [Talus](/projects/talus-process-monitor/) is an eBPF-based endpoint
security agent for Linux — kernel-side tracepoints capture `execve`/`openat`/`connect`/
`accept`/`sendto`/`recvfrom`, stream events into userspace through per-CPU perf buffers,
a sliding-window heuristic detects ransomware behavior, and automated `SIGKILL` response
terminates offending processes. Built with `#![no_std]` Rust on nightly, FrankenTUI.

**Programming Languages.** [Externum](/projects/externum/) is a custom language that
compiles to Python, Bash, and binary — with a REPL, module system, standard library,
OOP, generators, and a browser playground running entirely in WebAssembly via Pyodide.
120/120 tests passing.

## What Drives Me

I'm drawn to systems that sit close to the metal — where performance, correctness, and
elegant architecture intersect. I believe great software is built by understanding every
layer of the stack, from the CPU cache to the user experience.

I write primarily in **Rust** (systems, async, unsafe, FFI), with deep experience in
**Linux kernel development** (eBPF, tracepoints, `#![no_std]`), **GPU rendering**
(wgpu, Vulkan, shaders), and **compiler construction** (transpilation, AST, REPL).

## Open Source

Every project I build is open source. I believe in transparent engineering —
the code speaks for itself, the tests prove it works, and the documentation
explains the why.

## Let's Talk

I'm looking for systems engineering roles where I can work on hard problems:
kernel code, game engines, compilers, or distributed systems.

📧 **mmc29213@gmail.com**
🐙 **[github.com/BartoszOsiej](https://github.com/BartoszOsiej)**

</div>
