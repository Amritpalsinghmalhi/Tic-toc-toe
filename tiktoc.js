const cells = document.querySelectorAll('[data-cell]');
const gameBoard = document.getElementById('game');
const messageBox = document.getElementById('message');
const winnerText = document.getElementById('winner');
const restartBtn = document.getElementById('restartBtn');

let isXTurn = true;

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

cells.forEach(cell => {
  cell.addEventListener('click', handleClick, { once: true });
});

function handleClick(e) {
  const cell = e.target;
  const currentClass = isXTurn ? 'x' : 'o';
  cell.classList.add(currentClass);
  cell.textContent = currentClass.toUpperCase();

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    isXTurn = !isXTurn;
  }
}

function checkWin(currentClass) {
  return winningCombos.some(combo => {
    return combo.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains('x') || cell.classList.contains('o');
  });
}

function endGame(draw) {
  messageBox.classList.remove('hide');
  if (draw) {
    winnerText.textContent = "It's a Draw!";
  } else {
    winnerText.textContent = `${isXTurn ? 'X' : 'O'} Wins!`;
  }
}

restartBtn.addEventListener('click', () => {
  cells.forEach(cell => {
    cell.classList.remove('x', 'o');
    cell.textContent = '';
    cell.addEventListener('click', handleClick, { once: true });
  });
  messageBox.classList.add('hide');
  isXTurn = true;
});