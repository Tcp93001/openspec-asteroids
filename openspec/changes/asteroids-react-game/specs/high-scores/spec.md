## ADDED Requirements

### Requirement: Top 5 scores persisted in localStorage
The game SHALL store the top 5 highest scores in localStorage under the key `asteroids-high-scores`. Scores SHALL be stored as a JSON array of `{score, date}` objects.

#### Scenario: Save score on game over
- **WHEN** the game reaches Game Over state
- **THEN** the final score SHALL be saved to localStorage if it ranks in the top 5

#### Scenario: Load scores on game over screen
- **WHEN** Game Over screen renders
- **THEN** high scores SHALL be loaded from localStorage and displayed

#### Scenario: Empty state
- **WHEN** no scores have been saved yet
- **THEN** high scores list SHALL show "No scores yet"

### Requirement: Scores persist across sessions
Scores saved to localStorage SHALL remain available after page refresh or browser restart.

#### Scenario: Persistence
- **WHEN** the page is refreshed and game reaches Game Over
- **THEN** previously saved high scores SHALL still be displayed
