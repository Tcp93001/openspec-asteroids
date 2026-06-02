import { createAsteroidWave, PowerUp, type Asteroid, type PowerUpType } from './entities'

export class Spawner {
  wave = 1
  waveTimer = 0
  waveDelay = 2
  waitingForNextWave = false
  powerUpTimer = 0
  powerUpDelay = 15
  powerUpTypes: PowerUpType[] = ['multiShot', 'teleport', 'shield', 'screenBomb']

  update(dt: number, asteroids: Asteroid[], powerUps: PowerUp[],
    canvasW: number, canvasH: number,
    onNewWave: (asteroids: Asteroid[]) => void,
    onPowerUp: (pu: PowerUp) => void
  ) {
    if (asteroids.length === 0 && !this.waitingForNextWave) {
      this.waitingForNextWave = true
      this.waveTimer = this.waveDelay
    }

    if (this.waitingForNextWave) {
      this.waveTimer -= dt
      if (this.waveTimer <= 0) {
        this.waitingForNextWave = false
        this.wave++
        onNewWave(createAsteroidWave(canvasW, canvasH, this.wave))
      }
    }

    this.powerUpTimer += dt
    if (this.powerUpTimer >= this.powerUpDelay && powerUps.length < 3) {
      this.powerUpTimer = 0
      this.powerUpDelay = 10 + Math.random() * 10
      const type = this.powerUpTypes[Math.floor(Math.random() * this.powerUpTypes.length)]
      onPowerUp(new PowerUp(
        Math.random() * (canvasW - 60) + 30,
        -20,
        type
      ))
    }
  }

  reset() {
    this.wave = 1
    this.waveTimer = 0
    this.waitingForNextWave = false
    this.powerUpTimer = 0
    this.powerUpDelay = 15
  }
}
