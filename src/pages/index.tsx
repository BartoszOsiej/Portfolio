import React from 'react'
import useBaseUrl from '@docusaurus/useBaseUrl'
import Layout from '@theme/Layout'
import AuroraBackground from '@site/src/components/AuroraBackground'
import ScrollReveal from '@site/src/components/ScrollReveal'
import GlowCard from '@site/src/components/GlowCard'

export default function Home(): React.JSX.Element {
  const viviaUrl = useBaseUrl('/projects/vivia/')
  const ebpfUrl = useBaseUrl('/projects/talus-process-monitor/')
  const externumUrl = useBaseUrl('/projects/externum/')
  const cyberforgeUrl = useBaseUrl('/projects/cyberforge/')
  const quantumshieldUrl = useBaseUrl('/projects/quantumshield/')
  const fortisUrl = useBaseUrl('/projects/fortis/')
  const aboutUrl = useBaseUrl('/about/')
  const skillsUrl = useBaseUrl('/skills/')

  return (
    <Layout title="Home" description="Bartosz Osiej — systems engineer. Rust game engine, eBPF kernel telemetry, custom programming languages.">
      <AuroraBackground />
      <main className="home-main">

        {/* ── Hero ── */}
        <section className="home-hero">
          <h1 className="hero-name">
            Bartosz Osiej
            <span className="hero-subtitle">Systems Engineer</span>
          </h1>
          <p className="hero-tagline">
            I build production-grade systems from bare metal up — a commercial voxel game engine
            with embedded neural networks (Rust + wgpu), real-time eBPF kernel telemetry
            for Linux security, and a custom programming language with multi-target compilation.
          </p>
          <div className="hero-actions">
            <a className="btn-primary" href={viviaUrl}>🎮 VIVIA</a>
            <a className="btn-outline" href={ebpfUrl}>🔬 eBPF Monitor</a>
            <a className="btn-outline" href={externumUrl}>📜 Externum</a>
            <a className="btn-email" href="mailto:mmc29213@gmail.com">✉ Contact</a>
          </div>
        </section>

        {/* ── Numbers ── */}
        <ScrollReveal>
          <section className="home-section">
            <div className="stats-row">
              <div className="stat-card">
                <div className="num">47k+</div>
                <div className="label">Lines of Rust</div>
              </div>
              <div className="stat-card">
                <div className="num">400+</div>
                <div className="label">Tests Passing</div>
              </div>
              <div className="stat-card">
                <div className="num">6</div>
                <div className="label">Production Systems</div>
              </div>
              <div className="stat-card">
                <div className="num">60</div>
                <div className="label">Creature Species</div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* ── Projects ── */}
        <ScrollReveal delay={100}>
          <section className="home-section">
            <h2>🚀 Featured Projects</h2>
            <p className="section-intro">
              Six production-grade systems, each solving a hard problem end-to-end.
            </p>
            <div className="project-grid">
              <a className="project-card" href={viviaUrl} onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect()
                e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
                e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
              }}>
                <div className="glow" aria-hidden="true" />
                <div className="icon" style={{ backgroundColor: 'rgba(139,92,246,0.15)' }}>🎮</div>
                <h3>VIVIA: Beyond the Known</h3>
                <p>Commercial voxel survival engine — procedural world with real-world NASA climate data,
                   embedded MeMLP neural network, multiplayer TCP networking, procedural audio, and
                   a full mob system with 60 species. Shipping on Epic Games Store.</p>
                <div className="tags">
                  <span className="tag">Rust</span>
                  <span className="tag">wgpu</span>
                  <span className="tag">Neural Network</span>
                  <span className="tag">Multiplayer</span>
                  <span className="tag">EGS</span>
                </div>
                <span className="arrow" aria-hidden="true">→</span>
              </a>

              <a className="project-card" href={ebpfUrl} onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect()
                e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
                e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
              }}>
                <div className="glow" aria-hidden="true" />
                <div className="icon" style={{ backgroundColor: 'rgba(16,185,129,0.15)' }}>🔬</div>
                <h3>Talus — eBPF Endpoint Security</h3>
                <p>eBPF endpoint security agent for Linux — detect ransomware behaviour,
                   respond at the kernel edge. Kernel-side tracepoints (aya-ebpf),
                   per-CPU perf buffers, sliding-window heuristic, automated SIGKILL
                   response, and a 7-panel FrankenTUI dashboard.</p>
                <div className="tags">
                  <span className="tag">Rust</span>
                  <span className="tag">eBPF</span>
                  <span className="tag">Aya</span>
                  <span className="tag">FrankenTUI</span>
                  <span className="tag">Linux Kernel</span>
                </div>
                <span className="arrow" aria-hidden="true">→</span>
              </a>

              <a className="project-card" href={externumUrl} onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect()
                e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
                e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
              }}>
                <div className="glow" aria-hidden="true" />
                <div className="icon" style={{ backgroundColor: 'rgba(251,191,36,0.15)' }}>📜</div>
                <h3>Externum Language</h3>
                <p>A custom programming language that compiles to Python, Bash, and binary —
                   with a REPL, module system, standard library, OOP, generators, and a
                   browser playground via WebAssembly (Pyodide). 120/120 tests passing.</p>
                <div className="tags">
                  <span className="tag">Python</span>
                  <span className="tag">Compiler</span>
                  <span className="tag">WebAssembly</span>
                  <span className="tag">REPL</span>
                  <span className="tag">120 Tests</span>
                </div>
                <span className="arrow" aria-hidden="true">→</span>
              </a>

              <a className="project-card" href={cyberforgeUrl} onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect()
                e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
                e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
              }}>
                <div className="glow" aria-hidden="true" />
                <div className="icon" style={{ backgroundColor: 'rgba(244,114,182,0.15)' }}>🔒</div>
                <h3>CyberForge</h3>
                <p>Four Rust security tools as one workspace — port scanner, web scanner,
                   hash cracker, packet analyzer. Each shipped separately on crates.io.
                   29/29 tests green.</p>
                <div className="tags">
                  <span className="tag">Rust</span>
                  <span className="tag">Tokio</span>
                  <span className="tag">libpcap</span>
                  <span className="tag">4 Tools</span>
                </div>
                <span className="arrow" aria-hidden="true">→</span>
              </a>

              <a className="project-card" href={quantumshieldUrl} onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect()
                e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
                e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
              }}>
                <div className="glow" aria-hidden="true" />
                <div className="icon" style={{ backgroundColor: 'rgba(99,102,241,0.15)' }}>🛡️</div>
                <h3>QuantumShield</h3>
                <p>Post-quantum file encryption CLI — ML-KEM-768 key exchange + AES-256-GCM
                   + HKDF. NIST FIPS 203 compliant, fuzz-tested. Quantum-safe before
                   quantum computers arrive.</p>
                <div className="tags">
                  <span className="tag">Rust</span>
                  <span className="tag">Cryptography</span>
                  <span className="tag">NIST</span>
                  <span className="tag">FIPS 203</span>
                </div>
                <span className="arrow" aria-hidden="true">→</span>
              </a>

              <a className="project-card" href={fortisUrl} onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect()
                e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
                e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
              }}>
                <div className="glow" aria-hidden="true" />
                <div className="icon" style={{ backgroundColor: 'rgba(16,185,129,0.15)' }}>🔐</div>
                <h3>Fortis</h3>
                <p>Bare-metal RISC-V measured boot — SHA-256 + ML-KEM-768 chain of trust.
                   Real crypto on real hardware (QEMU). Proof of concept for Caliptra-style
                   root of trust. 51 KiB binary, zero heap.</p>
                <div className="tags">
                  <span className="tag">Rust</span>
                  <span className="tag">RISC-V</span>
                  <span className="tag">no_std</span>
                  <span className="tag">Bare Metal</span>
                </div>
                <span className="arrow" aria-hidden="true">→</span>
              </a>
            </div>
          </section>
        </ScrollReveal>

        {/* ── Skills ── */}
        <ScrollReveal delay={200}>
          <section className="home-section">
            <h2>⚡ Core Competencies</h2>
            <div className="skill-grid">
              <div className="skill-badge">
                <span className="skill-icon">🦀</span>
                <div className="skill-info"><strong>Rust</strong><span>Systems, async, unsafe, FFI</span></div>
              </div>
              <div className="skill-badge">
                <span className="skill-icon">🖥️</span>
                <div className="skill-info"><strong>Linux Kernel</strong><span>eBPF, tracepoints, no_std</span></div>
              </div>
              <div className="skill-badge">
                <span className="skill-icon">🎮</span>
                <div className="skill-info"><strong>Game Engine</strong><span>wgpu, Vulkan, shaders, ECS</span></div>
              </div>
              <div className="skill-badge">
                <span className="skill-icon">🧠</span>
                <div className="skill-info"><strong>ML / AI</strong><span>Embedded neural nets, backprop</span></div>
              </div>
              <div className="skill-badge">
                <span className="skill-icon">🌐</span>
                <div className="skill-info"><strong>Networking</strong><span>TCP, WebRTC, P2P protocols</span></div>
              </div>
              <div className="skill-badge">
                <span className="skill-icon">⚙️</span>
                <div className="skill-info"><strong>Compilers</strong><span>Transpilation, REPL, AST</span></div>
              </div>
              <div className="skill-badge">
                <span className="skill-icon">🔒</span>
                <div className="skill-info"><strong>Security</strong><span>Cybersec, packet analysis, hardening</span></div>
              </div>
              <div className="skill-badge">
                <span className="skill-icon">🐧</span>
                <div className="skill-info"><strong>DevOps</strong><span>CI/CD, GitHub Actions, Docker</span></div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* ── CTA ── */}
        <ScrollReveal delay={300}>
          <section className="home-section" style={{ textAlign: 'center', padding: '2rem 0' }}>
            <h2>Let's build something</h2>
            <p className="section-intro" style={{ maxWidth: 480, margin: '0 auto 1.5rem' }}>
              I'm looking for a systems engineering role where I can work on hard
              problems — kernel code, game engines, compilers, or distributed systems.
            </p>
            <div className="hero-actions">
              <a className="btn-primary" href="mailto:mmc29213@gmail.com">✉ Get in Touch</a>
              <a className="btn-outline" href="https://github.com/BartoszOsiej">GitHub →</a>
              <a className="btn-outline" href={skillsUrl}>Full Skills →</a>
            </div>
          </section>
        </ScrollReveal>

      </main>
    </Layout>
  )
}
