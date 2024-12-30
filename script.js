// OpenWeatherMap API Key
const apiKey = "bd5e378503939ddaee76f12ad7a97608"; // Your API key

// DOM Elements
const cityInput = document.getElementById('city');
const getWeatherButton = document.getElementById('getWeather');
const weatherDisplay = document.getElementById('weather');
const tempDisplay = document.getElementById('temp');
const forecastDisplay = document.getElementById('forecast');
const weatherIconDisplay = document.getElementById('weatherIcon');
const moodSelect = document.getElementById('moodSelect');
const suggestionsList = document.getElementById('suggestionsList');

// Fetch Weather Data
async function fetchWeather(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    return data;
}

// Suggest Activities Based on Weather and Mood
function suggestActivities(weather, mood) {
    let activities = [];

    if (weather === "Clear") {
        activities.push("Go for a hike", "Visit a park", "Have a picnic outdoors");
    } else if (weather === "Rain") {
        activities.push("Read a book", "Watch a movie", "Do some indoor exercises");
    } else if (weather === "Clouds") {
        activities.push("Take a walk in the park", "Visit a museum", "Have a coffee break");
    } else if (weather === "Snow") {
        activities.push("Build a snowman", "Go ice skating", "Drink hot cocoa");
    }

    // Add mood-based suggestions
    if (mood === "happy") {
        activities.push("Call a friend", "Take photos of your day", "Dance to your favorite music");
    } else if (mood === "sad") {
        activities.push("Watch a funny movie", "Talk to a friend", "Write in your journal");
    } else if (mood === "energetic") {
        activities.push("Go for a run", "Try a new workout", "Explore a new place");
    } else if (mood === "tired") {
        activities.push("Take a nap", "Listen to relaxing music", "Do some light stretching");
    } else if (mood === "neutral") {
        activities.push("Read a book", "Take a walk", "Try a new recipe");
    }

    // Clear previous suggestions and display new ones
    suggestionsList.innerHTML = '';
    activities.forEach(activity => {
        const li = document.createElement('li');
        li.textContent = activity;
        suggestionsList.appendChild(li);
    });
}

// Handle the click event to fetch weather and suggest activities
getWeatherButton.addEventListener('click', async () => {
    const city = cityInput.value;

    if (!city) {
        alert("Please enter a city!");
        return;
    }

    try {
        const weatherData = await fetchWeather(city);

        const weather = weatherData.weather[0].main;
        const temp = weatherData.main.temp;
        const forecast = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;

        weatherDisplay.textContent = `Weather: ${weather}`;
        tempDisplay.textContent = `Temperature: ${temp}°C`;
        forecastDisplay.textContent = `Forecast: ${forecast}`;
        weatherIconDisplay.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather icon" />`;

        const mood = moodSelect.value;
        suggestActivities(weather, mood);
    } catch (error) {
        alert("Could not fetch weather data. Please try again.");
    }
});
