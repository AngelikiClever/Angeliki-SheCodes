let now = new Date();
let h2 = document.querySelector("#currentdate");
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
let hour = now.getHours();
let minutes = now.getMinutes();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

h2.innerHTML = `${day}, ${hour}:${minutes}`;

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function displayForecast(response) {
  let forecastelement = querySelector("#forecast");
  forecastelement = response.data.list[0];
  forecastelement.innerHTML = `
  <div class="col">
                    <div class="card border-info mb-3" style="max-width: 11rem;">
                        <div class="card-header">
                        ${formatHours(forecast.dt * 1000)}
                        </div>
                        <div class="card-body text-info">
                          <img
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
      />
                          <div class="forecast-temperature">
        <strong>
          ${Math.round(forecast.main.temp_max)}°
        </strong>
        ${Math.round(forecast.main.temp_min)}°
      </div>
                        </div>
                      </div>
                </div>
                `
}


function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6f7db97d4508405a35031f006368bb76&units=metric`;
  axios.get(apiUrl).then(showTemp);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=6f7db97d4508405a35031f006368bb76&units=metric`;
axios.get(apiURL).then(displayForecast);
}

function showcity(event) {
  event.preventDefault();
  let cityinput = document.querySelector("#searchcity");

  let h1 = document.querySelector("#city");
  h1.innerHTML = `📍 ${cityinput.value}`;
  searchCity(cityinput.value);
}
let gobutton = document.querySelector("#search-form");
gobutton.addEventListener("submit", showcity);

function showTemp(response) {
  let h1 = document.querySelector("#city");
  h1.innerHTML = `📍 ${response.data.name}`;
  let citytemp = Math.round(response.data.main.temp);
  let degrees = document.querySelector("#degrees");
  degrees.innerHTML = `${citytemp}`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)

  let weatherdescription = document.querySelector("#weatherdescription");
  
  weatherdescription.innerHTML = `${response.data.weather[0].description}`;
  let windspeed = document.querySelector("#windspeed");
  windspeed.innerHTML = `${response.data.wind.speed}`
    let humidityvalue = document.querySelector("#humidityvalue");
  humidityvalue.innerHTML = `${response.data.main.humidity}`;
}


function handlePosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=6f7db97d4508405a35031f006368bb76&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function currenttemp(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}
let currentbutton = document.querySelector("#current");
currentbutton.addEventListener("click", currenttemp);
