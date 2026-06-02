## ADDED Requirements

### Requirement: Start Screen state
The game SHALL show a start screen on launch with title "ASTEROIDS", "Press ENTER to start" prompt, and controls hint.

#### Scenario: Initial state
- **WHEN** the page loads
- **THEN** Start Screen SHALL display with title and instructions

#### Scenario: Start game
- **WHEN** ENTER is pressed on Start Screen
- **THEN** game SHALL transition to Playing state

### Requirement: Playing state
The game loop SHALL run, all entities SHALL update and render, and input SHALL be processed.

#### Scenario: Pause game
- **WHEN** P key is pressed during Playing state
- **THEN** game SHALL transition to Paused state

#### Scenario: Life lost during play
- **WHEN** ship collides with asteroid and lives > 0
- **THEN** game SHALL transition to Life Lost state

### Requirement: Paused state
The game SHALL display a "PAUSED" overlay with a blurred background. The game loop SHALL stop updating entities.

#### Scenario: Resume from pause
- **WHEN** P key is pressed during Paused state
- **THEN** game SHALL transition back to Playing state

### Requirement: Life Lost state
The ship SHALL blink at center screen for 2 seconds with invulnerability, then resume normal play.

#### Scenario: Life lost flow
- **WHEN** Life Lost state begins
- **THEN** ship SHALL appear at center, blink for 2 seconds, then resume Playing state

### Requirement: Game Over state
When all lives are lost, a full-screen overlay SHALL appear with "GAME OVER" text scaling up with fade-in animation. Final score and high scores SHALL be displayed. "Press ENTER to restart" SHALL be shown.

#### Scenario: Game over animation
- **WHEN** Game Over state begins
- **THEN** "GAME OVER" text SHALL scale up with fade-in over ~1 second

#### Scenario: Display final and high scores
- **WHEN** Game Over state is active
- **THEN** current score and top 5 high scores SHALL be displayed

#### Scenario: Restart game
- **WHEN** ENTER is pressed during Game Over state
- **THEN** game SHALL transition to Start Screen
