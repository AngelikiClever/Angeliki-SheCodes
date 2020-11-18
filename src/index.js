let now = new Date();
let h2 = document.querySelector("h2");
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

h2.innerHTML = `${day}, ${hour}:${minutes}`;

function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6f7db97d4508405a35031f006368bb76&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function showcity(event) {
  event.preventDefault();
  let cityinput = document.querySelector("#city");

  let h1 = document.querySelector("h1");
  h1.innerHTML = `📍 ${cityinput.value}`;
  searchCity(cityinput.value);
}
let gobutton = document.querySelector("#search-form");
gobutton.addEventListener("submit", showcity);

function showTemp(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = `📍 ${response.data.name}`;
  let citytemp = Math.round(response.data.main.temp);
  let degrees = document.querySelector("#degrees");
  degrees.innerHTML = `${citytemp}`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
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
