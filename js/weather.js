import API_KEY from './api-key.js';

const handleGeoSuccess = (GeolocationPosition) => {
  const {
    coords: { latitude },
  } = GeolocationPosition;
  const {
    coords: { longitude },
  } = GeolocationPosition;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const weather = document.querySelector('.weather');
      const temperature = weather.querySelector('.temperature');
      const weatherIcon = weather.querySelector('.weather__icon');
      const city = weather.querySelector('.city-name');

      temperature.innerText = `${data.main.temp.toFixed(1)}℃`;
      weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      weatherIcon.alt = `${data.weather[0].main}`;
      city.innerText = `@ ${data.name}`;
    });
};

const handleGeoFail = () => {
  const geoModal = document.querySelector('.modal');
  geoModal.classList.remove('deleted');

  const modalContent = document.querySelector('.modal__content');
  const buttonArea = document.querySelector('.modal__button');
  const failMessage = document.createElement('p');
  const closeButton = document.createElement('input');
  failMessage.innerText = "Can't find you. No weather for you.";
  closeButton.type = 'submit';
  closeButton.value = 'Okay';
  closeButton.addEventListener('click', closeModal);

  modalContent.appendChild(failMessage);
  buttonArea.appendChild(closeButton);
  window.addEventListener('keydown', ecsModalClose);
};

navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoFail);
