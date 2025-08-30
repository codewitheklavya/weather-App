document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temp");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-msg");
    const body = document.querySelector("body");
    // background body

    const API_KEY = "44ec1e00a1efac7ab2f639c50d73bcf3";

    getWeatherBtn.addEventListener('click', async () => {
        const city = cityInput.value.trim();
        if (!city) return;

        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        } catch (error) {
            showError();
        }
    });

    async function fetchWeatherData(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("city not found");
        }

        const data = await response.json();
        return data;
    }

    function displayWeatherData(data) {
        const { name, main, weather } = data;
        cityNameDisplay.textContent = name;
        temperatureDisplay.textContent = `Temperature: ${main.temp}°C`;
        descriptionDisplay.textContent = `Weather: ${weather[0].description}`;

        // update UI
        weatherInfo.classList.remove("hidden");
        errorMessage.classList.add("hidden");

        // change background
        setBackground(weather[0].main.toLowerCase());
    }

    function showError() {
        weatherInfo.classList.add("hidden");
        errorMessage.classList.remove("hidden");
        body.style.backgroundImage = "url('./daniel-ramirez-q4TfWtnz_xw-unsplash.jpg')"; // reset to default
    }

    function setBackground(condition) {
        if (condition.includes("clear")) {
            body.style.backgroundImage = "url('./valeria-v-qJq66ZcW3lU-unsplash.jpg')";
        } else if (condition.includes("light rain")) {
            body.style.backgroundImage = "url('./filip-zrnzevic-_EMkxLdko9k-unsplash.jpg')";
        } else if (condition.includes("cloud")) {
            body.style.backgroundImage = "url('./nick-fewings-HlTIv8HinBU-unsplash.jpg')";
        } else if (condition.includes("moderate rain")) {
            body.style.backgroundImage = "url('./jms-kFHz9Xh3PPU-unsplash.jpg')";
        } else {
            body.style.backgroundImage = "url('./daniel-ramirez-q4TfWtnz_xw-unsplash.jpg')";
        }
    }
});
