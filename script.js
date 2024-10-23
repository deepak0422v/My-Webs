const cells = document.querySelectorAll('[data-cell]');
const statusMessage = document.getElementById('status-message');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X';
let isGameActive = true;
let board = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const checkWin = () => {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
};

const checkDraw = () => {
    return board.every(cell => cell !== '');
};

const handleClick = (event) => {
    const cell = event.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (board[cellIndex] !== '' || !isGameActive) {
        return;
    }

    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    // Change color based on player
    if (currentPlayer === 'X') {
        cell.style.color = 'red';  // X is red
    } else {
        cell.style.color = 'blue';  // O is blue
    }

    if (checkWin()) {
        statusMessage.textContent = `${currentPlayer} wins!`;
        isGameActive = false;
    } else if (checkDraw()) {
        statusMessage.textContent = 'It\'s a draw!';
        isGameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusMessage.textContent = `It's ${currentPlayer}'s turn`;
    }
};

const restartGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.color = '';  // Reset text color
    });
    currentPlayer = 'X';
    isGameActive = true;
    statusMessage.textContent = `It's ${currentPlayer}'s turn`;
};

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);

statusMessage.textContent = `It's ${currentPlayer}'s turn`;
