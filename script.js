const board = document.getElementById("board");
const message = document.getElementById("message");
let cells = [];
let currentPlayer = "X";
let gameActive = true;

function createBoard() {
    board.innerHTML = "";
    message.textContent = "";
    cells = [];
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleCellClick);
        board.appendChild(cell);
        cells.push(cell);
    }
}

function handleCellClick(event) {
    if (!gameActive) return;
    const cell = event.target;
    if (cell.textContent !== "") return;
    
    cell.textContent = currentPlayer;
    cell.classList.add("taken");
    
    if (checkWinner()) {
        message.textContent = `${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }
    if (cells.every(cell => cell.textContent !== "")) {
        message.textContent = "It's a Draw!";
        gameActive = false;
        return;
    }
    
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    if (currentPlayer === "O") setTimeout(aiMove, 500);
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            cells[a].classList.add("winner");
            cells[b].classList.add("winner");
            cells[c].classList.add("winner");
            return true;
        }
    }
    return false;
}

function aiMove() {
    let emptyCells = cells.filter(cell => cell.textContent === "");
    if (emptyCells.length === 0) return;
    let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    randomCell.textContent = "O";
    randomCell.classList.add("taken");
    
    if (checkWinner()) {
        message.textContent = "O Wins!";
        gameActive = false;
        return;
    }
    if (cells.every(cell => cell.textContent !== "")) {
        message.textContent = "It's a Draw!";
        gameActive = false;
        return;
    }
    
    currentPlayer = "X";
}

function restartGame() {
    gameActive = true;
    currentPlayer = "X";
    createBoard();
}

createBoard();