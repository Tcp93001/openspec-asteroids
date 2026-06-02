## ADDED Requirements

### Requirement: Power-ups spawn periodically by timer
A power-up SHALL spawn every 15-20 seconds at a random position on screen. The type SHALL be chosen randomly from the 4 available types.

#### Scenario: Timer spawn
- **WHEN** 15-20 seconds have elapsed since last power-up spawn
- **THEN** a new power-up SHALL appear at a random position

### Requirement: Multi-Shot power-up
When picked up, the ship SHALL fire 3 projectiles in a spread pattern (fan of ~15 degrees) for 8 seconds. Visual indicator SHALL show on HUD.

#### Scenario: Multi-shot active
- **WHEN** player picks up Multi-Shot
- **THEN** each spacebar press SHALL fire 3 projectiles at spread angles for 8 seconds

### Requirement: Teleport power-up
When picked up, the ship SHALL instantly move to a random position on screen. Consumed instantly on pickup.

#### Scenario: Teleport activates
- **WHEN** player picks up Teleport
- **THEN** ship SHALL immediately move to a random (x, y) position on screen

### Requirement: Shield power-up
When picked up, the ship SHALL be invulnerable to all asteroid collisions for 6 seconds. A semi-transparent circular aura SHALL render around the ship.

#### Scenario: Shield active
- **WHEN** player picks up Shield
- **THEN** ship SHALL ignore asteroid collisions for 6 seconds and display a shield aura

### Requirement: Screen Bomb power-up
When picked up, all asteroids currently on screen SHALL be destroyed instantly. Points SHALL be awarded as if each asteroid was destroyed normally.

#### Scenario: Bomb detonates
- **WHEN** player picks up Screen Bomb
- **THEN** all asteroids on screen SHALL be destroyed simultaneously with explosion effects

### Requirement: Power-up visual indicators
Each power-up SHALL render as a floating icon with a distinctive color and pulsing glow effect.

#### Scenario: Power-up visibility
- **WHEN** a power-up is on screen
- **THEN** it SHALL pulse with a glow effect and be clearly distinguishable by color per type
