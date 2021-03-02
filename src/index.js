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


function showTemperature(response) {
console.log(response.data);
  let cityTemperature = Math.round(response.data.main.temp);
  temperature.innerHTML = `${cityTemperature}`;
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let pressure = document.querySelector("#pressure");
  pressure.innerHTML = response.data.main.pressure;
  let realFeel = document.querySelector("#realFeel");
  realFeel.innerHTML = Math.round(response.data.main.feels_like);

  let sunriseConversion = new Date(response.data.sys.sunrise * 1000);
  hour = sunriseConversion.getUTCHours();
  minutes = sunriseConversion.getUTCMinutes();
  formattedSunrise = hour.toString().padStart(2, '0') + ':' +  
                minutes.toString().padStart(2, '0');
  document.querySelector("#sunR").innerHTML = formattedSunrise;

  let sunsetConversion = new Date(response.data.sys.sunset * 1000);
  hour = sunsetConversion.getUTCHours();
  minutes = sunsetConversion.getUTCMinutes();
  formattedSunset = hour.toString().padStart(2, '0') + ':' +  
                minutes.toString().padStart(2, '0');
  document.querySelector("#sunS").innerHTML = formattedSunset;
  
}



function searchCity(event) {
  event.preventDefault();
  let input = document.querySelector("#search-city");
  let cityPicked = input.value;
  let apiKey = "b04c9198b269a6dc1e1c56f8b82a5caa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityPicked}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

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

