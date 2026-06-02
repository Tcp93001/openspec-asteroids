import { type Entity, wrapPosition, circlesCollide } from './engine'

const PI2 = Math.PI * 2

export interface EntityBase {
  x: number
  y: number
  alive: boolean
}

export class Ship implements Entity {
  x: number
  y: number
  vx = 0
  vy = 0
  angle = -Math.PI / 2
  radius = 15
  alive = true
  lives = 3
  invulnerable = false
  invulnTimer = 0
  blink = false
  thrusting = false
  multiShotTimer = 0
  shieldTimer = 0

  constructor(canvasW: number, canvasH: number) {
    this.x = canvasW / 2
    this.y = canvasH / 2
  }

  reset(canvasW: number, canvasH: number) {
    this.x = canvasW / 2
    this.y = canvasH / 2
    this.vx = 0
    this.vy = 0
    this.angle = -Math.PI / 2
    this.alive = true
    this.lives = 3
    this.invulnerable = false
    this.invulnTimer = 0
    this.blink = false
    this.thrusting = false
    this.multiShotTimer = 0
    this.shieldTimer = 0
  }

  get hasShield(): boolean {
    return this.shieldTimer > 0
  }

  get isMultiShot(): boolean {
    return this.multiShotTimer > 0
  }

  rotate(dir: number, dt: number) {
    this.angle += dir * 3 * dt
  }

  thrust(dt: number) {
    this.vx += Math.cos(this.angle) * 200 * dt
    this.vy += Math.sin(this.angle) * 200 * dt
    this.thrusting = true
  }

  getSpeed(): number {
    return Math.sqrt(this.vx * this.vx + this.vy * this.vy)
  }

  applyFriction(dt: number) {
    const speed = this.getSpeed()
    if (speed > 0) {
      const friction = 0.98
      this.vx *= friction
      this.vy *= friction
    }
  }

  update(dt: number, canvasW: number, canvasH: number) {
    this.applyFriction(dt)
    this.x += this.vx * dt
    this.y += this.vy * dt
    ;[this.x, this.y] = wrapPosition(this.x, this.y, canvasW, canvasH)
    this.thrusting = false

    if (this.invulnerable) {
      this.invulnTimer -= dt
      this.blink = Math.floor(this.invulnTimer * 10) % 2 === 0
      if (this.invulnTimer <= 0) {
        this.invulnerable = false
        this.blink = false
      }
    }

    if (this.multiShotTimer > 0) {
      this.multiShotTimer -= dt
    }

    if (this.shieldTimer > 0) {
      this.shieldTimer -= dt
    }

    const maxSpeed = 350
    const speed = this.getSpeed()
    if (speed > maxSpeed) {
      this.vx = (this.vx / speed) * maxSpeed
      this.vy = (this.vy / speed) * maxSpeed
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    if (this.invulnerable && this.blink) return

    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.angle)

    if (this.hasShield) {
      ctx.beginPath()
      ctx.arc(0, 0, this.radius + 8, 0, PI2)
      ctx.strokeStyle = 'rgba(0, 200, 255, 0.3)'
      ctx.lineWidth = 3
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(0, 0, this.radius + 8, 0, PI2)
      ctx.fillStyle = 'rgba(0, 200, 255, 0.08)'
      ctx.fill()
    }

    ctx.beginPath()
    ctx.moveTo(this.radius + 4, 0)
    ctx.lineTo(-this.radius + 2, -this.radius * 0.6)
    ctx.lineTo(-this.radius * 0.5, 0)
    ctx.lineTo(-this.radius + 2, this.radius * 0.6)
    ctx.closePath()
    ctx.strokeStyle = '#00ccff'
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.fillStyle = 'rgba(0, 204, 255, 0.15)'
    ctx.fill()

    if (this.thrusting) {
      ctx.beginPath()
      ctx.moveTo(-this.radius * 0.5, 0)
      ctx.lineTo(-this.radius - 8 - Math.random() * 8, -4 + Math.random() * 8)
      ctx.lineTo(-this.radius - 8 - Math.random() * 8, -4 + Math.random() * 8)
      ctx.closePath()
      ctx.fillStyle = '#ff6600'
      ctx.fill()
      ctx.fillStyle = '#ffcc00'
      ctx.beginPath()
      ctx.moveTo(-this.radius * 0.3, 0)
      ctx.lineTo(-this.radius - 4, -2 + Math.random() * 4)
      ctx.lineTo(-this.radius - 4, -2 + Math.random() * 4)
      ctx.closePath()
      ctx.fill()
    }

    ctx.restore()
  }

