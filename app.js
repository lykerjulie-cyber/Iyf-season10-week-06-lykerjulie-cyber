alert("JS loaded!");
const API_KEY = CONFIG.API_KEY;
const API_KEY = CONFIG.API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
console.log("API key loaded:", API_KEY? "Yes ✓" : "No ✗");

// ========== TASK 11.1: Understanding Async ==========

console.log("=== SYNC VS ASYNC TEST ===");
console.log("1 - Start");

setTimeout(() => {
    console.log("2 - This is delayed 2 seconds");
}, 2000);

console.log("3 - End");

console.log("=== PREDICTION TEST ===");
console.log("A");
setTimeout(() => console.log("B"), 0);
console.log("C");
setTimeout(() => console.log("D"), 100);
console.log("E");

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

loadUser(1, function(data) {
    console.log("Data received:", data);
    console.log("User name:", data.name);
});

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
            if (response.status === 401) {
                throw new Error("Invalid API key - check config.js");
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

// ========== TASK 12.3: 5-DAY FORECAST ==========

const forecast = document.getElementById("forecast");
const forecastContainer = document.getElementById("forecast-container");

async function getForecast(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00"));
        displayForecast(dailyData);
    } catch (err) {
        console.error("Forecast failed:", err);
    }
}

function displayForecast(days) {
    forecastContainer.innerHTML = "";
    days.forEach(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
        const dayDiv = document.createElement("div");
        dayDiv.className = "forecast-day";
        dayDiv.innerHTML = `
            <p><strong>${dayName}</strong></p>
            <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="">
            <p>${Math.round(day.main.temp)}°C</p>
            <p>${day.weather[0].main}</p>
        `;
        forecastContainer.appendChild(dayDiv);
    });
    forecast.classList.remove("hidden");
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
// ========== TASK 11.2: Callback Hell & Promises ==========

console.log("=== TASK 11.2 PROMISES ===");

// Refactored to Promises
function getUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({ id: userId, name: "Julie", city: "Nairobi" });
            } else {
                reject("Invalid user ID");
            }
        }, 1000);
    });
}

function getUserPosts(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, title: "Learning JS" },
                { id: 2, title: "Async is cool" }
            ]);
        }, 1000);
    });
}

function getPostComments(postId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, text: "Great post!" },
                { id: 2, text: "Thanks for sharing" }
            ]);
        }, 1000);
    });
}

// Test it - this replaces callback hell
getUserData(1)
   .then(user => {
        console.log("User:", user);
        return getUserPosts(user.id);
    })
   .then(posts => {
        console.log("Posts:", posts);
        return getPostComments(posts[0].id);
    })
   .then(comments => {
        console.log("Comments:", comments);
        console.log("Task 11.2 Done ✓");
    })
   .catch(error => {
        console.error("Error:", error);
    });

// ========== TASK 11.3: Promise.all ==========

console.log("=== TASK 11.3 PROMISE.ALL ===");

// Fetch 3 users at same time
const user1Promise = getUserData(1);
const user2Promise = getUserData(2);
const user3Promise = getUserData(3);

Promise.all([user1Promise, user2Promise, user3Promise])
   .then(users => {
        console.log("All users loaded at once:", users);
        console.log("Task 11.3 Done ✓");
    })
   .catch(error => {
        console.error("One failed:", error);
    });
// ========== TASK 11.4: Async/Await ==========

console.log("=== TASK 11.4 ASYNC/AWAIT ===");

// Same functions but using async/await instead of.then()
async function loadUserDataFlow() {
    try {
        console.log("Starting async flow...");

        const user = await getUserData(1);
        console.log("Step 1 - User:", user);

        const posts = await getUserPosts(user.id);
        console.log("Step 2 - Posts:", posts);

        const comments = await getPostComments(posts[0].id);
        console.log("Step 3 - Comments:", comments);

        console.log("Task 11.4 Done ✓");
        return { user, posts, comments };

    } catch (error) {
        console.error("Something failed:", error);
    }
}

// Run it
loadUserDataFlow();

// Bonus: Async with Promise.all
async function loadAllUsersFast() {
    try {
        const users = await Promise.all([
            getUserData(1),
            getUserData(2),
            getUserData(3)
        ]);
        console.log("Async/await + Promise.all:", users);
    } catch (error) {
        console.error("Failed:", error);
    }
}

loadAllUsersFast();
