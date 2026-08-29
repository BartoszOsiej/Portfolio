import React, { useRef, useEffect, useState } from 'react'
import Layout from '@theme/Layout'

/* ── constants ── */
const W = 800
const H = 300
const GRAVITY = 0.55
const JUMP = -10.5
const GROUND = H - 45
const PLAYER_SIZE = 32
const OBS_MIN = 850
const OBS_MAX = 1500
const SPEED_START = 4.5
const SPEED_INC = 0.0008

interface Obstacle {
  x: number
  w: number
  h: number
  type: 'spike' | 'firewall' | 'null_ptr'
}

interface Particle {
  x: number; y: number; vx: number; vy: number
  life: number; maxLife: number; color: string; size: number
}

interface Cloud {
  x: number; y: number; w: number; speed: number; opacity: number
}

export default function EasterEgg(): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let playerY = GROUND - PLAYER_SIZE
    let velY = 0
    let jumping = false
    let obstacles: Obstacle[] = []
    let nextObs = OBS_MIN
    let speed = SPEED_START
    let frame = 0
    let alive = true
    let particles: Particle[] = []
    let shakeX = 0
    let shakeY = 0
    let shakeDur = 0
    let trail: { x: number; y: number; alpha: number }[] = []

    // parallax clouds
    const clouds: Cloud[] = []
    for (let i = 0; i < 6; i++) {
      clouds.push({
        x: Math.random() * W,
        y: 20 + Math.random() * 60,
        w: 40 + Math.random() * 60,
        speed: 0.3 + Math.random() * 0.4,
        opacity: 0.08 + Math.random() * 0.08,
      })
    }

    // mountains (far parallax)
    const mountains: { x: number; h: number; w: number }[] = []
    for (let i = 0; i < 8; i++) {
      mountains.push({
        x: i * 120 - 60,
        h: 30 + Math.random() * 50,
        w: 80 + Math.random() * 60,
      })
    }

    const hs = parseInt(localStorage.getItem('rust-dino-hs') || '0', 10)
    setHighScore(hs)

    function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
      ctx.beginPath()
      ctx.moveTo(x + r, y)
      ctx.lineTo(x + w - r, y)
      ctx.quadraticCurveTo(x + w, y, x + w, y + r)
      ctx.lineTo(x + w, y + h - r)
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
      ctx.lineTo(x + r, y + h)
      ctx.quadraticCurveTo(x, y + h, x, y + h - r)
      ctx.lineTo(x, y + r)
      ctx.quadraticCurveTo(x, y, x + r, y)
      ctx.closePath()
    }

    function spawnObstacle(): Obstacle {
      const types: Obstacle['type'][] = ['spike', 'firewall', 'null_ptr']
      const type = types[Math.floor(Math.random() * types.length)]
      const w = type === 'null_ptr' ? 22 : type === 'firewall' ? 32 : 18
      const h = type === 'null_ptr' ? 42 : type === 'firewall' ? 36 : 30
      return { x: W + 30, w, h, type }
    }

    function spawnParticles(x: number, y: number, color: string, count = 10) {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const v = 1 + Math.random() * 4
        particles.push({
          x, y,
          vx: Math.cos(angle) * v,
          vy: Math.sin(angle) * v - 1,
          life: 25 + Math.random() * 20,
          maxLife: 45,
          color,
          size: 2 + Math.random() * 3,
        })
      }
    }

    /* ── DRAW ── */

    function drawBg(ctx: CanvasRenderingContext2D) {
      // gradient sky
      const grad = ctx.createLinearGradient(0, 0, 0, H)
      grad.addColorStop(0, '#0a0e1a')
      grad.addColorStop(0.7, '#0d1224')
      grad.addColorStop(1, '#111833')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, W, H)

      // stars (twinkling)
      for (let i = 0; i < 40; i++) {
        const sx = (i * 137 + frame * 0.05) % W
        const sy = (i * 73) % (GROUND - 40)
        const twinkle = 0.15 + Math.sin(frame * 0.03 + i) * 0.1
        ctx.fillStyle = `rgba(165,180,252,${twinkle})`
        ctx.beginPath()
        ctx.arc(sx, sy, 1 + (i % 3 === 0 ? 0.5 : 0), 0, Math.PI * 2)
        ctx.fill()
      }

      // mountains (slow parallax)
      ctx.fillStyle = 'rgba(30,35,60,0.6)'
      mountains.forEach(m => {
        const mx = ((m.x - frame * 0.15) % (W + 200)) - 100
        ctx.beginPath()
        ctx.moveTo(mx, GROUND)
        ctx.lineTo(mx + m.w / 2, GROUND - m.h)
        ctx.lineTo(mx + m.w, GROUND)
        ctx.closePath()
        ctx.fill()
      })

      // clouds (medium parallax)
      clouds.forEach(c => {
        c.x -= c.speed * speed * 0.08
        if (c.x + c.w < -20) { c.x = W + 20; c.y = 20 + Math.random() * 60 }
        ctx.fillStyle = `rgba(165,180,252,${c.opacity})`
        ctx.beginPath()
        ctx.ellipse(c.x + c.w / 2, c.y, c.w / 2, 8, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.beginPath()
        ctx.ellipse(c.x + c.w * 0.3, c.y - 3, c.w * 0.3, 6, 0, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    function drawGround(ctx: CanvasRenderingContext2D) {
      // ground gradient
      const gGrad = ctx.createLinearGradient(0, GROUND, 0, H)
      gGrad.addColorStop(0, 'rgba(165,180,252,0.25)')
      gGrad.addColorStop(1, 'rgba(165,180,252,0.02)')
      ctx.fillStyle = gGrad
      ctx.fillRect(0, GROUND, W, H - GROUND)

      // ground line with glow
      ctx.shadowColor = '#818cf8'
      ctx.shadowBlur = 6
      ctx.strokeStyle = 'rgba(165,180,252,0.4)'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(0, GROUND)
      ctx.lineTo(W, GROUND)
      ctx.stroke()
      ctx.shadowBlur = 0

      // scrolling grid
      ctx.fillStyle = 'rgba(165,180,252,0.1)'
      const gridOff = (frame * speed * 0.5) % 30
      for (let x = -gridOff; x < W; x += 30) {
        ctx.fillRect(x, GROUND + 6, 1.5, 1.5)
        ctx.fillRect(x + 15, GROUND + 14, 1, 1)
      }
    }

    function drawPlayer(ctx: CanvasRenderingContext2D) {
      const x = 80
      const y = playerY
      const breathe = Math.sin(frame * 0.08) * 1.5

      // glow aura
      const auraGrad = ctx.createRadialGradient(x + 16, y + 18, 5, x + 16, y + 18, 30)
      auraGrad.addColorStop(0, 'rgba(232,121,249,0.15)')
      auraGrad.addColorStop(1, 'rgba(232,121,249,0)')
      ctx.fillStyle = auraGrad
      ctx.beginPath()
      ctx.arc(x + 16, y + 18, 30, 0, Math.PI * 2)
      ctx.fill()

      // body (smooth ellipse)
      ctx.fillStyle = '#e879f9'
      ctx.beginPath()
      ctx.ellipse(x + 16, y + 18 + breathe, 14, 12 + breathe * 0.3, 0, 0, Math.PI * 2)
      ctx.fill()

      // shell (rounded dome)
      const shellGrad = ctx.createLinearGradient(x + 4, y + 2, x + 28, y + 16)
      shellGrad.addColorStop(0, '#c084fc')
      shellGrad.addColorStop(1, '#7c3aed')
      ctx.fillStyle = shellGrad
      ctx.beginPath()
      ctx.ellipse(x + 16, y + 13, 13, 10, 0, Math.PI, 0)
      ctx.fill()

      // shell detail lines
      ctx.strokeStyle = 'rgba(167,139,250,0.4)'
      ctx.lineWidth = 0.8
      for (let i = -2; i <= 2; i++) {
        ctx.beginPath()
        ctx.arc(x + 16 + i * 5, y + 14, 8, -0.8, -0.3)
        ctx.stroke()
      }

      // eyes (with shine)
      ctx.fillStyle = '#fff'
      ctx.beginPath()
      ctx.arc(x + 10, y + 10, 4.5, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(x + 22, y + 10, 4.5, 0, Math.PI * 2)
      ctx.fill()
      // pupils
      ctx.fillStyle = '#0a0e1a'
      ctx.beginPath()
      ctx.arc(x + 11.5, y + 10, 2.2, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(x + 23.5, y + 10, 2.2, 0, Math.PI * 2)
      ctx.fill()
      // eye shine
      ctx.fillStyle = 'rgba(255,255,255,0.8)'
      ctx.beginPath()
      ctx.arc(x + 9, y + 8.5, 1.2, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(x + 21, y + 8.5, 1.2, 0, Math.PI * 2)
      ctx.fill()

      // claws (rounded)
      ctx.fillStyle = '#f0abfc'
      const clawAnim = Math.sin(frame * 0.12) * 4
      // left claw
      ctx.beginPath()
      ctx.ellipse(x - 1, y + 22 + clawAnim, 5, 3, -0.3, 0, Math.PI * 2)
      ctx.fill()
      // right claw
      ctx.beginPath()
      ctx.ellipse(x + 33, y + 22 - clawAnim, 5, 3, 0.3, 0, Math.PI * 2)
      ctx.fill()

      // legs (animated, smooth)
      ctx.fillStyle = '#d946ef'
      for (let i = 0; i < 3; i++) {
        const legPhase = Math.sin(frame * 0.18 + i * 1.2)
        const lx = x + 6 + i * 9
        const ly = y + 26 + legPhase * 2
        ctx.beginPath()
        ctx.ellipse(lx, ly + 3, 2, 4 + legPhase, 0, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function drawObstacle(ctx: CanvasRenderingContext2D, obs: Obstacle) {
      if (obs.type === 'spike') {
        // smooth triangle spike
        ctx.shadowColor = '#ef4444'
        ctx.shadowBlur = 10
        const spikeGrad = ctx.createLinearGradient(obs.x, GROUND, obs.x, GROUND - obs.h)
        spikeGrad.addColorStop(0, '#dc2626')
        spikeGrad.addColorStop(1, '#f87171')
        ctx.fillStyle = spikeGrad
        ctx.beginPath()
        ctx.moveTo(obs.x, GROUND)
        ctx.quadraticCurveTo(obs.x + obs.w / 2, GROUND - obs.h + 5, obs.x + obs.w / 2, GROUND - obs.h)
        ctx.quadraticCurveTo(obs.x + obs.w / 2, GROUND - obs.h + 5, obs.x + obs.w, GROUND)
        ctx.closePath()
        ctx.fill()
        ctx.shadowBlur = 0
        // glow tip
        ctx.fillStyle = 'rgba(252,165,165,0.6)'
        ctx.beginPath()
        ctx.arc(obs.x + obs.w / 2, GROUND - obs.h + 2, 3, 0, Math.PI * 2)
        ctx.fill()
      } else if (obs.type === 'firewall') {
        // rounded firewall
        ctx.shadowColor = '#f97316'
        ctx.shadowBlur = 10
        roundRect(ctx, obs.x, GROUND - obs.h, obs.w, obs.h, 4)
        const fwGrad = ctx.createLinearGradient(obs.x, GROUND - obs.h, obs.x, GROUND)
        fwGrad.addColorStop(0, '#fb923c')
        fwGrad.addColorStop(1, '#c2410c')
        ctx.fillStyle = fwGrad
        ctx.fill()
        ctx.shadowBlur = 0
        // brick pattern
        ctx.strokeStyle = 'rgba(0,0,0,0.2)'
        ctx.lineWidth = 0.8
        for (let row = 0; row < 3; row++) {
          const by = GROUND - obs.h + row * 12 + 2
          ctx.beginPath()
          ctx.moveTo(obs.x + 2, by)
          ctx.lineTo(obs.x + obs.w - 2, by)
          ctx.stroke()
        }
        // flames (smooth bezier)
        for (let i = 0; i < 4; i++) {
          const fx = obs.x + 4 + i * 7
          const fh = 6 + Math.sin(frame * 0.25 + i * 1.5) * 5
          const flameGrad = ctx.createLinearGradient(fx, GROUND - obs.h, fx, GROUND - obs.h - fh)
          flameGrad.addColorStop(0, '#fbbf24')
          flameGrad.addColorStop(0.5, '#f97316')
          flameGrad.addColorStop(1, 'rgba(239,68,68,0.3)')
          ctx.fillStyle = flameGrad
          ctx.beginPath()
          ctx.moveTo(fx, GROUND - obs.h)
          ctx.quadraticCurveTo(fx + 3, GROUND - obs.h - fh, fx + 5, GROUND - obs.h)
          ctx.fill()
        }
      } else {
        // null pointer — rounded skull
        ctx.shadowColor = '#6b7280'
        ctx.shadowBlur = 8
        roundRect(ctx, obs.x, GROUND - obs.h, obs.w, obs.h, 5)
        const npGrad = ctx.createLinearGradient(obs.x, GROUND - obs.h, obs.x, GROUND)
        npGrad.addColorStop(0, '#6b7280')
        npGrad.addColorStop(1, '#374151')
        ctx.fillStyle = npGrad
        ctx.fill()
        ctx.shadowBlur = 0
        // eye sockets
        ctx.fillStyle = '#1f2937'
        ctx.beginPath()
        ctx.arc(obs.x + 7, GROUND - obs.h + 12, 4, 0, Math.PI * 2)
        ctx.fill()
        ctx.beginPath()
        ctx.arc(obs.x + 15, GROUND - obs.h + 12, 4, 0, Math.PI * 2)
        ctx.fill()
        // red eyes
        ctx.fillStyle = '#ef4444'
        ctx.shadowColor = '#ef4444'
        ctx.shadowBlur = 6
        ctx.beginPath()
        ctx.arc(obs.x + 7, GROUND - obs.h + 12, 2, 0, Math.PI * 2)
        ctx.fill()
        ctx.beginPath()
        ctx.arc(obs.x + 15, GROUND - obs.h + 12, 2, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
        // teeth
        ctx.fillStyle = '#9ca3af'
        for (let i = 0; i < 3; i++) {
          ctx.fillRect(obs.x + 4 + i * 5, GROUND - obs.h + 20, 3, 4)
        }
        // NULL text
        ctx.fillStyle = 'rgba(156,163,175,0.6)'
        ctx.font = '7px JetBrains Mono, monospace'
        ctx.textAlign = 'center'
        ctx.fillText('NULL', obs.x + obs.w / 2, GROUND - obs.h + 32)
        ctx.textAlign = 'left'
      }
    }

    function drawHUD(ctx: CanvasRenderingContext2D) {
      const s = Math.floor(frame / 3)
      ctx.fillStyle = 'rgba(165,180,252,0.85)'
      ctx.font = '600 14px JetBrains Mono, monospace'
      ctx.textAlign = 'right'
      ctx.fillText(`SCORE ${String(s).padStart(5, '0')}`, W - 20, 25)
      if (hs > 0) {
        ctx.fillStyle = 'rgba(165,180,252,0.35)'
        ctx.font = '12px JetBrains Mono, monospace'
        ctx.fillText(`BEST ${String(hs).padStart(5, '0')}`, W - 20, 42)
      }
      ctx.textAlign = 'left'
    }

    function drawGameOver(ctx: CanvasRenderingContext2D) {
      // fade overlay
      ctx.fillStyle = 'rgba(10,14,26,0.65)'
      ctx.fillRect(0, 0, W, H)

      // scanlines effect
      ctx.fillStyle = 'rgba(0,0,0,0.08)'
      for (let y = 0; y < H; y += 3) {
        ctx.fillRect(0, y, W, 1)
      }

      // SEGFAULT text with glow
      ctx.shadowColor = '#e879f9'
      ctx.shadowBlur = 20
      ctx.fillStyle = '#e879f9'
      ctx.font = 'bold 30px JetBrains Mono, monospace'
      ctx.textAlign = 'center'
      ctx.fillText('SEGFAULT', W / 2, H / 2 - 25)
      ctx.shadowBlur = 0

      // score
      ctx.fillStyle = '#a5b4fc'
      ctx.font = '600 15px JetBrains Mono, monospace'
      ctx.fillText(`score: ${Math.floor(frame / 3)}`, W / 2, H / 2 + 8)

      // retry hint (blinking)
      const blink = Math.sin(frame * 0.08) > 0
      if (blink) {
        ctx.fillStyle = 'rgba(165,180,252,0.5)'
        ctx.font = '12px JetBrains Mono, monospace'
        ctx.fillText('SPACE or click to retry', W / 2, H / 2 + 35)
      }
      ctx.textAlign = 'left'
    }

    /* ── UPDATE ── */

    function update() {
      if (!alive) return
      frame++
      speed += SPEED_INC

      // physics
      velY += GRAVITY
      playerY += velY
      if (playerY >= GROUND - PLAYER_SIZE) {
        playerY = GROUND - PLAYER_SIZE
        velY = 0
        jumping = false
      }

      // trail
      trail.push({ x: 80 + 16, y: playerY + 18, alpha: 0.5 })
      trail.forEach(t => { t.alpha -= 0.03; t.x -= speed * 0.3 })
      trail = trail.filter(t => t.alpha > 0)

      // obstacles
      nextObs -= speed
      if (nextObs <= 0) {
        obstacles.push(spawnObstacle())
        nextObs = OBS_MIN + Math.random() * (OBS_MAX - OBS_MIN)
      }
      obstacles.forEach(o => { o.x -= speed })
      obstacles = obstacles.filter(o => o.x > -60)

      // collision
      const px = 80
      const py = playerY
      for (const o of obstacles) {
        const ox = o.x + 5
        const ow = o.w - 10
        if (
          px + PLAYER_SIZE - 7 > ox &&
          px + 7 < ox + ow &&
          py + PLAYER_SIZE - 5 > GROUND - o.h &&
          py + 5 < GROUND
        ) {
          alive = false
          shakeDur = 15
          spawnParticles(px + 16, py + 16, '#e879f9', 20)
          spawnParticles(px + 16, py + 16, '#f87171', 8)
          setGameOver(true)
          const finalScore = Math.floor(frame / 3)
          setScore(finalScore)
          if (finalScore > hs) {
            localStorage.setItem('rust-dino-hs', String(finalScore))
            setHighScore(finalScore)
          }
          return
        }
      }

      // particles
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.12
        p.vx *= 0.98
        p.life--
      })
      particles = particles.filter(p => p.life > 0)

      // screen shake
      if (shakeDur > 0) {
        shakeX = (Math.random() - 0.5) * shakeDur * 0.8
        shakeY = (Math.random() - 0.5) * shakeDur * 0.8
        shakeDur--
      } else {
        shakeX = 0
        shakeY = 0
      }
    }

    function draw() {
      ctx!.save()
      ctx!.translate(shakeX, shakeY)
      ctx!.clearRect(-10, -10, W + 20, H + 20)

      drawBg(ctx!)
      drawGround(ctx!)

      // trail
      trail.forEach(t => {
        ctx!.globalAlpha = t.alpha * 0.4
        ctx!.fillStyle = '#a855f7'
        ctx!.beginPath()
        ctx!.arc(t.x, t.y, 3, 0, Math.PI * 2)
        ctx!.fill()
      })
      ctx!.globalAlpha = 1

      obstacles.forEach(o => drawObstacle(ctx!, o))
      drawPlayer(ctx!)

      // particles (smooth circles)
      particles.forEach(p => {
        const a = p.life / p.maxLife
        ctx!.globalAlpha = a
        ctx!.fillStyle = p.color
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.size * a, 0, Math.PI * 2)
        ctx!.fill()
      })
      ctx!.globalAlpha = 1

      drawHUD(ctx!)
      if (!alive) drawGameOver(ctx!)

      ctx!.restore()
    }

    function loop() {
      update()
      draw()
      animId = requestAnimationFrame(loop)
    }

    function reset() {
      playerY = GROUND - PLAYER_SIZE
      velY = 0
      obstacles = []
      nextObs = OBS_MIN
      speed = SPEED_START
      frame = 0
      alive = true
      particles = []
      trail = []
      shakeDur = 0
      setGameOver(false)
      setScore(0)
    }

    function handleKey(e: KeyboardEvent) {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault()
        if (!alive) { reset(); return }
        if (!jumping) {
          velY = JUMP
          jumping = true
          spawnParticles(80, playerY + PLAYER_SIZE, '#a855f7', 6)
        }
      }
    }

    function handleClick() {
      if (!alive) { reset(); return }
      if (!jumping) {
        velY = JUMP
        jumping = true
        spawnParticles(80, playerY + PLAYER_SIZE, '#a855f7', 6)
      }
    }

    // touch support
    function handleTouch(e: TouchEvent) {
      e.preventDefault()
      handleClick()
    }

    window.addEventListener('keydown', handleKey)
    canvas.addEventListener('click', handleClick)
    canvas.addEventListener('touchstart', handleTouch, { passive: false })
    loop()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('keydown', handleKey)
      canvas.removeEventListener('click', handleClick)
      canvas.removeEventListener('touchstart', handleTouch)
    }
  }, [])

  return (
    <Layout title="🦀 Easter Egg" description="You found the secret game!">
      <main style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', minHeight: '80vh', padding: '2rem',
        fontFamily: 'JetBrains Mono, monospace',
      }}>
        <h1 style={{
          fontSize: '1.4rem', marginBottom: '0.5rem',
          background: 'linear-gradient(135deg, #e879f9, #a855f7, #6366f1)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          🦀 Rust Dino
        </h1>
        <p style={{ opacity: 0.5, fontSize: '0.8rem', marginBottom: '1rem' }}>
          SPACE / click / tap to jump · avoid the segfaults
        </p>
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          style={{
            borderRadius: 16,
            border: '1px solid rgba(165,180,252,0.15)',
            boxShadow: '0 24px 80px -20px rgba(99,102,241,0.35), inset 0 1px 0 rgba(255,255,255,0.05)',
            cursor: 'pointer',
            maxWidth: '100%',
          }}
        />
        <div style={{
          marginTop: '1.5rem', display: 'flex', gap: '2rem',
          fontSize: '0.85rem', opacity: 0.6,
        }}>
          <span>Score: {score}</span>
          <span>Best: {highScore}</span>
        </div>
        <p style={{
          marginTop: '2rem', fontSize: '0.7rem', opacity: 0.25,
          textAlign: 'center', maxWidth: 400,
        }}>
          Refresh 10 times to find this page. 🎉
        </p>
      </main>
    </Layout>
  )
}
