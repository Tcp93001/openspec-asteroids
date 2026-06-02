import { useRef, useCallback, useEffect, useState } from 'react'
import { useGameLoop } from '../hooks/useGameLoop'
import { Ship, Projectile, Asteroid, PowerUp, type PowerUpType, spawnExplosion, splitAsteroid } from '../game/entities'
import { type GameStateType, circlesCollide } from '../game/engine'
import { Spawner } from '../game/spawner'
import { HUD } from './HUD'
import * as audio from '../audio/synth'

interface GameCanvasProps {
  gameState: GameStateType
  onPause: () => void
  onGameOver: (score: number) => void
  onLifeLost: () => void
}

export function GameCanvas({ gameState, onPause, onGameOver, onLifeLost }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const shipRef = useRef<Ship | null>(null)
  const projectilesRef = useRef<Projectile[]>([])
  const asteroidsRef = useRef<Asteroid[]>([])
  const powerUpsRef = useRef<PowerUp[]>([])
  const particlesRef = useRef<ReturnType<typeof spawnExplosion>>([])
  const spawnerRef = useRef<Spawner | null>(null)
  const scoreRef = useRef(0)
  const keysRef = useRef(new Set<string>())
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [wave, setWave] = useState(1)
  const [powerUpActive, setPowerUpActive] = useState(false)
  const [powerUpName, setPowerUpName] = useState('')
  const [powerUpDuration, setPowerUpDuration] = useState(0)

  const initGame = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const w = canvas.width
    const h = canvas.height
    scoreRef.current = 0
    setScore(0)
    setLives(3)
    setWave(1)
    setPowerUpActive(false)
    setPowerUpName('')
    setPowerUpDuration(0)

    const ship = new Ship(w, h)
    ship.lives = 3
    shipRef.current = ship
    projectilesRef.current = []
    asteroidsRef.current = []
    powerUpsRef.current = []
    particlesRef.current = []
    if (!spawnerRef.current) spawnerRef.current = new Spawner()
    spawnerRef.current.reset()
    spawnerRef.current.wave = 1
    spawnerRef.current.powerUpTimer = 5

    asteroidsRef.current = (() => {
      const count = 3
      const asts: Asteroid[] = []
      for (let i = 0; i < count; i++) {
        asts.push(new Asteroid(
          Math.random() * (w - 100) + 50,
          Math.random() * (h - 100) + 50,
          'large'
        ))
      }
      return asts
    })()
  }, [])

  useEffect(() => {
    if (gameState === 'playing') {
      initGame()
    }
  }, [gameState, initGame])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      keysRef.current.add(e.code)
      if (e.code === 'KeyP') onPause()
    }
    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.code)
    }
    window.addEventListener('keydown', handleKey)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKey)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [onPause])

  const shoot = useCallback(() => {
    const ship = shipRef.current
    if (!ship || !ship.alive) return
    audio.playShoot()
    const [px, py] = ship.getProjectileSpawnPos()
    if (ship.isMultiShot) {
      projectilesRef.current.push(new Projectile(px, py, ship.angle - 0.2, 400))
      projectilesRef.current.push(new Projectile(px, py, ship.angle, 400))
      projectilesRef.current.push(new Projectile(px, py, ship.angle + 0.2, 400))
    } else {
      projectilesRef.current.push(new Projectile(px, py, ship.angle, 400))
    }
  }, [])

  useEffect(() => {
    let shootPressed = false
    const checkShoot = setInterval(() => {
      if (keysRef.current.has('Space') && !shootPressed && gameState === 'playing') {
        shootPressed = true
        shoot()
      }
      if (!keysRef.current.has('Space')) {
        shootPressed = false
      }
    }, 150)
    return () => clearInterval(checkShoot)
  }, [gameState, shoot])

  const handlePowerUpPickup = useCallback((type: PowerUpType) => {
    const ship = shipRef.current
    if (!ship) return

    switch (type) {
      case 'multiShot':
        audio.playPowerUp()
        ship.multiShotTimer = 8
        setPowerUpActive(true)
        setPowerUpName('MULTI-SHOT')
        setPowerUpDuration(8)
        break
      case 'teleport': {
        audio.playPowerUp()
        const canvas = canvasRef.current
        if (canvas) {
          ship.x = Math.random() * (canvas.width - 60) + 30
          ship.y = Math.random() * (canvas.height - 60) + 30
        }
        break
      }
      case 'shield':
        audio.playShield()
        ship.shieldTimer = 6
        setPowerUpActive(true)
        setPowerUpName('SHIELD')
        setPowerUpDuration(6)
        break
      case 'screenBomb': {
        audio.playBomb()
        const asts = [...asteroidsRef.current]
        asteroidsRef.current = []
        let extraScore = 0
        for (const a of asts) {
          extraScore += a.scoreValue
          particlesRef.current.push(...spawnExplosion(a.x, a.y, 25, 255, 136, 0))
        }
        scoreRef.current += extraScore
        setScore(scoreRef.current)
        break
      }
    }
  }, [])

  const update = useCallback((dt: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const w = canvas.width
    const h = canvas.height
    const ship = shipRef.current
    const spawner = spawnerRef.current
    if (!ship || !spawner) return

    if (keysRef.current.has('ArrowUp') || keysRef.current.has('KeyW')) {
      ship.thrust(dt)
      audio.playThrustStart()
    } else {
      audio.playThrustStop()
    }
    if (keysRef.current.has('ArrowLeft') || keysRef.current.has('KeyA')) ship.rotate(-1, dt)
    if (keysRef.current.has('ArrowRight') || keysRef.current.has('KeyD')) ship.rotate(1, dt)

    ship.update(dt, w, h)

    for (const p of projectilesRef.current) p.update(dt, w, h)
    for (const a of asteroidsRef.current) a.update(dt, w, h)
    for (const pu of powerUpsRef.current) pu.update(dt, w, h)
    for (const p of particlesRef.current) p.update(dt, w, h)

    projectilesRef.current = projectilesRef.current.filter(p => p.alive)
    asteroidsRef.current = asteroidsRef.current.filter(a => a.alive)
    powerUpsRef.current = powerUpsRef.current.filter(pu => pu.alive)
    particlesRef.current = particlesRef.current.filter(p => p.alive)

    for (const p of projectilesRef.current) {
      for (const a of asteroidsRef.current) {
        if (!p.alive || !a.alive) continue
        if (circlesCollide(p.x, p.y, p.radius, a.x, a.y, a.radius)) {
          p.alive = false
          a.alive = false
          audio.playExplosion()
          scoreRef.current += a.scoreValue
          setScore(scoreRef.current)
          particlesRef.current.push(...spawnExplosion(a.x, a.y, 25, 200, 200, 255))
          const splits = splitAsteroid(a)
          asteroidsRef.current.push(...splits)
        }
      }
    }

    if (!ship.hasShield && !ship.invulnerable) {
      for (const a of asteroidsRef.current) {
        if (!a.alive) continue
        if (circlesCollide(ship.x, ship.y, ship.radius, a.x, a.y, a.radius)) {
          ship.lives--
          setLives(ship.lives)
          if (ship.lives <= 0) {
            audio.playGameOver()
            particlesRef.current.push(...spawnExplosion(ship.x, ship.y, 40, 0, 204, 255))
            ship.alive = false
            onGameOver(scoreRef.current)
          } else {
            audio.playExplosion()
            particlesRef.current.push(...spawnExplosion(ship.x, ship.y, 30, 255, 200, 50))
            ship.invulnerable = true
            ship.invulnTimer = 2
            onLifeLost()
          }
          a.alive = false
          const splits = splitAsteroid(a)
          asteroidsRef.current.push(...splits)
        }
      }
    }

    for (const pu of powerUpsRef.current) {
      if (!pu.alive) continue
      if (circlesCollide(ship.x, ship.y, ship.radius + 8, pu.x, pu.y, pu.radius)) {
        pu.alive = false
        handlePowerUpPickup(pu.type)
      }
    }

    spawner.update(dt, asteroidsRef.current, powerUpsRef.current, w, h,
      (newAsts) => {
        asteroidsRef.current.push(...newAsts)
        setWave(spawner.wave)
      },
      (newPU) => {
        powerUpsRef.current.push(newPU)
      }
    )

    if (ship.multiShotTimer <= 0 && ship.shieldTimer <= 0) {
      setPowerUpActive(false)
      setPowerUpName('')
      setPowerUpDuration(0)
    } else {
      const dur = Math.max(ship.multiShotTimer, ship.shieldTimer)
      setPowerUpDuration(dur)
    }
  }, [onGameOver, onLifeLost, handlePowerUpPickup])

  const render = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const w = canvas.width
    const h = canvas.height

    const gradient = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.7)
    gradient.addColorStop(0, '#1a1a4e')
    gradient.addColorStop(0.5, '#0d0d3d')
    gradient.addColorStop(1, '#0a0a2e')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, w, h)

    for (const a of asteroidsRef.current) a.render(ctx)
    for (const p of projectilesRef.current) p.render(ctx)
    for (const pu of powerUpsRef.current) pu.render(ctx)
    for (const p of particlesRef.current) p.render(ctx)
    if (shipRef.current?.alive) shipRef.current.render(ctx)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  useGameLoop((dt) => {
    update(dt)
    render()
  }, gameState === 'playing' || gameState === 'lifeLost')

  return (
    <div className="absolute inset-0">
      <canvas ref={canvasRef} className="block w-full h-full" />
      <HUD
        score={score}
        lives={lives}
        wave={wave}
        powerUpActive={powerUpActive}
        powerUpName={powerUpName}
        powerUpDuration={powerUpDuration}
      />
    </div>
  )
}
