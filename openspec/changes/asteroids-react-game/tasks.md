## 1. Project Setup

- [x] 1.1 Initialize Vite + React 19 + TypeScript project
- [x] 1.2 Configure TailwindCSS and PostCSS
- [x] 1.3 Create directory structure (components/, game/, audio/, hooks/)
- [x] 1.4 Configure tsconfig.json with strict mode
- [x] 1.5 Verify `npm run dev` and `npm run build` work

## 2. Game Engine Core

- [x] 2.1 Implement Canvas component with ref (GameCanvas.tsx)
- [x] 2.2 Create useGameLoop hook with requestAnimationFrame + delta-time
- [x] 2.3 Implement entity base class with update/render interface
- [x] 2.4 Implement screen edge wrapping utility
- [x] 2.5 Wire engine into App.tsx with canvas rendering

## 3. Player Ship

- [x] 3.1 Create Ship entity class (position, angle, velocity, thrust)
- [x] 3.2 Implement keyboard input handling (rotate, thrust, shoot)
- [x] 3.3 Implement projectile spawning and lifecycle
- [x] 3.4 Render ship as neon-style triangle with rotation
- [x] 3.5 Add thruster flame particle effect during thrust
- [x] 3.6 Implement 3-life system with invulnerability blinking

## 4. Asteroids

- [x] 4.1 Create Asteroid entity class with irregular polygon generation
- [x] 4.2 Implement asteroid rotation per frame
- [x] 4.3 Implement asteroid splitting on destruction (large→medium→small)
- [x] 4.4 Implement wave spawning system with increasing difficulty
- [x] 4.5 Implement collision detection (ship-asteroid, projectile-asteroid)
- [x] 4.6 Implement scoring by asteroid size (20/50/100)

## 5. Explosion Particles

- [x] 5.1 Create Particle entity class (position, velocity, color, alpha, size)
- [x] 5.2 Implement particle burst on asteroid destruction (20-40 particles)
- [x] 5.3 Implement color fading and size shrinking over ~500ms
- [x] 5.4 Implement particle cleanup after expiry

## 6. Power-Ups

- [x] 6.1 Create PowerUp entity class with type enum and timer-based spawning
- [x] 6.2 Implement Multi-Shot (3 projectiles spread for 8s)
- [x] 6.3 Implement Teleport (instant random reposition)
- [x] 6.4 Implement Shield (invulnerability + aura for 6s)
- [x] 6.5 Implement Screen Bomb (destroy all asteroids)
- [x] 6.6 Render power-ups with pulsing glow effect, distinctive colors per type

## 7. Audio System

- [x] 7.1 Create synth.ts with deferred AudioContext initialization
- [x] 7.2 Implement shoot sound (short high-pitched blip)
- [x] 7.3 Implement explosion sound (noise burst with decay)
- [x] 7.4 Implement thrust sound (continuous low oscillator, on/off)
- [x] 7.5 Implement power-up pickup sound (ascending tone)
- [x] 7.6 Implement shield activate sound (resonant sweep)
- [x] 7.7 Implement screen bomb sound (low rumble + explosion)
- [x] 7.8 Implement game over sound (descending tone sequence)

## 8. UI / HUD

- [x] 8.1 Create HUD component with score, lives, wave, power-up timer
- [x] 8.2 Render score at top-left
- [x] 8.3 Render lives as heart icons at top-right
- [x] 8.4 Render wave indicator at center-top
- [x] 8.5 Render active power-up timer bar

## 9. Game States

- [x] 9.1 Implement Start Screen component (title, ENTER prompt, controls hint)
- [x] 9.2 Implement Playing state with full game loop
- [x] 9.3 Implement Pause overlay component (PAUSED text + blur)
- [x] 9.4 Implement Life Lost state (2s invulnerability, center respawn)
- [x] 9.5 Implement Game Over overlay with animated text scale + fade-in
- [x] 9.6 Wire state machine with transitions between all states

## 10. High Scores

- [x] 10.1 Implement localStorage read/write for top 5 scores
- [x] 10.2 Save score on game over if qualifies
- [x] 10.3 Display high scores on game over screen
- [x] 10.4 Handle empty state ("No scores yet")

## 11. Visual Polish

- [x] 11.1 Set dark blue radial gradient background (#0a0a2e → #1a1a4e → #0d0d3d)
- [x] 11.2 Add glowing trail effect to projectiles
- [x] 11.3 Add shield aura visual (semi-transparent circle)
- [x] 11.4 Ensure responsive canvas sizing

## 12. Final Verification

- [x] 12.1 Run `npm run build` and verify no TypeScript errors
- [ ] 12.2 Test all game states: start, play, pause, life lost, game over, restart
- [ ] 12.3 Test all 4 power-ups function correctly
- [ ] 12.4 Test high score persistence across page refresh
- [ ] 12.5 Test audio plays on supported browsers
- [x] 12.6 Commit and push to GitHub repo
