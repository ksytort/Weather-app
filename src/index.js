let now = new Date();

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${hours}`;
}
let weeks = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "Desember",
];
let day = now.getDate();
let week = weeks[now.getDay()];
let month = months[now.getMonth()];
let dateNow = document.querySelector("#nowdate");
dateNow.innerHTML = `${week} , ${month} ${day}, ${hours}:${minutes}`;

function formatDay(time) {
  let date = new Date(time * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
      <div class="card">
     ${formatDay(forecastDay.time)}
     <img
            src="${forecastDay.condition.icon_url}"
            alt=""
            width="60px"
          />
     <div class="weather-forecast-temperatures">
     <span class="weather-forecast-temperature-max"> ${Math.round(
       forecastDay.temperature.maximum
     )}º </span>/
     <span class="weather-forecast-temperature-min"> ${Math.round(
       forecastDay.temperature.minimum
     )}º </span>
         </div>
        </div>
      </div>
      `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "30602227b280a95fa57tboc2a111d0b4";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function currentWeather(response) {
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#temper").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
  document.querySelector("#feel").innerHTML = Math.round(
    response.data.temperature.feels_like
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.condition.icon_url);
  getForecast(response.data.coordinates);

  console.log(response);
}

function searchCity(city) {
  let apiKey = "30602227b280a95fa57tboc2a111d0b4";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(url).then(currentWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-text");
  searchCity(cityInputElement.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

searchCity("Kyiv");
