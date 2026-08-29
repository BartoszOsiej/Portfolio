import React, { useRef, useEffect, useState } from 'react'
import Layout from '@theme/Layout'

/* ── constants ── */
const W = 800
const H = 300
const GRAVITY = 0.6
const JUMP = -11
const GROUND = H - 40
const PLAYER_SIZE = 32
const OBS_MIN = 900
const OBS_MAX = 1600
const SPEED_START = 5
const SPEED_INC = 0.001

interface Obstacle {
  x: number
  w: number
  h: number
  type: 'spike' | 'firewall' | 'null_ptr'
}

export default function EasterEgg(): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [started, setStarted] = useState(false)

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
    let particles: { x: number; y: number; vx: number; vy: number; life: number; color: string }[] = []

    const hs = parseInt(localStorage.getItem('rust-dino-hs') || '0', 10)
    setHighScore(hs)

    function spawnObstacle(): Obstacle {
      const types: Obstacle['type'][] = ['spike', 'firewall', 'null_ptr']
      const type = types[Math.floor(Math.random() * types.length)]
      const w = type === 'null_ptr' ? 20 : type === 'firewall' ? 30 : 16
      const h = type === 'null_ptr' ? 40 : type === 'firewall' ? 35 : 28
      return { x: W + 20, w, h, type }
    }

    function spawnParticles(x: number, y: number, color: string) {
      for (let i = 0; i < 8; i++) {
        particles.push({
          x, y,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 1) * 4,
          life: 20 + Math.random() * 15,
          color,
        })
      }
    }

    function drawPlayer(ctx: CanvasRenderingContext2D) {
      const x = 80
      const y = playerY
      // body
      ctx.fillStyle = '#e879f9'
      ctx.beginPath()
      ctx.ellipse(x + 16, y + 18, 14, 12, 0, 0, Math.PI * 2)
      ctx.fill()
      // shell
      ctx.fillStyle = '#a855f7'
      ctx.beginPath()
      ctx.ellipse(x + 16, y + 14, 12, 10, 0, Math.PI, 0)
      ctx.fill()
      // eyes
      ctx.fillStyle = '#fff'
      ctx.beginPath()
      ctx.arc(x + 10, y + 10, 4, 0, Math.PI * 2)
      ctx.arc(x + 22, y + 10, 4, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#0a0e1a'
      ctx.beginPath()
      ctx.arc(x + 11, y + 10, 2, 0, Math.PI * 2)
      ctx.arc(x + 23, y + 10, 2, 0, Math.PI * 2)
      ctx.fill()
      // claws
      ctx.fillStyle = '#e879f9'
      const clawOffset = Math.sin(frame * 0.15) * 3
      ctx.fillRect(x - 2, y + 20 + clawOffset, 8, 4)
      ctx.fillRect(x + 26, y + 20 - clawOffset, 8, 4)
      // legs
      ctx.fillStyle = '#d946ef'
      for (let i = 0; i < 3; i++) {
        const legY = y + 24 + Math.sin(frame * 0.2 + i) * 2
        ctx.fillRect(x + 4 + i * 8, legY, 3, 8)
      }
      // rust glow
      ctx.shadowColor = '#e879f9'
      ctx.shadowBlur = 12
      ctx.fillStyle = 'rgba(232,121,249,0.1)'
      ctx.beginPath()
      ctx.arc(x + 16, y + 18, 22, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowBlur = 0
    }

    function drawObstacle(ctx: CanvasRenderingContext2D, obs: Obstacle) {
      if (obs.type === 'spike') {
        ctx.fillStyle = '#ef4444'
        ctx.beginPath()
        ctx.moveTo(obs.x, GROUND)
        ctx.lineTo(obs.x + obs.w / 2, GROUND - obs.h)
        ctx.lineTo(obs.x + obs.w, GROUND)
        ctx.closePath()
        ctx.fill()
        ctx.shadowColor = '#ef4444'
        ctx.shadowBlur = 8
        ctx.fill()
        ctx.shadowBlur = 0
      } else if (obs.type === 'firewall') {
        // firewall: brick pattern
        ctx.fillStyle = '#f97316'
        ctx.fillRect(obs.x, GROUND - obs.h, obs.w, obs.h)
        ctx.fillStyle = '#ea580c'
        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 2; col++) {
            ctx.fillRect(
              obs.x + col * 15 + (row % 2) * 7,
              GROUND - obs.h + row * 12,
              13, 10
            )
          }
        }
        // flames on top
        ctx.fillStyle = '#fbbf24'
        for (let i = 0; i < 3; i++) {
          const fx = obs.x + 5 + i * 10
          const fh = 8 + Math.sin(frame * 0.3 + i) * 4
          ctx.fillRect(fx, GROUND - obs.h - fh, 6, fh)
        }
      } else {
        // null pointer: skull
        ctx.fillStyle = '#6b7280'
        ctx.fillRect(obs.x, GROUND - obs.h, obs.w, obs.h)
        ctx.fillStyle = '#374151'
        ctx.fillRect(obs.x + 3, GROUND - obs.h + 5, 14, 10)
        // eyes
        ctx.fillStyle = '#ef4444'
        ctx.fillRect(obs.x + 5, GROUND - obs.h + 7, 4, 4)
        ctx.fillRect(obs.x + 11, GROUND - obs.h + 7, 4, 4)
        // text
        ctx.fillStyle = '#9ca3af'
        ctx.font = '7px monospace'
        ctx.fillText('NULL', obs.x + 1, GROUND - obs.h + 24)
      }
    }

    function drawGround(ctx: CanvasRenderingContext2D) {
      // ground line
      ctx.strokeStyle = 'rgba(165,180,252,0.3)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(0, GROUND)
      ctx.lineTo(W, GROUND)
      ctx.stroke()
      // grid dots
      ctx.fillStyle = 'rgba(165,180,252,0.15)'
      for (let x = (frame * speed * 0.5) % 40; x < W; x += 40) {
        ctx.fillRect(x, GROUND + 8, 2, 2)
      }
    }

    function drawBg(ctx: CanvasRenderingContext2D) {
      // stars
      ctx.fillStyle = 'rgba(165,180,252,0.2)'
      for (let i = 0; i < 30; i++) {
        const sx = ((i * 137 + frame * 0.1) % W)
        const sy = (i * 73) % (GROUND - 20)
        ctx.fillRect(sx, sy, 1.5, 1.5)
      }
    }

    function drawHUD(ctx: CanvasRenderingContext2D) {
      ctx.fillStyle = 'rgba(165,180,252,0.8)'
      ctx.font = '14px JetBrains Mono, monospace'
      ctx.textAlign = 'right'
      ctx.fillText(`SCORE ${String(Math.floor(frame / 3)).padStart(5, '0')}`, W - 20, 25)
      if (hs > 0) {
        ctx.fillStyle = 'rgba(165,180,252,0.4)'
        ctx.fillText(`HI ${String(hs).padStart(5, '0')}`, W - 20, 42)
      }
      ctx.textAlign = 'left'
    }

    function gameOverScreen(ctx: CanvasRenderingContext2D) {
      ctx.fillStyle = 'rgba(10,14,26,0.7)'
      ctx.fillRect(0, 0, W, H)
      ctx.fillStyle = '#e879f9'
      ctx.font = 'bold 28px JetBrains Mono, monospace'
      ctx.textAlign = 'center'
      ctx.fillText('SEGFAULT', W / 2, H / 2 - 20)
      ctx.fillStyle = '#a5b4fc'
      ctx.font = '14px JetBrains Mono, monospace'
      ctx.fillText(`score: ${Math.floor(frame / 3)}`, W / 2, H / 2 + 10)
      ctx.fillStyle = 'rgba(165,180,252,0.5)'
      ctx.font = '12px JetBrains Mono, monospace'
      ctx.fillText('press SPACE to retry', W / 2, H / 2 + 35)
      ctx.textAlign = 'left'
    }

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

      // obstacles
      nextObs -= speed
      if (nextObs <= 0) {
        obstacles.push(spawnObstacle())
        nextObs = OBS_MIN + Math.random() * (OBS_MAX - OBS_MIN)
      }
      obstacles.forEach(o => { o.x -= speed })
      obstacles = obstacles.filter(o => o.x > -50)

      // collision
      const px = 80
      const py = playerY
      for (const o of obstacles) {
        const ox = o.x + 4
        const ow = o.w - 8
        const oh = o.h
        if (
          px + PLAYER_SIZE - 6 > ox &&
          px + 6 < ox + ow &&
          py + PLAYER_SIZE - 4 > GROUND - oh &&
          py + 4 < GROUND
        ) {
          alive = false
          spawnParticles(px + 16, py + 16, '#e879f9')
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
        p.vy += 0.15
        p.life--
      })
      particles = particles.filter(p => p.life > 0)
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H)
      drawBg(ctx!)
      drawGround(ctx!)
      obstacles.forEach(o => drawObstacle(ctx!, o))
      drawPlayer(ctx!)
      particles.forEach(p => {
        ctx!.globalAlpha = p.life / 30
        ctx!.fillStyle = p.color
        ctx!.fillRect(p.x, p.y, 3, 3)
      })
      ctx!.globalAlpha = 1
      drawHUD(ctx!)
      if (!alive) gameOverScreen(ctx!)
    }

    function loop() {
      update()
      draw()
      animId = requestAnimationFrame(loop)
    }

    function handleKey(e: KeyboardEvent) {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault()
        if (!alive) {
          // restart
          playerY = GROUND - PLAYER_SIZE
          velY = 0
          obstacles = []
          nextObs = OBS_MIN
          speed = SPEED_START
          frame = 0
          alive = true
          particles = []
          setGameOver(false)
          setScore(0)
          return
        }
        if (!jumping) {
          velY = JUMP
          jumping = true
          spawnParticles(80, playerY + PLAYER_SIZE, '#a855f7')
        }
      }
    }

    function handleClick() {
      if (!alive) {
        playerY = GROUND - PLAYER_SIZE
        velY = 0
        obstacles = []
        nextObs = OBS_MIN
        speed = SPEED_START
        frame = 0
        alive = true
        particles = []
        setGameOver(false)
        setScore(0)
        return
      }
      if (!jumping) {
        velY = JUMP
        jumping = true
        spawnParticles(80, playerY + PLAYER_SIZE, '#a855f7')
      }
    }

    window.addEventListener('keydown', handleKey)
    canvas.addEventListener('click', handleClick)
    setStarted(true)
    loop()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('keydown', handleKey)
      canvas.removeEventListener('click', handleClick)
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
          SPACE or click to jump · avoid the obstacles
        </p>
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          style={{
            borderRadius: 16,
            border: '1px solid rgba(165,180,252,0.2)',
            boxShadow: '0 20px 60px -20px rgba(99,102,241,0.4)',
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
          marginTop: '2rem', fontSize: '0.7rem', opacity: 0.3,
          textAlign: 'center', maxWidth: 400,
        }}>
          Refresh 10 times to find this page. You did it. 🎉
        </p>
      </main>
    </Layout>
  )
}
