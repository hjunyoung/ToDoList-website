import API_KEY from './api-key.js';
import { DELETED_CLASS, USERNAME_KEY } from './const-variable.js';

const getCurrentWeather = (url) => {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const weather = document.querySelector('.weather');
      const temperature = weather.querySelector('.temperature');
      const humidity = weather.querySelector('.humidity');
      const weatherIcon = weather.querySelector('.weather__icon');
      const weatherDescription = weather.querySelector(
        '.weather__description--icon p'
      );
      const city = weather.querySelector('.city-name');

      temperature.innerText = `${data.main.temp.toFixed(1)}℃`;
      weatherDescription.innerText = data.weather[0].main;
      humidity.innerText = `${data.main.humidity}%`;
      weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      weatherIcon.alt = `${data.weather[0].main}`;

      const countryCode = data.sys.country;
      const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
      const country = regionNames.of(countryCode);
      city.innerText = `${data.name}, ${country}`;
    });
};

const getDayArray = () => {
  const dayArray = [];
  const days = {
    0: 'Sun',
    1: 'Mon',
    2: 'Tue',
    3: 'Wed',
    4: 'Thu',
    5: 'Fri',
    6: 'Sat',
  };
  for (let i = 1; i <= 7; i++) {
    const now = new Date();
    let index = now.getDay() + i;
    index = index > 6 ? index - 7 : index;
    dayArray.push(days[index]);
  }
  return dayArray;
};

const getWeatherForecast = (url) => {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const forecastContainerArray = document.querySelectorAll('.day-later');
      const forecastData = data.daily;
      const dayArray = getDayArray();
      const today = new Date();

      for (let i = 1; i < forecastData.length; i++) {
        const forecastContainer = forecastContainerArray[i - 1];
        const maxTempBox = forecastContainer.querySelector('.max-temp');
        const minTempBox = forecastContainer.querySelector('.min-temp');
        const rainVolumnBox = forecastContainer.querySelector('.rain-volumn');
        const weatherBox = forecastContainer.querySelector(
          '.weather-description'
        );
        const IconBox = forecastContainer.querySelector('.icon');
        const dateBox = forecastContainer.querySelector('.date');
        const dayBox = forecastContainer.querySelector('.day');

        const maxTemp = document.createElement('p');
        const minTemp = document.createElement('p');
        const rainVolumn = document.createElement('p');
        const weather = document.createElement('p');
        const weatherIcon = document.createElement('img');
        const date = document.createElement('p');
        const day = document.createElement('p');

        maxTemp.innerHTML = `${forecastData[i].temp.max.toFixed(
          1
        )}<span> ℃</span>`;
        minTemp.innerHTML = `${forecastData[i].temp.min.toFixed(
          1
        )}<span> ℃</span>`;
        rainVolumn.innerHTML = `${
          forecastData[i].rain || 0
        }<br><span>mm/h</span>`;
        weather.innerText = `${forecastData[i].weather[0].main}`;
        weatherIcon.src = `http://openweathermap.org/img/wn/${forecastData[i].weather[0].icon}.png`;
        today.setDate(today.getDate() + 1);
        date.innerText = `${today.getMonth() + 1}/${today.getDate()}`;
        day.innerText = dayArray[i - 1];

        maxTempBox.appendChild(maxTemp);
        minTempBox.appendChild(minTemp);
        rainVolumnBox.appendChild(rainVolumn);
        weatherBox.appendChild(weather);
        IconBox.appendChild(weatherIcon);
        dateBox.appendChild(date);
        dayBox.appendChild(day);
      }
    });
};

const handleGeoSuccess = (GeolocationPosition) => {
  const {
    coords: { latitude },
  } = GeolocationPosition;
  const {
    coords: { longitude },
  } = GeolocationPosition;
  const urlCurrentWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
  const urlWeatherForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=hourly,minutely&appid=${API_KEY}`;

  getCurrentWeather(urlCurrentWeather);
  getWeatherForecast(urlWeatherForecast);
};

const handleGeoFail = () => {
  const messageContainer = document.querySelector('.weather');
  const cloudIcon = document.querySelector('.weather-forecast');
  const weather = document.querySelectorAll('.weather > *');
  const forecast = document.querySelectorAll('.day-later');
  for (let i = 0; i < weather.length; i++) {
    weather[i].classList.add(DELETED_CLASS);
  }
  for (let i = 0; i < forecast.length; i++) {
    forecast[i].classList.add(DELETED_CLASS);
  }

  const cloud = document.createElement('p');
  cloud.innerHTML = `<span><i class="fas fa-cloud"></i>`;
  cloud.classList.add('cloud-icon');
  cloudIcon.appendChild(cloud);

  const failMessage = document.createElement('p');
  failMessage.className = 'no-weather-message';
  failMessage.innerText = "Can't find you. No weather for you.";
  messageContainer.appendChild(failMessage);
};

const loadWeather = () => {
  const localUsername = localStorage.getItem(USERNAME_KEY);
  if (localUsername) {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoFail);
  }
};

export default loadWeather;
