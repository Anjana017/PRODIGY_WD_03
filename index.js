const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');

let boardState = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

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

function handleCellClick(e) {
    const clickedCell = e.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (boardState[clickedCellIndex] !== '' || !isGameActive) {
        return;
    }

    updateCell(clickedCell, clickedCellIndex);
    checkForWinner();
}

function updateCell(cell, index) {
    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = Player ${currentPlayer}'s turn;
}

function checkForWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = boardState[winCondition[0]];
        let b = boardState[winCondition[1]];
        let c = boardState[winCondition[2]];

        if (a === ''  c === '') {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = Player ${currentPlayer === 'X' ? 'O' : 'X'} wins!;
        isGameActive = false;
        return;
    }

    if (!boardState.includes('')) {
        statusDisplay.textContent = 'Draw!';
        isGameActive = false;
        return;
    }
}

function restartGame() {
    boardState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameActive = true;
    statusDisplay.textContent = Player ${currentPlayer}'s turn;

    cells.forEach(cell => {
        cell.textContent = '';
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
