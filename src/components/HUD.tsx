interface HUDProps {
  score: number
  lives: number
  wave: number
  powerUpActive: boolean
  powerUpName: string
  powerUpDuration: number
}

export function HUD({ score, lives, wave, powerUpActive, powerUpName, powerUpDuration }: HUDProps) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-4 left-4 text-white font-mono text-xl">
        SCORE: {score}
      </div>
      <div className="absolute top-4 right-4 text-white font-mono text-xl flex gap-1">
        {Array.from({ length: lives }, (_, i) => (
          <span key={i} className="text-red-500">♥</span>
        ))}
      </div>
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 font-mono text-sm">
        WAVE {wave}
      </div>
      {powerUpActive && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
          <div className="text-cyan-400 font-mono text-sm text-center mb-1">{powerUpName}</div>
          <div className="w-32 h-2 bg-white/10 rounded overflow-hidden">
            <div
              className="h-full bg-cyan-400 transition-all duration-100 rounded"
              style={{ width: `${(powerUpDuration / 8) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
