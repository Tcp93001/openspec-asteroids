import { useEffect, useState, useRef } from 'react'

interface GameOverOverlayProps {
  score: number
  onRestart: () => void
}

interface ScoreEntry {
  score: number
  date: string
}

const STORAGE_KEY = 'asteroids-high-scores'

function loadHighScores(): ScoreEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveHighScores(scores: ScoreEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scores))
}

function addHighScore(score: number): ScoreEntry[] {
  const scores = loadHighScores()
  scores.push({ score, date: new Date().toISOString() })
  scores.sort((a, b) => b.score - a.score)
  const top5 = scores.slice(0, 5)
  saveHighScores(top5)
  return top5
}

export function GameOverOverlay({ score, onRestart }: GameOverOverlayProps) {
  const [visible, setVisible] = useState(false)
  const highScores = useRef<ScoreEntry[]>([])

  useEffect(() => {
    highScores.current = addHighScore(score)
    const t = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(t)
  }, [score])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Enter') onRestart()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onRestart])

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-20 select-none">
      <h1
        className={`text-5xl font-bold text-red-500 font-mono tracking-widest mb-6 transition-all duration-1000 ${
          visible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        }`}
      >
        GAME OVER
      </h1>
      <p className="text-white font-mono text-2xl mb-8">
        SCORE: {score}
      </p>
      <div className="text-white/60 font-mono text-sm mb-8">
        <p className="text-center text-white/80 mb-2">HIGH SCORES</p>
        {highScores.current.length === 0 ? (
          <p className="text-center">No scores yet</p>
        ) : (
          highScores.current.map((entry, i) => (
            <p key={i} className="text-center">
              {i + 1}. {entry.score}
            </p>
          ))
        )}
      </div>
      <p className="text-cyan-300 font-mono text-lg animate-pulse">
        PRESS ENTER TO RESTART
      </p>
    </div>
  )
}
