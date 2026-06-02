## ADDED Requirements

### Requirement: Score display
The current score SHALL be displayed at the top-left of the screen.

#### Scenario: Score updates in real-time
- **WHEN** the score changes
- **THEN** the displayed score SHALL update immediately

### Requirement: Lives display
The remaining lives SHALL be displayed as heart icons at the top-right of the screen.

#### Scenario: Lives decrement
- **WHEN** the ship loses a life
- **THEN** the number of heart icons SHALL reduce by one

### Requirement: Wave indicator
The current wave number SHALL be displayed at the center-top of the screen.

#### Scenario: Wave display
- **WHEN** a new wave begins
- **THEN** the wave number SHALL update

### Requirement: Active power-up timer
When a timed power-up is active, a progress bar SHALL display showing remaining duration.

#### Scenario: Power-up timer bar
- **WHEN** a timed power-up (Multi-Shot, Shield) is active
- **THEN** a timer bar SHALL show remaining duration, depleting over time
