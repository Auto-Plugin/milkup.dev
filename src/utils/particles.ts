// Starfield + rising milk droplets (teardrop shape, 3D depth) + shooting stars

interface Star {
  x: number; y: number; z: number
  size: number; twinkleSpeed: number; twinklePhase: number
  color: [number, number, number]
}

interface MilkDrop {
  x: number; y: number; z: number  // z: 0=far, 1=near
  vy: number
  size: number
  wobbleAmp: number; wobbleSpeed: number; wobblePhase: number
}

interface ShootingStar {
  x: number; y: number
  vx: number; vy: number
  life: number; maxLife: number; size: number
}

export function initParticles(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')!
  let w = 0, h = 0, animId = 0, time = 0
  let mouseX = 0.5, mouseY = 0.5

  const stars: Star[] = []
  const milkDrops: MilkDrop[] = []
  const shootingStars: ShootingStar[] = []

  const STAR_COLORS: [number, number, number][] = [
    [216, 222, 233], [129, 161, 193], [136, 192, 208],
    [94, 129, 172], [229, 233, 240],
  ]

  function resize() {
    w = canvas.width = canvas.offsetWidth
    h = canvas.height = canvas.offsetHeight
    initStars()
    initMilk()
  }

  function initStars() {
    stars.length = 0
    const count = Math.floor((w * h) / 3000)
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * w, y: Math.random() * h,
        z: Math.random(),
        size: Math.random() * 2 + 0.3,
        twinkleSpeed: Math.random() * 2 + 0.5,
        twinklePhase: Math.random() * Math.PI * 2,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      })
    }
  }

  function initMilk() {
    milkDrops.length = 0
    const count = Math.floor(w / 30)
    for (let i = 0; i < count; i++) spawnMilkDrop(true)
  }

  function spawnMilkDrop(randomY = false) {
    const z = Math.random() // 0=far, 1=near
    milkDrops.push({
      x: Math.random() * w,
      y: randomY ? Math.random() * h : h + Math.random() * 60,
      z,
      vy: -(0.06 + z * 0.3),  // near = faster upward, overall slower
      size: 2 + z * 5,         // near = bigger
      wobbleAmp: 15 + z * 20,
      wobbleSpeed: Math.random() * 1.5 + 0.5,
      wobblePhase: Math.random() * Math.PI * 2,
    })
  }

  function spawnShootingStar() {
    const fromLeft = Math.random() > 0.5
    shootingStars.push({
      x: fromLeft ? Math.random() * w * 0.3 : w * 0.7 + Math.random() * w * 0.3,
      y: Math.random() * h * 0.4,
      vx: (fromLeft ? 1 : -1) * (Math.random() * 6 + 4),
      vy: Math.random() * 3 + 1,
      life: 0, maxLife: Math.random() * 40 + 30,
      size: Math.random() * 2 + 1,
    })
  }

  // Draw smooth rounded drop (ellipse — no pointy parts)
  function drawTeardrop(x: number, y: number, r: number, alpha: number) {
    const ry = r * 1.35  // slightly taller than wide
    ctx.beginPath()
    ctx.ellipse(x, y, r, ry, 0, 0, Math.PI * 2)
    ctx.closePath()

    // Consistent milky color, just varying alpha
    const grad = ctx.createRadialGradient(x, y - ry * 0.2, 0, x, y, ry * 1.5)
    grad.addColorStop(0, `rgba(216,222,233,${alpha * 0.85})`)
    grad.addColorStop(0.5, `rgba(216,222,233,${alpha * 0.35})`)
    grad.addColorStop(1, `rgba(216,222,233,0)`)
    ctx.fillStyle = grad
    ctx.fill()
  }

  function drawStars() {
    for (const s of stars) {
      const parallax = s.z * 0.3
      const sx = s.x + (mouseX - 0.5) * parallax * 40
      const sy = s.y + (mouseY - 0.5) * parallax * 40
      const twinkle = Math.sin(time * s.twinkleSpeed + s.twinklePhase)
      const alpha = 0.3 + twinkle * 0.35 + s.z * 0.3
      const size = s.size * (0.5 + s.z * 0.5)
      const [r, g, b] = s.color

      ctx.beginPath()
      ctx.arc(sx, sy, size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${r},${g},${b},${Math.max(0, alpha)})`
      ctx.fill()

      if (s.z > 0.7 && alpha > 0.5) {
        const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, size * 4)
        glow.addColorStop(0, `rgba(${r},${g},${b},${alpha * 0.15})`)
        glow.addColorStop(1, `rgba(${r},${g},${b},0)`)
        ctx.fillStyle = glow
        ctx.fillRect(sx - size * 4, sy - size * 4, size * 8, size * 8)
      }
    }
  }

  function drawMilk() {
    // Sort by z so far drops render first (painter's order)
    milkDrops.sort((a, b) => a.z - b.z)

    for (let i = milkDrops.length - 1; i >= 0; i--) {
      const d = milkDrops[i]
      d.y += d.vy
      const wobbleX = Math.sin(time * d.wobbleSpeed + d.wobblePhase) * d.wobbleAmp * 0.01 * (0.5 + d.z * 0.5)
      const dx = d.x + wobbleX * d.size

      // Fade near top
      const fadeZone = h * 0.15
      let alpha = 0.08 + d.z * 0.45  // near=brighter, far=dimmer
      if (d.y < fadeZone) alpha *= d.y / fadeZone

      if (d.y < -30 || alpha < 0.01) {
        milkDrops.splice(i, 1)
        spawnMilkDrop()
        continue
      }

      drawTeardrop(dx, d.y, d.size, alpha)
    }
  }

  function drawShootingStars() {
    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const s = shootingStars[i]
      s.x += s.vx; s.y += s.vy; s.life++
      if (s.life > s.maxLife) { shootingStars.splice(i, 1); continue }

      const progress = s.life / s.maxLife
      const alpha = progress < 0.1 ? progress * 10 : (1 - progress)

      const grad = ctx.createLinearGradient(
        s.x, s.y, s.x - s.vx * 6, s.y - s.vy * 6,
      )
      grad.addColorStop(0, `rgba(216,222,233,${alpha * 0.8})`)
      grad.addColorStop(1, 'rgba(216,222,233,0)')
      ctx.beginPath()
      ctx.moveTo(s.x, s.y)
      ctx.lineTo(s.x - s.vx * 6, s.y - s.vy * 6)
      ctx.strokeStyle = grad
      ctx.lineWidth = s.size
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(s.x, s.y, s.size * 1.5, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(236,239,244,${alpha})`
      ctx.fill()
    }
  }

  function draw() {
    time += 0.016
    ctx.clearRect(0, 0, w, h)

    // Nebula glow
    const ng = ctx.createRadialGradient(w * 0.3, h * 0.4, 0, w * 0.3, h * 0.4, w * 0.5)
    ng.addColorStop(0, 'rgba(94,129,172,0.04)')
    ng.addColorStop(1, 'rgba(46,52,64,0)')
    ctx.fillStyle = ng
    ctx.fillRect(0, 0, w, h)

    drawStars()
    ctx.globalCompositeOperation = 'screen'
    drawMilk()
    drawShootingStars()
    ctx.globalCompositeOperation = 'source-over'

    if (Math.random() < 0.005) spawnShootingStar()
    animId = requestAnimationFrame(draw)
  }

  resize()
  draw()

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect()
    mouseX = (e.clientX - rect.left) / rect.width
    mouseY = (e.clientY - rect.top) / rect.height
  })

  window.addEventListener('resize', resize)
  return () => cancelAnimationFrame(animId)
}
