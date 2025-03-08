/**
 * @jest-environment jsdom
 */

// Import necessary testing utilities
const fs = require('fs');
const path = require('path');

describe('Tic Tac Toe UI', () => {
  beforeEach(() => {
    // Setup the DOM environment before each test
    document.body.innerHTML = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
    
    // Add CSS to test styles (this won't actually apply styles in JSDOM, but it's good for completeness)
    const css = fs.readFileSync(path.resolve(__dirname, '../styles.css'), 'utf8');
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
    
    // Load the script
    const scriptContent = fs.readFileSync(path.resolve(__dirname, '../script.js'), 'utf8');
    const script = document.createElement('script');
    script.textContent = scriptContent;
    document.body.appendChild(script);
    
    // Trigger DOMContentLoaded to initialize the game
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);
  });
  
  test('Board should have 9 cells', () => {
    const cells = document.querySelectorAll('.cell');
    expect(cells.length).toBe(9);
  });
  
  test('Status should display current player', () => {
    const status = document.getElementById('status');
    expect(status.textContent).toBe("Player X's turn");
  });
  
  test('Board should have proper structure', () => {
    const board = document.getElementById('board');
    expect(board).not.toBeNull();
    expect(board.classList.contains('board')).toBeTruthy();
  });
  
  test('Cells should have data-index attributes', () => {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
      expect(cell.getAttribute('data-index')).toBe(index.toString());
    });
  });
  
  test('Restart button should be visible and properly labeled', () => {
    const button = document.getElementById('restart');
    expect(button).not.toBeNull();
    expect(button.textContent).toBe('Restart Game');
  });
  
  test('Container should have proper structure', () => {
    const container = document.querySelector('.container');
    expect(container).not.toBeNull();
    
    // Check that container has all required elements
    expect(container.querySelector('h1')).not.toBeNull();
    expect(container.querySelector('#status')).not.toBeNull();
    expect(container.querySelector('#board')).not.toBeNull();
    expect(container.querySelector('#restart')).not.toBeNull();
  });
});
