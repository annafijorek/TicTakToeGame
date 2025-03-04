const board = document.getElementById("board");
const statusText = document.getElementById("status");
let currentPlayer = "X";
let gameBoard = Array(9).fill(null);
let gameActive = true;

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];
    for (const [a, b, c] of winningCombinations) {
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            statusText.textContent = `Wygrał: ${gameBoard[a]}`;
            return;
        }
    }
    if (!gameBoard.includes(null)) {
        gameActive = false;
        statusText.textContent = "Remis!";
    }
}

function handleCellClick(index) {
    if (gameBoard[index] || !gameActive) return;
    gameBoard[index] = currentPlayer;
    document.getElementById(`cell-${index}`).textContent = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    if (gameActive) statusText.textContent = `Tura: ${currentPlayer}`;
}

function resetGame() {
    gameBoard.fill(null);
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = "Tura: X";
    board.innerHTML = "";
    renderBoard();
}

function renderBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.id = `cell-${i}`;
        cell.addEventListener("click", () => handleCellClick(i));
        board.appendChild(cell);
    }
}

renderBoard();