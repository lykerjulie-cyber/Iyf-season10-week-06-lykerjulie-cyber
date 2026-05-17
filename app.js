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
