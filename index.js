let apiKey = `tb68bfo76465b10730ef185037e7aaa0`;
function search(city) {
  let temp = city;
  if (!temp) {
    console.log("if");
    temp = "Kharkiv";
  }

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${temp}&key=${apiKey}&units=metric`;
  console.log(apiUrl, "apiUrl");
  axios.get(apiUrl).then(refreshWeather);
}

function refreshWeather(response) {
  let temperature = Math.round(response.data.temperature.current);
  let humidity = response.data.temperature.humidity;
  let wind = response.data.wind.speed;
  let condition = response.data.condition.description;
  let wPic = response.data.condition.icon_url;
  let date = new Date(response.data.time * 1000);

  let tempElement = document.querySelector("#temp");
  let foundCity = document.querySelector("h1#current-city");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let conditionElement = document.querySelector("#condition");
  let wPicElement = document.querySelector("#ct-icon");
  let timeElement = document.querySelector("#time");

  tempElement.innerHTML = `${temperature}`;
  foundCity.innerHTML = response.data.city;
  humidityElement.innerHTML = `${humidity}%`;
  windElement.innerHTML = `${wind}km/h`;
  conditionElement.innerHTML = `${condition}`;
  wPicElement.innerHTML = `<img src="${wPic}" />`;
  timeElement.innerHTML = formatDate(date);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSearch);

function handleSearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-text-input");
  let city = cityInput.value;
  search(city);
}

search();
