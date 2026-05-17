const API_KEY = CONFIG.API_KEY;
console.log("API key loaded:", API_KEY ? "Yes ✓" : "No ✗");

// ========== TASK 11.1: Understanding Async ==========

// Exercise 1: Synchronous vs Asynchronous
console.log("=== SYNC VS ASYNC TEST ===");
console.log("1 - Start");

setTimeout(() => {
    console.log("2 - This is delayed 2 seconds");
}, 2000);

console.log("3 - End");

// Exercise 2: Predict the output
console.log("=== PREDICTION TEST ===");
console.log("A");

setTimeout(() => console.log("B"), 0);

console.log("C");

setTimeout(() => console.log("D"), 100);

console.log("E");

// Exercise 3: Callback Pattern - Build loadUser
function loadUser(userId, callback) {
    console.log("Loading user... please wait 1.5s");
    setTimeout(() => {
        const user = { 
            id: userId, 
            name: "Julie", 
            city: "Nairobi" 
        };
        callback(user);
    }, 1500);
}

// Test the callback
loadUser(1, function(data) {
    console.log("Data received:", data);
    console.log("User name:", data.name);
});

// ========== WEATHER DASHBOARD CODE BELOW ==========
// We'll add this later after Task 11.1 works

const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");

if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log("Form works! City:", cityInput.value);
    });
}
// ========== WEATHER DASHBOARD LOGIC ==========

const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const weatherDisplay = document.getElementById("weather-display");

// Elements to update
const cityName = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    }
});

async function getWeather(city) {
    const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        showLoading();
        hideError();
        weatherDisplay.classList.add("hidden");

        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("City not found. Check spelling");
            }
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        displayWeather(data);

    } catch (err) {
        showError(err.message);
        console.error(err);
    } finally {
        hideLoading();
    }
}

function displayWeather(data) {
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.alt = data.weather[0].description;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;

    weatherDisplay.classList.remove("hidden");
    cityInput.value = "";
}

function showLoading() {
    loading.classList.remove("hidden");
}

function hideLoading() {
    loading.classList.add("hidden");
}

function showError(message) {
    error.textContent = message;
    error.classList.remove("hidden");
}

function hideError() {
    error.classList.add("hidden");
}
