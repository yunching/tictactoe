# Tic Tac Toe Testing Guide

This document provides an overview of the testing infrastructure for the Tic Tac Toe web application. It's intended to help contributors understand how the tests are structured, what they cover, and how to run them.

## Table of Contents

- [Testing Overview](#testing-overview)
- [Test Structure](#test-structure)
- [Running Tests](#running-tests)
- [Writing New Tests](#writing-new-tests)
- [Best Practices](#best-practices)

## Testing Overview

The Tic Tac Toe application uses Jest as the testing framework with jsdom for DOM testing. The tests are designed to verify that:

1. The game logic functions correctly (wins, draws, turns)
2. The UI renders properly
3. User interactions work as expected

## Test Structure

The tests are organized into three main files, each focusing on a specific aspect of the application:

### 1. Game Tests (`game.test.js`)

These tests simulate the complete game experience by testing user interactions and game state changes. They verify:

- Initial game state
- Player turn changes
- Cell click behavior
- Win detection for both X and O players
- Draw detection
- Game restart functionality

Example of a game test:

```javascript
test('Clicking a cell should place the current player mark', () => {
  // Click the first cell
  cells[0].click();
  
  // Check that X was placed
  expect(cells[0].innerHTML).toBe('X');
  expect(cells[0].classList.contains('x')).toBeTruthy();
  
  // Check that player changed to O
  expect(statusDisplay.innerHTML).toBe("Player O's turn");
});
```

### 2. UI Tests (`ui.test.js`)

These tests focus on the structure and elements of the user interface to ensure all components are properly rendered:

- Board structure verification
- Cell count and attributes
- Status display
- Restart button presence and labeling
- Overall container structure

Example of a UI test:

```javascript
test('Board should have 9 cells', () => {
  const cells = document.querySelectorAll('.cell');
  expect(cells.length).toBe(9);
});
```

### 3. Game Logic Tests (`gameLogic.test.js`)

These are unit tests for the core game logic functions:

- Cell marking
- Win detection for horizontal, vertical, and diagonal patterns
- Draw detection
- Player alternation

Example of a game logic test:

```javascript
test('handleResultValidation should detect horizontal win', () => {
  // Create horizontal win for X (top row)
  // X plays in position 0
  handleCellPlayed(0);
  handleResultValidation(); // Changes to O's turn
  
  // O plays in position 3
  handleCellPlayed(3);
  handleResultValidation(); // Changes to X's turn
  
  // X plays in position 1
  handleCellPlayed(1);
  handleResultValidation(); // Changes to O's turn
  
  // O plays in position 4
  handleCellPlayed(4);
  handleResultValidation(); // Changes to X's turn
  
  // X plays in position 2 (winning move)
  handleCellPlayed(2);
  const result = handleResultValidation();
  
  expect(result.status).toBe('win');
  expect(result.player).toBe('X');
  expect(gameActive).toBe(false);
});
```

## Running Tests

### Prerequisites

Make sure you have Node.js and npm installed on your system.

### Installing Dependencies

To install the required dependencies, run:

```bash
npm install
```

This will install Jest and other testing libraries defined in the `package.json` file.

### Running All Tests

To run all tests once:

```bash
npm test
```

### Running Tests in Watch Mode

For continuous testing during development (tests will re-run when files change):

```bash
npm run test:watch
```

### Running a Specific Test File

To run tests from a specific file:

```bash
npx jest tests/game.test.js
```

### Running a Specific Test

To run a specific test, use the `-t` flag with a pattern that matches the test name:

```bash
npx jest -t "Initial game state should be correct"
```

## Writing New Tests

When adding new features to the Tic Tac Toe game, you should also add corresponding tests. Here's how to approach it:

1. **Determine the test type**: Decide whether your test is for game logic, UI, or complete game functionality.
2. **Add to the appropriate file**: Add your test to the corresponding test file.
3. **Follow the existing patterns**: Use the existing tests as templates for your new tests.
4. **Run the tests**: Make sure your new tests pass and don't break existing functionality.

### Test Template

```javascript
test('Description of what the test verifies', () => {
  // Setup - prepare any necessary state or data
  
  // Action - perform the action you want to test
  
  // Assertion - verify the expected outcome
  expect(actualValue).toBe(expectedValue);
});
```

## Best Practices

1. **Test one thing per test**: Each test should focus on verifying a single aspect of functionality.
2. **Use descriptive test names**: The test name should clearly describe what is being tested.
3. **Keep tests independent**: Tests should not depend on the results of other tests.
4. **Clean up after tests**: Reset the state in the `beforeEach` function to ensure a clean environment for each test.
5. **Test edge cases**: Don't just test the happy path; also test edge cases and error conditions.
6. **Keep tests fast**: Tests should run quickly to encourage frequent testing.

## Test Environment

The tests use jsdom to simulate a browser environment in Node.js. This allows testing DOM interactions without a real browser.

```javascript
/**
 * @jest-environment jsdom
 */
```

This comment at the top of each test file tells Jest to use the jsdom environment.

## Mocking

In some cases, you might need to mock certain functions or modules. Jest provides utilities for this:

```javascript
// Mock a function
const mockFunction = jest.fn();

// Mock a return value
mockFunction.mockReturnValue('mocked value');

// Verify a function was called
expect(mockFunction).toHaveBeenCalled();
```

---

By following this guide, you should be able to understand, run, and extend the tests for the Tic Tac Toe application. If you have any questions or need help with testing, please reach out to the project maintainers.
