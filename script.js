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
