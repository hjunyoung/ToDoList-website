const clockContainer = document.querySelector(".clock");
const clock = clockContainer.querySelector(".clock h1");

const settingContainer = document.querySelector(".clock__setting");
const settingButton = settingContainer.querySelector(".clock__setting span");

const toggleMenu = document.querySelector(".clock__setting-toggle");
const toggleButton = toggleMenu.querySelector(".toggle-outer");
const toggleIndex = toggleMenu.querySelector(".toggle-inner");

const CLOCK_12HOUR_CLASS = "clock-12hour";

const getTime = () => {
  const date = new Date();
  let hours = date.getHours();
  if (hours > 12 && clock.classList.contains(CLOCK_12HOUR_CLASS)) {
    hours -= 12;
  }
  hours = String(hours);
  const minutes = String(date.getMinutes());
  const time = `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
  clock.innerText = time;
};

const handleToggleClockMode = (e) => {
  e.stopPropagation();
  clock.classList.toggle(CLOCK_12HOUR_CLASS);
  toggleButton.classList.toggle("hour12-outer");
  toggleIndex.classList.toggle("hour12-inner");
  getTime();
};

const showClockMode = () => {
  if (!toggleMenu.classList.contains("hidden")) {
    settingContainer.style.opacity = "1";
  } else {
    settingContainer.style.opacity = "0";
  }
};

const handleClockSettingClick = (e) => {
  toggleMenu.classList.toggle("hidden");
  showClockMode();
};

const handleMouseOverClock = (e) => {
  settingContainer.style.opacity = "1";
};
const handleMouseLeaveClock = (e) => {
  showClockMode();
};

getTime();
setInterval(getTime, 1000);
settingButton.addEventListener("click", handleClockSettingClick);
clockContainer.addEventListener("mouseover", handleMouseOverClock);
clockContainer.addEventListener("mouseleave", handleMouseLeaveClock);
toggleMenu.addEventListener("click", handleToggleClockMode);
