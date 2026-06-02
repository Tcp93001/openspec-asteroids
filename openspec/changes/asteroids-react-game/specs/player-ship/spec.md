## ADDED Requirements

### Requirement: Ship responds to keyboard input
The ship SHALL rotate left/right with ArrowLeft/ArrowRight or A/D keys. The ship SHALL thrust forward with ArrowUp or W key. The ship SHALL fire projectiles with Spacebar.

#### Scenario: Ship rotates left
- **WHEN** ArrowLeft key is held
- **THEN** ship angle SHALL decrease each frame

#### Scenario: Ship thrusts forward
- **WHEN** ArrowUp key is held
- **THEN** ship SHALL accelerate in the direction it faces

#### Scenario: Ship fires projectile
- **WHEN** Spacebar is pressed
- **THEN** a projectile SHALL spawn at the ship's nose traveling in the ship's facing direction

### Requirement: Ship has 3 lives
The ship SHALL start with 3 lives. Upon collision with an asteroid, the ship SHALL lose one life and enter invulnerability state for 2 seconds.

#### Scenario: Life lost on asteroid collision
- **WHEN** ship collides with an asteroid and has > 0 lives
- **THEN** lives SHALL decrement by 1 and ship SHALL blink for 2 seconds

#### Scenario: All lives lost triggers game over
- **WHEN** ship collides with an asteroid and lives = 0
- **THEN** game SHALL transition to Game Over state

### Requirement: Ship invulnerability blinking
During invulnerability (2s after life lost), the ship SHALL blink (alternate between visible and invisible) and be immune to asteroid collisions.

#### Scenario: Blinking effect
- **WHEN** ship is in invulnerability state
- **THEN** ship visibility SHALL toggle every ~100ms

#### Scenario: Collision immunity
- **WHEN** ship is in invulnerability state
- **THEN** asteroid collisions SHALL be ignored

### Requirement: Thruster flame visual
When thrusting, a flame effect SHALL render at the ship's rear.

#### Scenario: Flame on thrust
- **WHEN** thrust key is held
- **THEN** a flickering orange/yellow flame SHALL appear behind the ship
