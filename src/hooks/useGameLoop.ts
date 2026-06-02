import { useEffect, useRef } from 'react'

export function useGameLoop(
  callback: (dt: number) => void,
  running: boolean
) {
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  useEffect(() => {
    if (!running) return
    let lastTime = performance.now()
    let animId: number

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05)
      lastTime = now
      callbackRef.current(dt)
      animId = requestAnimationFrame(tick)
    }

    animId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animId)
  }, [running])
}
