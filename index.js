let apiKey = `tb68bfo76465b10730ef185037e7aaa0`;
let defaultCity = "Kharkiv";

const getApiUrl = (city, type) => {
  return `https://api.shecodes.io/weather/v1/${type}?query=${city}&key=${apiKey}&units=metric`;
};

const initWeather = () => {
  search(defaultCity);
};

const getCurrentCityWeather = (city) => {
  let apiUrlCurrent = getApiUrl(city, "current");
  axios.get(apiUrlCurrent).then(refreshWeather);
};

const getCityForecast = (city) => {
  let apiUrlCurrent = getApiUrl(city, "forecast");
  axios.get(apiUrlCurrent).then(displayForecast);
};

function search(city) {
  getCurrentCityWeather(city);
  getCityForecast(city);
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = [`Sun`, `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`];

  return days[date.getDay()];
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="forecast-day">
          <div class="forecast-date">${formatDay(day.time)}</div>
          <div><img src="${
            day.condition.icon_url
          }" class="forecast-icon" /></div>
          <div class="forecast-temps">
            <div class="temps-set"><strong>${Math.round(
              day.temperature.maximum
            )}°</strong></div>
            <div class="temps-set">${Math.round(day.temperature.minimum)}°</div>
         </div>
        </div>`;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

initWeather();