  getProjectileSpawnPos(): [number, number] {
    return [
      this.x + Math.cos(this.angle) * (this.radius + 6),
      this.y + Math.sin(this.angle) * (this.radius + 6),
    ]
  }
}

export type AsteroidSize = 'large' | 'medium' | 'small'

const ASTEROID_RADII: Record<AsteroidSize, number> = {
  large: 40,
  medium: 22,
  small: 12,
}

const ASTEROID_SCORES: Record<AsteroidSize, number> = {
  large: 20,
  medium: 50,
  small: 100,
}

export class Asteroid implements Entity {
  x: number
  y: number
  vx: number
  vy: number
  angle = 0
  rotSpeed: number
  size: AsteroidSize
  radius: number
  vertices: { x: number; y: number }[]
  alive = true

  constructor(x: number, y: number, size: AsteroidSize, vx?: number, vy?: number) {
    this.x = x
    this.y = y
    this.size = size
    this.radius = ASTEROID_RADII[size]
    this.rotSpeed = (Math.random() - 0.5) * 2
    this.vx = vx ?? (Math.random() - 0.5) * 100
    this.vy = vy ?? (Math.random() - 0.5) * 100

    const numVerts = 8 + Math.floor(Math.random() * 5)
    this.vertices = []
    for (let i = 0; i < numVerts; i++) {
      const a = (i / numVerts) * PI2
      const r = this.radius * (0.7 + Math.random() * 0.3)
      this.vertices.push({ x: Math.cos(a) * r, y: Math.sin(a) * r })
    }
  }

  get scoreValue(): number {
    return ASTEROID_SCORES[this.size]
  }

  update(dt: number, canvasW: number, canvasH: number) {
    this.x += this.vx * dt
    this.y += this.vy * dt
    this.angle += this.rotSpeed * dt
    ;[this.x, this.y] = wrapPosition(this.x, this.y, canvasW, canvasH)
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.angle)
    ctx.beginPath()
    ctx.moveTo(this.vertices[0].x, this.vertices[0].y)
    for (let i = 1; i < this.vertices.length; i++) {
      ctx.lineTo(this.vertices[i].x, this.vertices[i].y)
    }
    ctx.closePath()
    ctx.strokeStyle = '#aaaacc'
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.fillStyle = 'rgba(100, 100, 140, 0.15)'
    ctx.fill()
    ctx.restore()
  }
}

export class Projectile implements Entity {
  x: number
  y: number
  vx: number
  vy: number
  radius = 3
  alive = true
  life = 1.5
  trail: { x: number; y: number }[] = []

  constructor(x: number, y: number, angle: number, speed = 400) {
    this.x = x
    this.y = y
    this.vx = Math.cos(angle) * speed
    this.vy = Math.sin(angle) * speed
  }

  update(dt: number, canvasW: number, canvasH: number) {
    this.trail.push({ x: this.x, y: this.y })
    if (this.trail.length > 8) this.trail.shift()

    this.x += this.vx * dt
    this.y += this.vy * dt
    ;[this.x, this.y] = wrapPosition(this.x, this.y, canvasW, canvasH)

    this.life -= dt
    if (this.life <= 0) this.alive = false
  }

  render(ctx: CanvasRenderingContext2D) {
    for (let i = 0; i < this.trail.length; i++) {
      const alpha = (i / this.trail.length) * 0.6
      ctx.beginPath()
      ctx.arc(this.trail[i].x, this.trail[i].y, this.radius * (i / this.trail.length), 0, PI2)
      ctx.fillStyle = `rgba(255, 255, 100, ${alpha})`
      ctx.fill()
    }
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, PI2)
    ctx.fillStyle = '#ffffaa'
    ctx.fill()
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius * 2, 0, PI2)
    ctx.fillStyle = 'rgba(255, 255, 180, 0.3)'
    ctx.fill()
  }
}

