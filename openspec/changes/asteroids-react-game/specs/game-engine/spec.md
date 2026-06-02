## ADDED Requirements

### Requirement: Game loop runs at 60fps via requestAnimationFrame
The engine SHALL use requestAnimationFrame for the main game loop. Each frame SHALL compute delta-time and call update(dt) then render(ctx).

#### Scenario: Steady frame rate
- **WHEN** the game is in Playing state
- **THEN** requestAnimationFrame callback fires each frame

#### Scenario: Delta-time normalization
- **WHEN** frame rate drops below 60fps
- **THEN** entity movement SHALL be scaled by dt to maintain consistent speed

### Requirement: Canvas rendering pipeline
The engine SHALL render all entities (ship, asteroids, projectiles, particles, power-ups) onto a single HTML5 Canvas 2D context each frame.

#### Scenario: Full redraw each frame
- **WHEN** render(ctx) is called
- **THEN** canvas SHALL be cleared then all entities drawn in order

### Requirement: Screen wrapping
Entities that move beyond any screen edge SHALL appear on the opposite edge.

#### Scenario: Ship wraps horizontally
- **WHEN** ship position.x > canvas.width
- **THEN** ship position.x SHALL be set to 0

#### Scenario: Asteroid wraps vertically
- **WHEN** asteroid position.y < 0
- **THEN** asteroid position.y SHALL be set to canvas.height
