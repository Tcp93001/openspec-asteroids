# Asteroids React Game

Create a modern Asteroids-like arcade game using React 19, TypeScript, TailwindCSS, and Vite.

## Technical Stack
- React 19 with TypeScript
- TailwindCSS for UI chrome (menus, HUD, game over screen)
- Vite as build tool
- HTML5 Canvas (via React refs) for game rendering
- Web Audio API for sound effects (no external audio libraries)
- No game engine libraries — implement game loop with requestAnimationFrame

## Game Mechanics
- Classic Asteroids: player ship, floating asteroids, projectiles
- Asteroids spawn in timed waves with increasing difficulty
- Large asteroids break into 2-3 medium ones on destruction, medium break into 2-3 small ones
- Ship has 3 lives (hearts displayed on HUD)
- Wrap-around at screen edges for ship, projectiles, and asteroids
- Score tracking displayed on HUD
- High scores: top 5 scores persisted in localStorage, shown on game over screen

## Controls
- Arrow keys / WASD: thrust and rotate ship
- Spacebar: shoot
- P: pause/resume
- Responsive: game canvas fills available space, controls work on desktop

## Power-Ups (4 types, spawn periodically by timer only)
1. **Multi-Shot**: Ship fires 3 projectiles in a spread pattern for 8 seconds
2. **Teleport**: Instantly moves ship to a random position on screen (consumed on use, auto-activates on pickup)
3. **Shield**: Ship is invulnerable to asteroid collisions for 6 seconds (visual shield aura shown)
4. **Screen Bomb**: Destroys all asteroids currently on screen (consumed on use, auto-activates)

Power-ups spawn periodically via timer. Each power-up has a distinctive color and pulsing glow effect.

## Visual & Effects
- **Background**: Dark blue radial gradient (#0a0a2e → #1a1a4e → #0d0d3d)
- **Ship**: Glowing neon-style triangle with thruster flame effect during thrust
- **Asteroids**: Irregular polygon shapes with rough edges, slight rotation
- **Projectiles**: Bright glowing trails
- **Explosions**: Particle burst effect (20-40 particles per explosion) with color fading and size shrinking over ~500ms
- **Power-up pickups**: Pulsing glow effect with distinctive colors per type
- **Shield**: Semi-transparent circular aura around ship

## UI / HUD
- Top-left: Score display
- Top-right: Lives (heart icons)
- Center-top: Wave/level indicator
- Power-up timer bar shown when active

## Sound (Web Audio API, procedural generation — no audio files)
- Thrust engine: low-frequency oscillator (on/off)
- Shoot: short high-pitched blip
- Explosion: noise burst with decay
- Power-up pickup: ascending tone
- Shield activate: resonant sweep
- Screen bomb: low rumble + explosion
- Game over: descending tone sequence

## Game States & Flow
1. **Start Screen**: Title "ASTEROIDS", "Press ENTER to start", controls hint
2. **Playing**: Active game loop
3. **Paused**: Overlay with "PAUSED" text, blur background
4. **Life Lost**: Brief invulnerability period (2s), ship blinking, respawn at center
5. **Game Over**: Full-screen animated overlay — "GAME OVER" text scales up with fade-in, final score + high scores displayed, "Press ENTER to restart"

## Project Structure
```
asteroids-game/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── components/
│   │   ├── GameCanvas.tsx
│   │   ├── HUD.tsx
│   │   ├── StartScreen.tsx
│   │   ├── PauseOverlay.tsx
│   │   └── GameOverOverlay.tsx
│   ├── game/
│   │   ├── engine.ts
│   │   ├── entities.ts
│   │   ├── physics.ts
│   │   ├── spawner.ts
│   │   ├── particles.ts
│   │   └── powerups.ts
│   ├── audio/
│   │   └── synth.ts
│   └── hooks/
│       └── useGameLoop.ts
```

## Acceptance Criteria
- `npm install && npm run dev` starts the game
- `npm run build` produces optimized build in `dist/`
- All game states work (start, play, pause, game over, restart)
- 4 power-up types function correctly
- Audio plays on supported browsers
- Explosion particle effects render smoothly
- Game over animation plays when all lives lost
- High scores persist across sessions via localStorage
- No external game libraries or audio files used
- Published to GitHub repo configured in project root
