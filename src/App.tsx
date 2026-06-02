import { useState, useCallback } from 'react'
import type { GameStateType } from './game/engine'
import { GameCanvas } from './components/GameCanvas'
import { StartScreen } from './components/StartScreen'
import { PauseOverlay } from './components/PauseOverlay'
import { GameOverOverlay } from './components/GameOverOverlay'

export default function App() {
  const [gameState, setGameState] = useState<GameStateType>('start')
  const [score, setScore] = useState(0)

  const handleStart = useCallback(() => {
    setGameState('playing')
  }, [])

  const handlePause = useCallback(() => {
    setGameState(prev => prev === 'playing' ? 'paused' : 'playing')
  }, [])

  const handleGameOver = useCallback((finalScore: number) => {
    setScore(finalScore)
    setGameState('gameover')
  }, [])

  const handleRestart = useCallback(() => {
    setGameState('start')
    setScore(0)
  }, [])

  const handleLifeLost = useCallback(() => {
    setGameState('lifeLost')
    setTimeout(() => setGameState('playing'), 2000)
  }, [])

  return (
    <div className="w-full h-full relative bg-[#0a0a2e] overflow-hidden">
      {gameState === 'start' && (
        <StartScreen onStart={handleStart} />
      )}

      {gameState !== 'start' && (
        <GameCanvas
          gameState={gameState}
          onPause={handlePause}
          onGameOver={handleGameOver}
          onLifeLost={handleLifeLost}
        />
      )}

      {gameState === 'gameover' && (
        <GameOverOverlay score={score} onRestart={handleRestart} />
      )}

      {gameState === 'paused' && (
        <PauseOverlay />
      )}
    </div>
  )
}
