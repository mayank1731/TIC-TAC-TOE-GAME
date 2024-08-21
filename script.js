const cells = document.querySelectorAll('[data-cell]');
const statusMessage = document.getElementById('statusMessage');
const restartButton = document.getElementById('restartButton');
const modeSelection = document.getElementById('modeSelection');
const playerVsPlayerButton = document.getElementById('playerVsPlayer');
const playerVsComputerButton = document.getElementById('playerVsComputer');
const gameBoard = document.getElementById('gameBoard');
const winSound = document.getElementById('winSound'); 
let currentPlayer = 'X';
let board = Array(9).fill(null);
let gameActive = true;
let vsComputer = false;
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
playerVsPlayerButton.addEventListener('click', startPlayerVsPlayer);
playerVsComputerButton.addEventListener('click', startPlayerVsComputer);
restartButton.addEventListener('click', restartGame);
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

function startPlayerVsPlayer() {
    vsComputer = false;
    startGame();
}
function startPlayerVsComputer() {
    vsComputer = true;
    startGame();
}
function startGame() {
    modeSelection.classList.add('hidden');
    gameBoard.classList.remove('hidden');
    restartButton.classList.remove('hidden');
    statusMessage.textContent = `It's ${currentPlayer}'s turn`;
}
function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = Array.from(cells).indexOf(cell);
    if (board[cellIndex] !== null || !gameActive) {
        return;
    }
    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('glow'); 
    if (checkWin(currentPlayer)) {
        setTimeout(() => {
            winningCombinations
                .filter(combination => combination.every(index => board[index] === currentPlayer))
                .forEach(combination => {
                    combination.forEach(index => {
                        cells[index].classList.add('flip'); 
                    });
                });
            statusMessage.textContent = ` ♕🍓 ${currentPlayer}   ωƗⓃ𝓼!  ♟🎁`;
            gameActive = false;
            winSound.play(); 
        }, 100);  
        setTimeout(restartGame, 3000); 
        return;
    } else if (board.every(cell => cell !== null)) {
        statusMessage.textContent = '🐷  🎀  𝒟𝓇𝒶𝓌❣  🎀';
        gameActive = false;
        setTimeout(restartGame, 3000); 
        return;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusMessage.textContent = `𝕴𝖙'𝖘 ${currentPlayer}'𝖘 𝖙𝖚𝖗𝖓`;
    }
    if (vsComputer && currentPlayer === 'O' && gameActive) {
        computerMove();
    }
}
function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return board[index] === player;
        });
    });
}
function computerMove() {
    const availableCells = board.map((cell, index) => cell === null ? index : null).filter(index => index !== null);
    const randomIndex = Math.floor(Math.random() * availableCells.length);
    const cellIndex = availableCells[randomIndex];

    board[cellIndex] = 'O';
    cells[cellIndex].textContent = 'O';
    cells[cellIndex].classList.add('glow'); 
    if (checkWin('O')) {
        statusMessage.textContent = '♕🍓  Ⓞ ωƗⓃ𝓼!  ♟🎁';
        gameActive = false;
        winSound.play(); // Play the winning sound
        setTimeout(restartGame, 3000);  
        return;
    } else if (board.every(cell => cell !== null)) {
        statusMessage.textContent = '🐷  🎀  𝒟𝓇𝒶𝓌❣  🎀';
        gameActive = false;
        setTimeout(restartGame, 3000); 
        return;
    } else {
        currentPlayer = 'X';
        statusMessage.textContent = `𝕴𝖙'𝖘 ${currentPlayer}'𝖘 𝖙𝖚𝖗𝖓`;
    }
}
function restartGame() {
    currentPlayer = 'X';
    board = Array(9).fill(null);
    gameActive = true;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('glow', 'flip');
    });
    statusMessage.textContent = '';
    gameBoard.classList.add('hidden');
    restartButton.classList.add('hidden');
    modeSelection.classList.remove('hidden');
}
