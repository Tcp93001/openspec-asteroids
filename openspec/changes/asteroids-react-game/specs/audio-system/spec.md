## ADDED Requirements

### Requirement: AudioContext initializes on first user interaction
The AudioContext SHALL be created on the first keyboard interaction (not on page load) to comply with browser autoplay policies.

#### Scenario: Deferred context creation
- **WHEN** user presses any key for the first time
- **THEN** AudioContext SHALL be created and resumed

### Requirement: Procedural sound effects via Web Audio API
All sounds SHALL be generated using oscillators, noise buffers, and gain nodes. No audio files SHALL be used.

#### Scenario: Shoot sound
- **WHEN** player fires a projectile
- **THEN** a short high-pitched blip SHALL play

#### Scenario: Explosion sound
- **WHEN** an asteroid is destroyed
- **THEN** a noise burst with decay envelope SHALL play

#### Scenario: Thrust sound
- **WHEN** thrust key is held
- **THEN** a low-frequency oscillator SHALL play (continuous while thrusting)

#### Scenario: Thrust sound stops
- **WHEN** thrust key is released
- **THEN** the thrust oscillator SHALL stop

#### Scenario: Power-up pickup sound
- **WHEN** a power-up is collected
- **THEN** an ascending tone SHALL play

#### Scenario: Shield activate sound
- **WHEN** Shield power-up is collected
- **THEN** a resonant frequency sweep SHALL play

#### Scenario: Screen Bomb sound
- **WHEN** Screen Bomb is collected
- **THEN** a low rumble followed by an explosion SHALL play

#### Scenario: Game Over sound
- **WHEN** game transitions to Game Over state
- **THEN** a descending tone sequence SHALL play
