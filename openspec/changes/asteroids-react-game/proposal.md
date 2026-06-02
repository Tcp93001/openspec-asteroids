## Why

Build a modern Asteroids arcade game to demonstrate React 19 + Canvas + Web Audio API capabilities. This serves as both a portfolio piece and a reusable game template. The project brings a classic arcade experience up to date with particle effects, procedural audio, power-ups, and polished UI — all without external game libraries.

## What Changes

- Create a complete Asteroids game from scratch in the repo root
- React 19 + TypeScript + Vite + TailwindCSS project setup
- HTML5 Canvas game loop with requestAnimationFrame (no game engine)
- Procedural Web Audio API sound synthesis (no audio files)
- 4 power-up types: Multi-Shot, Teleport, Shield, Screen Bomb
- Particle-based explosion effects
- 5 game states: Start, Playing, Paused, Life Lost, Game Over
- High score persistence via localStorage
- All source code under `src/` with clear separation (components/, game/, audio/, hooks/)

## Capabilities

### New Capabilities
- `game-engine`: Core game loop, Canvas rendering pipeline, requestAnimationFrame timing, entity update/render cycle
- `player-ship`: Ship movement (thrust/rotation via keyboard), shooting, lives, invulnerability blinking, thruster flame effect
- `asteroids`: Asteroid spawning in timed waves, irregular polygon rendering, rotation, splitting on destruction, increasing difficulty
- `power-ups`: 4 power-up types with timer-based spawning, pickup mechanics, timed effects, visual glow indicators
- `audio-system`: Web Audio API procedural sound synthesis for all game events (thrust, shoot, explosion, pickup, bomb, game over)
- `ui-hud`: Score display, lives (hearts), wave indicator, power-up timer bar
- `game-states`: State machine with Start, Playing, Paused, Life Lost, Game Over — each with transition logic and UI
- `high-scores`: localStorage persistence of top 5 scores, display on game over screen

### Modified Capabilities
- None (new project, no existing capabilities)

## Impact

- New project created in repo root (no existing code affected)
- Dependencies: React 19, TypeScript, TailwindCSS, Vite
- No external game or audio libraries
- CI: standard `npm install && npm run build` for deployment
