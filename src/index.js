//day and time
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
console.log(day);
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let div = document.querySelector("div .local-time");
div.innerHTML = `Your local time: ${day}, ${hours}:${minutes}`;

// form submit
let formInput = document.querySelector("#search-form");
formInput.addEventListener("submit", showValue);

function showValue(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-field").value;
  showCity(searchInput);
}

function showCity(searchInput) {
  let apiUrl =
    `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&units=metric&appid=5d2f35015df0ea7c61fd5ee9a6f153b5`;
  axios.get(apiUrl).then(showWeather);
}

displayForecast();

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"]
  days.forEach(function (day) {
    
      forecastHTML = forecastHTML +
        `
        <div class="col-2">
          <div class="weather-forecast-date">${day}</div>
          <img
            src="http://openweathermap.org/img/wn/50d@2x.png"
            alt=""
            width="42"
          />
        </br>
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max"> 18° </span>
            <span class="weather-forecast-temperature-min"> 12° </span>
          </div>
        </div>
      `;    
    }
  );

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showWeather(response) {
    document.querySelector("#city").innerHTML = response.data.name;
    let temperature = Math.round(response.data.main.temp);
    let temperatureElement = document.querySelector("#temperatureElement");
      temperatureElement.innerHTML = `${temperature}°C`;
    let humidityElement = document.querySelector("#humidity");
      humidityElement.innerHTML = response.data.main.humidity;
    let windElement = document.querySelector("#wind");
      windElement.innerHTML = Math.round(response.data.wind.speed);
    let descriptionElement = document.querySelector("#description");
      descriptionElement.innerHTML = response.data.weather[0].description;
    let iconElement = document.querySelector("#icon");
      iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      );
      iconElement.setAttribute("alt", response.data.weather[0].description);
  }