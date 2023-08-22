const cells = document.querySelectorAll('[data-cell]');
const status = document.querySelector('.status');
const restartButton = document.querySelector('.restart');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

cells.forEach(cell => {
  cell.addEventListener('click', () => handleCellClick(cell));
});

restartButton.addEventListener('click', restartGame);

function handleCellClick(cell) {
  const clickedCellIndex = parseInt(cell.getAttribute('data-cell'));
  
  if (gameState[clickedCellIndex] !== '' || !gameActive) {
    return;
  }
  
  gameState[clickedCellIndex] = currentPlayer;
  cell.textContent = currentPlayer;
  
  if (checkWin()) {
    status.textContent = `${currentPlayer} wins!`;
    gameActive = false;
    return;
  }
  
  if (checkDraw()) {
    status.textContent = "It's a draw!";
    gameActive = false;
    return;
  }
  
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
  return winCombinations.some(combination => {
    return combination.every(index => gameState[index] === currentPlayer);
  });
}

function checkDraw() {
  return gameState.every(cell => cell !== '');
}

function restartGame() {
  gameState = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  status.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => cell.textContent = '');
}
