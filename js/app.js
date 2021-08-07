import getCurrentDate from './calendar.js';
import { getTime } from './clock.js';
import { loadColor } from './color-setting.js';
import loadUser from './login-logout.js';
import loadWeather from './weather.js';

const handleLoad = () => {
  loadUser();
  loadColor();
  loadWeather();
  getCurrentDate();
  setInterval(getCurrentDate, 1000);
  getTime();
  setInterval(getTime, 1000);
};

window.addEventListener('load', handleLoad);
