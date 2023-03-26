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
dateNow.innerHTML = `${week} , ${month} ${day} , ${hours}:${minutes}`;

function currentWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temper").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#feel").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  console.log(response);
}

function searchCity(event) {
  event.preventDefault();
  let apiKey = "14b1295e6278c892741e59a1fb2f8b65";
  let city = document.querySelector("#search-text").value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(currentWeather);
}

function currentPlace(position) {
  let apiKey = "14b1295e6278c892741e59a1fb2f8b65";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(currentWeather);
}

navigator.geolocation.getCurrentPosition(currentPlace);
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);
