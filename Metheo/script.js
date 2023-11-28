// API key for OpenWeatherMap
const apiKey = YOUR_API_KEY;
// API URL for weather data with metric units
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Selecting the input element for the search box
const searchBox = document.querySelector(".search input");
// Selecting the button element for the search
const searchBtn = document.querySelector(".search button");

// Selecting the element for displaying weather icon
const weatherIcon = document.querySelector(".weather-icon");

// Function to check weather for a given city
async function checkWeather(city) {
    // Fetching weather data for the specified city
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
    
    // Handling the response status
    if (response.status == 404) {
        // Displaying error message if city not found
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        // Parsing the JSON data
        const data = await response.json();

        // Updating the HTML with weather information
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = `${data.main.temp} °C`;
        document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
        document.querySelector(".Wind").innerHTML = `${data.wind.speed} Km/h`;

        // Setting the weather icon based on weather condition
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png"; // Corrected typo in "Drizzle"
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
        }

        // Displaying weather information and hiding error message
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

// Adding an event listener to the search button
searchBtn.addEventListener("click", () => {
    // Calling the checkWeather function with the value from the search box
    checkWeather(searchBox.value);
});



