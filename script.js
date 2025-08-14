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


const apiKey = "3b0e7f97a91696c63853f082e7bc248b";

const searchBox = document.querySelector(".searchBox input");
const searchBtn = document.querySelector(".fa-magnifying-glass");

const suhuElement = document.querySelector(".suhu");
const descElement = document.querySelector(".desc");
const kelembapanElement = document.querySelector(".kelembapan p");
const anginElement = document.querySelector(".angin p");
const cuacaImg = document.querySelector(".cuaca img");

async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=id`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Lokasi tidak ditemukan. Pastikan nama kota benar.");
        }

        const data = await response.json();

        suhuElement.innerHTML = `${Math.round(data.main.temp)}<span>°C</span>`;
        descElement.textContent = data.weather[0].description;
        kelembapanElement.innerHTML = `${data.main.humidity}% <span>Kelembapan</span>`;
        anginElement.innerHTML = `${(data.wind.speed * 3.6).toFixed(1)} <span>km/h</span>`;
        cuacaImg.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        updateBackground(data.weather[0].main.toLowerCase());

    } catch (error) {
        alert(error.message);
    }
}

function updateBackground(condition) {
    const body = document.body;

    if (condition.includes("clear")) {
        body.className = "cerah";
    } else if (condition.includes("cloud")) {
        body.className = "mendung";
    } else if (condition.includes("rain")) {
        body.className = "hujan";
    } else {
        body.className = "default-bg";
    }
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) getWeather(city);
});

searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const city = searchBox.value.trim();
        if (city) getWeather(city);
    }
});
