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
  "December"
];
let month = months[now.getMonth()];
let date = now.getDate();
let hour = now.getHours();
if (hour < 10) {
    hour = `0${hour}`;
  };
let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  };

let currentDate = document.querySelector("h1");
currentDate.innerHTML = `${day}, ${month} ${date} | ${hour}:${minutes}`;


function searchCity(event) {
  event.preventDefault();
  let input = document.querySelector("#search-city");
  let city = document.querySelector("h2");
  city.innerHTML = input.value;
  let cityPlace = input.value;
  let apiKey = "b04c9198b269a6dc1e1c56f8b82a5caa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityPlace}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showTemperature);

}



function showTemperature(response) {
  let cityTemperature = Math.round(response.data.main.temp);
  let todayTemperature = document.querySelector("#temperature");
  temperature.innerHTML = `${cityTemperature}`;
}

let citySearch = document.querySelector("#search-city");
citySearch.addEventListener("submit", searchCity);


function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "b04c9198b269a6dc1e1c56f8b82a5caa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
navigator.geolocation.getCurrentPosition(showPosition);

let form = document.querySelector("#current-city");
form.addEventListener("submit", searchCity);

let findMe = document.querySelector("#location");
findMe.addEventListener("submit", showPosition);



function showFarenheit(event) {
  event.preventDefault();
  let degreesFarenheit = document.querySelector("#temperature");
  let temperature = degreesFarenheit.innerHTML;
  temperature = Number(temperature);
  degreesFarenheit.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

function showCelsius(event) {
  event.preventDefault();
  let degreesCelsius = document.querySelector("#temperature");
  let temperature = degreesCelsius.innerHTML;
  temperature = Number(temperature);
  degreesCelsius.innerHTML = Math.round((temperature - 32) / 1.8);
}

let farenheitButton = document.querySelector("#farenheit");
farenheitButton.addEventListener("click", showFarenheit);

let celsiusButton = document.querySelector("#celsius");
celsiusButton.addEventListener("click", showCelsius);

