const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");
const startBtn = document.getElementById("startBtn");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let running = false;
let player1 = "Player 1";
let player2 = "Player 2";

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Saat klik mulai game
startBtn.addEventListener("click", () => {
    const p1 = document.getElementById("player1Name").value.trim();
    const p2 = document.getElementById("player2Name").value.trim();

    player1 = p1 || "Player 1";
    player2 = p2 || "Player 2";

    document.getElementById("nameForm").style.display = "none";
    document.getElementById("board").style.display = "grid";
    statusText.style.display = "block";
    resetBtn.style.display = "inline-block";

    currentPlayer = "X";
    running = true;
    statusText.textContent = `${player1}'s turn (X)`;
});

function cellClicked() {
    const cellIndex = this.getAttribute("data-index");

    if (board[cellIndex] !== "" || !running) {
        return;
    }

    board[cellIndex] = currentPlayer;
    this.textContent = currentPlayer;

    checkWinner();
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const [aIndex, bIndex, cIndex] = winConditions[i];
        const a = board[aIndex];
        const b = board[bIndex];
        const c = board[cIndex];

        if (a === "" || b === "" || c === "") continue;

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        const winnerName = currentPlayer === "X" ? player1 : player2;
        statusText.textContent = `${winnerName} Wins! 🎉`;
        running = false;
    } else if (!board.includes("")) {
        statusText.textContent = "Draw!";
        running = false;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = currentPlayer === "X" 
            ? `${player1}'s turn (X)` 
            : `${player2}'s turn (O)`;
    }
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    running = true;
    currentPlayer = "X";
    statusText.textContent = `${player1}'s turn (X)`;
    cells.forEach(cell => cell.textContent = "");
}

cells.forEach(cell => cell.addEventListener("click", cellClicked));
resetBtn.addEventListener("click", resetGame);
