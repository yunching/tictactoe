"# Tic Tac Toe"

A simple, responsive web-based Tic Tac Toe game built with HTML, CSS, and JavaScript.

## Features

- Clean, modern UI with responsive design
- Player turn indication
- Win detection with highlighted winning cells
- Draw detection
- Game restart functionality

## How to Play

1. Open `index.html` in any modern web browser
2. Players take turns clicking on the grid to place their mark (X or O)
3. The first player to get three of their marks in a row (horizontally, vertically, or diagonally) wins
4. If all cells are filled and no player has won, the game ends in a draw
5. Click the "Restart Game" button to start a new game

## Files

- `index.html` - The main HTML structure
- `styles.css` - CSS styling for the game
- `script.js` - JavaScript code for game logic

## Testing

This project includes a comprehensive test suite using Jest. For detailed information about the testing infrastructure, how to run tests, and how to add new tests, please see the [Testing Documentation](TESTING.md).

### Running Tests

```bash
# Install dependencies
npm install

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## Contributing

Contributions are welcome! Please read the [Testing Documentation](TESTING.md) before submitting pull requests to ensure your changes pass all tests.
