const API_KEY = CONFIG.API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const weatherDisplay = document.getElementById("weather-display");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    getWeather(cityInput.value.trim());
});

async function getWeather(city) {
    if (!city) return;
    console.log("Searching for:", city); // Test if it works
}
