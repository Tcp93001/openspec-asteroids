## Context

New React 19 project in the repo root. The game runs entirely client-side using HTML5 Canvas for rendering and Web Audio API for sound. No backend, no server state, no external game libraries. The existing repo contains `.opencode/` and `openspec/` directories; game source will coexist at root level.

## Goals / Non-Goals

**Goals:**
- Functional Asteroids game with all 5 game states
- 4 working power-ups with visual and audio feedback
- Procedural audio (no audio files)
- Particle explosion effects
- High score persistence
- Buildable with `npm run build`

**Non-Goals:**
- Multiplayer or online features
- Touch/mobile controls (desktop keyboard only)
- External game engine or audio libraries
- Backend or database

## Decisions

1. **Canvas rendering over DOM elements**: The game world (ship, asteroids, particles, projectiles) renders on a single `<canvas>` element. TailwindCSS handles only UI chrome (HUD, overlays). Rationale: Canvas provides the per-frame control needed for 60fps arcade rendering; DOM manipulation at this rate would be slower and more complex.

2. **Game loop via custom hook (`useGameLoop`)**: Central `requestAnimationFrame` loop in `useGameLoop.ts` calls `update(dt)` and `render(ctx)` on the engine each frame. Rationale: Keeps React lifecycle separate from the game tick; avoids re-renders on every frame.

3. **Entity system over ECS**: Simple classes (`Ship`, `Asteroid`, `Projectile`, `PowerUp`, `Particle`) with `update()` and `render(ctx)` methods. Rationale: For this scope, a full ECS is overkill. Plain classes are easier to reason about and refactor.

4. **State machine for game states**: `GameState` enum with explicit transitions (Start → Playing → Paused → Playing / LifeLost → Playing / GameOver → Start). Rationale: Prevents invalid transitions and centralizes state logic.

5. **Web Audio API with `AudioContext`**: All sounds generated procedurally using oscillators, noise buffers, and gain envelopes. No `Audio` elements or files. Rationale: Zero external assets, smaller bundle, full control over synthesis.

6. **localStorage for high scores**: Simple JSON serialization of top 5 scores. Rationale: No backend needed, sufficient for a single-player game.

7. **`asteroids-game/` prefix in source**: All game code under `src/` at root level. Rationale: Keeps project root clean alongside `.opencode/` and `openspec/`.

## Risks / Trade-offs

- [Canvas + React integration] → Mitigation: Canvas ref managed in `GameCanvas.tsx`; React only mounts/unmounts the loop. No React state updates per frame.
- [Procedural audio browser compatibility] → Mitigation: `AudioContext` creation on first user interaction (click/keypress) to comply with autoplay policies.
- [requestAnimationFrame timing drift] → Mitigation: Use delta-time (`dt`) based updates, not frame counting.