export type PowerUpType = 'multiShot' | 'teleport' | 'shield' | 'screenBomb'

const POWERUP_COLORS: Record<PowerUpType, string> = {
  multiShot: '#ff4444',
  teleport: '#cc44ff',
  shield: '#00ccff',
  screenBomb: '#ff8800',
}

const POWERUP_LABELS: Record<PowerUpType, string> = {
  multiShot: 'M',
  teleport: 'T',
  shield: 'S',
  screenBomb: 'B',
}

export class PowerUp implements Entity {
  x: number
  y: number
  type: PowerUpType
  radius = 16
  alive = true
  time = 0
  vy = 20

  constructor(x: number, y: number, type: PowerUpType) {
    this.x = x
    this.y = y
    this.type = type
  }

  update(dt: number, canvasW: number, canvasH: number) {
    this.y += this.vy * dt
    this.time += dt
    if (this.y > canvasH + 30) this.alive = false
  }

  render(ctx: CanvasRenderingContext2D) {
    const pulse = 1 + Math.sin(this.time * 4) * 0.1
    const color = POWERUP_COLORS[this.type]

    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.scale(pulse, pulse)

    ctx.beginPath()
    ctx.arc(0, 0, this.radius, 0, PI2)
    ctx.fillStyle = color + '30'
    ctx.fill()
    ctx.strokeStyle = color
    ctx.lineWidth = 2
    ctx.stroke()

    ctx.fillStyle = color
    ctx.font = 'bold 14px monospace'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(POWERUP_LABELS[this.type], 0, 0)

    ctx.restore()
  }
}

export class Particle implements Entity {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  r: number
  g: number
  b: number
  alive = true

  constructor(x: number, y: number, r: number, g: number, b: number) {
    this.x = x
    this.y = y
    const angle = Math.random() * PI2
    const speed = 40 + Math.random() * 160
    this.vx = Math.cos(angle) * speed
    this.vy = Math.sin(angle) * speed
    this.life = 0.3 + Math.random() * 0.4
    this.maxLife = this.life
    this.size = 1.5 + Math.random() * 3
    this.r = r
    this.g = g
    this.b = b
  }

  update(dt: number, _canvasW: number, _canvasH: number) {
    this.x += this.vx * dt
    this.y += this.vy * dt
    this.vx *= 0.97
    this.vy *= 0.97
    this.life -= dt
    if (this.life <= 0) this.alive = false
  }

  render(ctx: CanvasRenderingContext2D) {
    const alpha = Math.max(0, this.life / this.maxLife)
    const s = this.size * (0.3 + 0.7 * alpha)
    ctx.beginPath()
    ctx.arc(this.x, this.y, s, 0, PI2)
    ctx.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${alpha})`
    ctx.fill()
  }
}

export function spawnExplosion(
  x: number, y: number,
  count: number,
  r: number, g: number, b: number
): Particle[] {
  const particles: Particle[] = []
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(x, y, r, g, b))
  }
  return particles
}

export function createAsteroidWave(
  canvasW: number, canvasH: number,
  wave: number
): Asteroid[] {
  const count = 2 + wave
  const asteroids: Asteroid[] = []
  for (let i = 0; i < count; i++) {
    const x = Math.random() * (canvasW - 100) + 50
    const y = Math.random() * (canvasH - 100) + 50
    asteroids.push(new Asteroid(x, y, 'large'))
  }
  return asteroids
}

export function splitAsteroid(a: Asteroid): Asteroid[] {
  if (a.size === 'small') return []
  const nextSize: AsteroidSize = a.size === 'large' ? 'medium' : 'small'
  const count = 2 + Math.floor(Math.random() * 2)
  return Array.from({ length: count }, () =>
    new Asteroid(a.x, a.y, nextSize, a.vx + (Math.random() - 0.5) * 60, a.vy + (Math.random() - 0.5) * 60)
  )
}
