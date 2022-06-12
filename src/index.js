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