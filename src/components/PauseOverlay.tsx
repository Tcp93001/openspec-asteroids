import { useEffect } from 'react'

export function PauseOverlay() {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'KeyP') {
        e.stopPropagation()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-10 select-none">
      <p className="text-4xl font-mono text-white font-bold tracking-widest">
        PAUSED
      </p>
    </div>
  )
}
