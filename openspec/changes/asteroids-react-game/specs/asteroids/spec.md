## ADDED Requirements

### Requirement: Asteroids spawn in timed waves
Asteroids SHALL spawn in waves. Each wave SHALL have more asteroids than the previous. Waves SHALL be separated by a fixed time interval.

#### Scenario: First wave
- **WHEN** game enters Playing state
- **THEN** 4 large asteroids SHALL spawn at random positions away from the ship

#### Scenario: Subsequent waves
- **WHEN** all asteroids from the current wave are destroyed
- **THEN** a new wave SHALL spawn with +1 asteroid over the previous wave

### Requirement: Asteroids split on destruction
Large asteroids SHALL break into 2-3 medium asteroids when destroyed. Medium asteroids SHALL break into 2-3 small asteroids. Small asteroids SHALL be destroyed completely.

#### Scenario: Large asteroid destroyed
- **WHEN** a large asteroid is hit by a projectile
- **THEN** it SHALL be removed and 2-3 medium asteroids SHALL spawn at its position

#### Scenario: Small asteroid destroyed
- **WHEN** a small asteroid is hit by a projectile
- **THEN** it SHALL be removed with no further splits

### Requirement: Asteroids have irregular shapes and rotation
Each asteroid SHALL render as an irregular polygon (random vertex offsets from a circle). Each asteroid SHALL rotate at a random angular velocity.

#### Scenario: Random shape
- **WHEN** an asteroid is rendered
- **THEN** it SHALL appear as an irregular polygon, not a perfect circle

#### Scenario: Continuous rotation
- **WHEN** the game updates each frame
- **THEN** each asteroid SHALL increment its rotation angle

### Requirement: Scoring by asteroid size
Destroying asteroids SHALL award points: large = 20, medium = 50, small = 100.

#### Scenario: Score awarded on destruction
- **WHEN** a small asteroid is destroyed
- **THEN** 100 points SHALL be added to the score
