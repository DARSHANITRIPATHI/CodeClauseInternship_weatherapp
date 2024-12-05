const apiKey = "YOUR_API_KEY";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status === 404) {
      document.querySelector(".weather").style.display = "none"; // Hide weather
      document.querySelector(".error").style.display = "block"; // Show error
    } else {
      const data = await response.json();

      // Update weather details
      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML =
        Math.round(data.main.temp) + "°C";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

      // Update weather icon
      if (data.weather && data.weather[0]) {
        switch (data.weather[0].main) {
          case "Clouds":
            weatherIcon.src = "images/clouds.png";
            break;
          case "Rain":
            weatherIcon.src = "images/rain.png";
            break;
          case "Clear":
            weatherIcon.src = "images/clear.png";
            break;
          case "Drizzle":
            weatherIcon.src = "images/drizzle.png";
            break;
          case "Mist":
            weatherIcon.src = "images/mist.png";
            break;
          default:
            weatherIcon.src = "images/default.png";
            break;
        }
      }

      document.querySelector(".weather").style.display = "block"; // Show weather
      document.querySelector(".error").style.display = "none"; // Hide error
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("An error occurred. Please try again later.");
  }
}

searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim(); // Get the value from the input field
  if (city) {
    checkWeather(city); // Call the function with the city name
  } else {
    alert("Please enter a city name.");
  }
});
