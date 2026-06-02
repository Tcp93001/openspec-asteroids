let ctx: AudioContext | null = null

function getCtx(): AudioContext {
  if (!ctx) {
    ctx = new AudioContext()
  }
  if (ctx.state === 'suspended') {
    ctx.resume()
  }
  return ctx
}

function playTone(freq: number, duration: number, type: OscillatorType = 'square', volume = 0.15) {
  const c = getCtx()
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.type = type
  osc.frequency.value = freq
  gain.gain.setValueAtTime(volume, c.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration)
  osc.connect(gain)
  gain.connect(c.destination)
  osc.start()
  osc.stop(c.currentTime + duration)
}

function playNoise(duration: number, volume = 0.1) {
  const c = getCtx()
  const bufferSize = c.sampleRate * duration
  const buffer = c.createBuffer(1, bufferSize, c.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2)
  }
  const source = c.createBufferSource()
  source.buffer = buffer
  const gain = c.createGain()
  gain.gain.setValueAtTime(volume, c.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration)
  source.connect(gain)
  gain.connect(c.destination)
  source.start()
}

let thrustOsc: OscillatorNode | null = null
let thrustGain: GainNode | null = null

export function playShoot() {
  playTone(880, 0.08, 'square', 0.08)
}

export function playExplosion() {
  playNoise(0.3, 0.12)
  playTone(80, 0.2, 'sawtooth', 0.08)
}

export function playThrustStart() {
  if (thrustOsc) return
  const c = getCtx()
  thrustGain = c.createGain()
  thrustGain.gain.value = 0.03
  thrustOsc = c.createOscillator()
  thrustOsc.type = 'sawtooth'
  thrustOsc.frequency.value = 60
  thrustOsc.connect(thrustGain)
  thrustGain.connect(c.destination)
  thrustOsc.start()
}

export function playThrustStop() {
  if (thrustOsc) {
    thrustOsc.stop()
    thrustOsc.disconnect()
    thrustOsc = null
  }
  if (thrustGain) {
    thrustGain.disconnect()
    thrustGain = null
  }
}

export function playPowerUp() {
  const c = getCtx()
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(400, c.currentTime)
  osc.frequency.linearRampToValueAtTime(800, c.currentTime + 0.2)
  gain.gain.setValueAtTime(0.15, c.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.3)
  osc.connect(gain)
  gain.connect(c.destination)
  osc.start()
  osc.stop(c.currentTime + 0.3)
}

export function playShield() {
  const c = getCtx()
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(200, c.currentTime)
  osc.frequency.linearRampToValueAtTime(600, c.currentTime + 0.3)
  gain.gain.setValueAtTime(0.12, c.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.4)
  osc.connect(gain)
  gain.connect(c.destination)
  osc.start()
  osc.stop(c.currentTime + 0.4)

  const osc2 = c.createOscillator()
  const gain2 = c.createGain()
  osc2.type = 'triangle'
  osc2.frequency.setValueAtTime(400, c.currentTime)
  osc2.frequency.linearRampToValueAtTime(1000, c.currentTime + 0.2)
  gain2.gain.setValueAtTime(0.06, c.currentTime)
  gain2.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.3)
  osc2.connect(gain2)
  gain2.connect(c.destination)
  osc2.start()
  osc2.stop(c.currentTime + 0.3)
}

export function playBomb() {
  playNoise(0.5, 0.2)
  const c = getCtx()
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(40, c.currentTime)
  osc.frequency.linearRampToValueAtTime(20, c.currentTime + 0.5)
  gain.gain.setValueAtTime(0.2, c.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.5)
  osc.connect(gain)
  gain.connect(c.destination)
  osc.start()
  osc.stop(c.currentTime + 0.5)
}

export function playGameOver() {
  const notes = [400, 350, 300, 200]
  notes.forEach((freq, i) => {
    setTimeout(() => playTone(freq, 0.3, 'square', 0.1), i * 250)
  })
}
