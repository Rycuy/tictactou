const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");
const startBtn = document.getElementById("startBtn");

let currentPlayer;
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

// Start Game
startBtn.addEventListener("click", () => {
    const p1 = document.getElementById("player1Name").value.trim();
    const p2 = document.getElementById("player2Name").value.trim();

    player1 = p1 || "Player 1";
    player2 = p2 || "Player 2";

    document.getElementById("nameForm").style.display = "none";
    document.getElementById("board").style.display = "grid";
    statusText.style.display = "block";
    resetBtn.style.display = "inline-block";

    // Random siapa yang mulai
    currentPlayer = Math.random() < 0.5 ? "X" : "O";
    running = true;
    updateStatus();
});

function updateStatus() {
    statusText.textContent = currentPlayer === "X" 
        ? `${player1}'s turn (X)` 
        : `${player2}'s turn (O)`;
}

function cellClicked() {
    const cellIndex = this.getAttribute("data-index");

    if (board[cellIndex] !== "" || !running) return;

    board[cellIndex] = currentPlayer;
    this.textContent = currentPlayer;

    checkWinner();
}

function checkWinner() {
    let roundWon = false;

    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            highlightWin(condition);
            break;
        }
    }

    if (roundWon) {
        const winnerName = currentPlayer === "X" ? player1 : player2;
        statusText.textContent = `🏆 ${winnerName} Wins!`;
        running = false;
    } else if (!board.includes("")) {
        statusText.textContent = "🤝 Draw!";
        running = false;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        updateStatus();
    }
}

function highlightWin(indices) {
    indices.forEach(i => {
        cells[i].classList.add("win");
    });
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    running = true;
    currentPlayer = Math.random() < 0.5 ? "X" : "O"; // Random lagi saat reset
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("win");
    });
    updateStatus();
}

cells.forEach(cell => cell.addEventListener("click", cellClicked));
resetBtn.addEventListener("click", resetGame);
