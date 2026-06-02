interface StartScreenProps {
  onStart: () => void
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a2e] cursor-pointer select-none"
      onClick={onStart}
      tabIndex={0}
      onKeyDown={(e) => { if (e.code === 'Enter') onStart() }}
    >
      <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-cyan-400 to-blue-600 font-mono tracking-widest mb-8">
        ASTEROIDS
      </h1>
      <p className="text-cyan-300 text-lg font-mono animate-pulse mb-12">
        PRESS ENTER TO START
      </p>
      <div className="text-white/40 font-mono text-sm text-center leading-relaxed">
        <p>Arrow/WASD: Move &bull; Space: Shoot &bull; P: Pause</p>
      </div>
    </div>
  )
}
