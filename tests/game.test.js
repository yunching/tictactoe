/**
 * @jest-environment jsdom
 */

// Import necessary testing utilities
const fs = require('fs');
const path = require('path');

// Setup the DOM environment before tests
beforeAll(() => {
  // Load HTML content
  document.body.innerHTML = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
  
  // Load the script manually
  const scriptContent = fs.readFileSync(path.resolve(__dirname, '../script.js'), 'utf8');
  const script = document.createElement('script');
  script.textContent = scriptContent;
  document.body.appendChild(script);
  
  // Trigger DOMContentLoaded to initialize the game
  const event = new Event('DOMContentLoaded');
  document.dispatchEvent(event);
});

describe('Tic Tac Toe Game', () => {
  let cells, statusDisplay, restartButton;
  
  beforeEach(() => {
    // Reset the DOM before each test
    document.body.innerHTML = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
    
    // Re-add the script
    const scriptContent = fs.readFileSync(path.resolve(__dirname, '../script.js'), 'utf8');
    const script = document.createElement('script');
    script.textContent = scriptContent;
    document.body.appendChild(script);
    
    // Trigger DOMContentLoaded again
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);
    
    // Get elements
    cells = document.querySelectorAll('.cell');
    statusDisplay = document.getElementById('status');
    restartButton = document.getElementById('restart');
  });
  
  test('Initial game state should be correct', () => {
    // Check initial player
    expect(statusDisplay.innerHTML).toBe("Player X's turn");
    
    // Check that all cells are empty
    cells.forEach(cell => {
      expect(cell.innerHTML).toBe('');
    });
  });
  
  test('Clicking a cell should place the current player mark', () => {
    // Click the first cell
    cells[0].click();
    
    // Check that X was placed
    expect(cells[0].innerHTML).toBe('X');
    expect(cells[0].classList.contains('x')).toBeTruthy();
    
    // Check that player changed to O
    expect(statusDisplay.innerHTML).toBe("Player O's turn");
  });
  
  test('Should not allow clicking on an already filled cell', () => {
    // Click the first cell as X
    cells[0].click();
    
    // Try to click the same cell as O
    cells[0].click();
    
    // Check that the cell still contains X
    expect(cells[0].innerHTML).toBe('X');
    expect(cells[0].classList.contains('x')).toBeTruthy();
    expect(cells[0].classList.contains('o')).toBeFalsy();
  });
  
  test('Should detect a win for X', () => {
    // Create a winning pattern for X (top row)
    cells[0].click(); // X
    cells[3].click(); // O
    cells[1].click(); // X
    cells[4].click(); // O
    cells[2].click(); // X wins
    
    // Check win message
    expect(statusDisplay.innerHTML).toBe('Player X has won!');
  });
  
  test('Should detect a win for O', () => {
    // Create a winning pattern for O (middle column)
    cells[0].click(); // X
    cells[1].click(); // O
    cells[2].click(); // X
    cells[4].click(); // O
    cells[6].click(); // X
    cells[7].click(); // O wins
    
    // Check win message
    expect(statusDisplay.innerHTML).toBe('Player O has won!');
  });
  
  test('Should detect a draw', () => {
    // Create a draw pattern
    // X | O | X
    // X | O | O
    // O | X | X
    cells[0].click(); // X
    cells[1].click(); // O
    cells[2].click(); // X
    cells[4].click(); // O
    cells[3].click(); // X
    cells[5].click(); // O
    cells[8].click(); // X
    cells[6].click(); // O
    cells[7].click(); // X
    
    // Check draw message
    expect(statusDisplay.innerHTML).toBe('Game ended in a draw!');
  });
  
  test('Restart button should reset the game', () => {
    // Make some moves
    cells[0].click();
    cells[1].click();
    
    // Click restart
    restartButton.click();
    
    // Check that game was reset
    expect(statusDisplay.innerHTML).toBe("Player X's turn");
    cells.forEach(cell => {
      expect(cell.innerHTML).toBe('');
      expect(cell.classList.contains('x')).toBeFalsy();
      expect(cell.classList.contains('o')).toBeFalsy();
    });
  });
});
