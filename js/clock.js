import {
  handleSettingClick,
  handleSettingMouseEnter,
  handleSettingMouseLeave,
  handleSettingBlur,
} from './setting.js';

const clockContainer = document.querySelector('.clock');
const clock = clockContainer.querySelector('.clock h1');

const settingContainer = document.querySelector('.clock__setting');
const settingButton = settingContainer.querySelector('.clock__setting span');

const toggleMenu = document.querySelector('.clock__toggle');
const toggleButton = toggleMenu.querySelector('.toggle-outer');
const toggleIndex = toggleMenu.querySelector('.toggle-inner');

const CLOCK_12HOUR_CLASS = 'clock-12hour';

const getTime = () => {
  const date = new Date();
  let hours = date.getHours();
  if (hours > 12 && clock.classList.contains(CLOCK_12HOUR_CLASS)) {
    hours -= 12;
  }
  hours = String(hours);
  const minutes = String(date.getMinutes());
  const time = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
  clock.innerText = time;
};

const handleToggleClockMode = () => {
  clock.classList.toggle(CLOCK_12HOUR_CLASS);
  toggleButton.classList.toggle('hour12-outer');
  toggleIndex.classList.toggle('hour12-inner');
  getTime();
};

clockContainer.addEventListener('mouseenter', () => {
  handleSettingMouseEnter(settingContainer);
});
clockContainer.addEventListener('mouseleave', () => {
  handleSettingMouseLeave(toggleMenu, settingContainer);
});
settingButton.addEventListener('click', (e) => {
  e.stopPropagation();
  handleSettingClick(toggleMenu);
});

toggleMenu.addEventListener('click', handleToggleClockMode);
window.addEventListener('click', (e) => {
  handleSettingBlur(e, toggleMenu, settingContainer);
});

export { getTime, toggleMenu };
