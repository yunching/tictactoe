/**
 * @jest-environment jsdom
 */

// This test file focuses on testing the pure game logic functions

describe('Tic Tac Toe Game Logic', () => {
  // Mock game state and functions for unit testing
  let gameState, currentPlayer, gameActive;
  let handleCellPlayed, handleResultValidation, handlePlayerChange;
  
  beforeEach(() => {
    // Setup initial game state
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    
    // Define the winning conditions (same as in script.js)
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    
    // Mock functions that mimic the game logic
    handleCellPlayed = (index) => {
      gameState[index] = currentPlayer;
    };
    
    handleResultValidation = () => {
      let roundWon = false;
      
      for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        const condition = gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
        
        if (condition) {
          roundWon = true;
          break;
        }
      }
      
      if (roundWon) {
        gameActive = false;
        return { status: 'win', player: currentPlayer };
      }
      
      const roundDraw = !gameState.includes('');
      
      if (roundDraw) {
        gameActive = false;
        return { status: 'draw' };
      }
      
      handlePlayerChange();
      return { status: 'continue' };
    };
    
    handlePlayerChange = () => {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    };
  });
  
  test('handleCellPlayed should update gameState correctly', () => {
    handleCellPlayed(0);
    expect(gameState[0]).toBe('X');
    
    handlePlayerChange();
    handleCellPlayed(1);
    expect(gameState[1]).toBe('O');
  });
  
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
  
  test('handleResultValidation should detect vertical win', () => {
    // Create vertical win for O (middle column)
    // X plays in position 0
    handleCellPlayed(0);
    handleResultValidation(); // Changes to O's turn
    
    // O plays in position 1
    handleCellPlayed(1);
    handleResultValidation(); // Changes to X's turn
    
    // X plays in position 2
    handleCellPlayed(2);
    handleResultValidation(); // Changes to O's turn
    
    // O plays in position 4
    handleCellPlayed(4);
    handleResultValidation(); // Changes to X's turn
    
    // X plays in position 6
    handleCellPlayed(6);
    handleResultValidation(); // Changes to O's turn
    
    // O plays in position 7 (winning move)
    handleCellPlayed(7);
    const result = handleResultValidation();
    
    expect(result.status).toBe('win');
    expect(result.player).toBe('O');
    expect(gameActive).toBe(false);
  });
  
  test('handleResultValidation should detect diagonal win', () => {
    // Create diagonal win for X (top-left to bottom-right)
    // X plays in position 0
    handleCellPlayed(0);
    handleResultValidation(); // Changes to O's turn
    
    // O plays in position 1
    handleCellPlayed(1);
    handleResultValidation(); // Changes to X's turn
    
    // X plays in position 4
    handleCellPlayed(4);
    handleResultValidation(); // Changes to O's turn
    
    // O plays in position 2
    handleCellPlayed(2);
    handleResultValidation(); // Changes to X's turn
    
    // X plays in position 8 (winning move)
    handleCellPlayed(8);
    const result = handleResultValidation();
    
    expect(result.status).toBe('win');
    expect(result.player).toBe('X');
    expect(gameActive).toBe(false);
  });
  
  test('handleResultValidation should detect a draw', () => {
    // Create a draw pattern
    // X | O | X
    // X | O | O
    // O | X | X
    
    // X plays in position 0
    handleCellPlayed(0);
    handleResultValidation(); // Changes to O's turn
    
    // O plays in position 1
    handleCellPlayed(1);
    handleResultValidation(); // Changes to X's turn
    
    // X plays in position 2
    handleCellPlayed(2);
    handleResultValidation(); // Changes to O's turn
    
    // O plays in position 4
    handleCellPlayed(4);
    handleResultValidation(); // Changes to X's turn
    
    // X plays in position 3
    handleCellPlayed(3);
    handleResultValidation(); // Changes to O's turn
    
    // O plays in position 5
    handleCellPlayed(5);
    handleResultValidation(); // Changes to X's turn
    
    // X plays in position 8
    handleCellPlayed(8);
    handleResultValidation(); // Changes to O's turn
    
    // O plays in position 6
    handleCellPlayed(6);
    handleResultValidation(); // Changes to X's turn
    
    // X plays in position 7 (final move, draw)
    handleCellPlayed(7);
    const result = handleResultValidation();
    
    expect(result.status).toBe('draw');
    expect(gameActive).toBe(false);
  });
  
  test('handlePlayerChange should alternate between X and O', () => {
    expect(currentPlayer).toBe('X');
    
    handlePlayerChange();
    expect(currentPlayer).toBe('O');
    
    handlePlayerChange();
    expect(currentPlayer).toBe('X');
  });
});
