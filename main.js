// Define constants for the grid size and ship types
const GRID_SIZE = 5;
const SHIP_TYPES = {
  'destroyer': 2,
  'submarine': 3,
  'cruiser': 3,
  'battleship': 4
};

// Function to create an empty grid
function createGrid(size) {
  const grid = [];
  for (let i = 0; i < size; i++) {
    grid.push(Array(size).fill(0));
  }
  return grid;
}

// Function to randomly place ships on the grid
function placeShips(grid, shipTypes) {
  for (const ship in shipTypes) {
    let size = shipTypes[ship];
    let direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';
    let x, y;
    do {
      x = Math.floor(Math.random() * GRID_SIZE);
      y = Math.floor(Math.random() * GRID_SIZE);
    } while (!canPlaceShip(grid, x, y, size, direction));
    for (let i = 0; i < size; i++) {
      if (direction === 'horizontal') {
        grid[y][x + i] = 1;
      } else {
        grid[y + i][x] = 1;
      }
    }
  }
}

// Function to check if a ship can be placed at a certain position
function canPlaceShip(grid, x, y, size, direction) {
  if (direction === 'horizontal' && x + size > GRID_SIZE) {
    return false;
  }
  if (direction === 'vertical' && y + size > GRID_SIZE) {
    return false;
  }
  for (let i = 0; i < size; i++) {
    if (direction === 'horizontal' && grid[y][x + i] !== 0) {
      return false;
    }
    if (direction === 'vertical' && grid[y + i][x] !== 0) {
      return false;
    }
  }
  return true;
}

// Function to display the grid
function displayGrid(grid) {
  for (let row of grid) {
    console.log(row.map(cell => cell === 1 ? 'O' : cell === 2 ? 'X' : '-').join(' '));
  }
}

// Function to simulate an attack
function attack(grid, x, y) {
  if (grid[y][x] === 1) {
    console.log('Hit!');
    grid[y][x] = 2; // Mark as hit
  } else {
    console.log('Miss!');
  }
}

// Create grids for both players
let playerGrid = createGrid(GRID_SIZE);
let computerGrid = createGrid(GRID_SIZE);

// Place ships on both grids
placeShips(playerGrid, SHIP_TYPES);
placeShips(computerGrid, SHIP_TYPES);

// Main game loop
while (true) {
  console.log('Your grid:');
  displayGrid(playerGrid);

  // Player's turn
  let playerX = parseInt(prompt('Enter X coordinate to attack (0-4):'));
  let playerY = parseInt(prompt('Enter Y coordinate to attack (0-4):'));
  attack(computerGrid, playerX, playerY);

  // Check if all computer's ships are sunk
  if (computerGrid.every(row => row.every(cell => cell !== 1))) {
    console.log('You win!');
    break;
  }

  // Computer's turn
  let computerX = Math.floor(Math.random() * GRID_SIZE);
  let computerY = Math.floor(Math.random() * GRID_SIZE);
  attack(playerGrid, computerX, computerY);

  // Check if all player's ships are sunk
  if (playerGrid.every(row => row.every(cell => cell !== 1))) {
    console.log('Computer wins!');
    break;
  }
}
