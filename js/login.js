const loginContainer = document.querySelector(".login");
const loginForm = loginContainer.querySelector(".login__form");
const loginInput = loginForm.querySelector("#login__form__input");
const greeting = document.querySelector(".greeting");
const userGreeting = greeting.querySelector(".greeting__user");

const DELETED_CLASS = "deleted";
const USERNAME_KEY = "username";

const determineGreeting = () => {
  let greeting;
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    greeting = "Good morning";
  } else if (hour >= 12 && hour < 18) {
    greeting = "Good afternoon";
  } else if (hour >= 18 && hour < 24) {
    greeting = "Good evening";
  } else {
    greeting = "Sleep tight";
  }
  return greeting;
};

const paintUserGreeting = (username) => {
  const greetMessage = `${determineGreeting()}, ${username}`;
  userGreeting.innerText = greetMessage;
  loginForm.classList.add(DELETED_CLASS);
  greeting.classList.remove(DELETED_CLASS);
};

const handleLoginSubmit = (e) => {
  e.preventDefault();
  const username = loginInput.value.trim();
  loginInput.setCustomValidity("");

  if (username) {
    localStorage.setItem(USERNAME_KEY, username);
    paintUserGreeting(username);
  } else {
    loginInput.setCustomValidity("Only spaces are not allowed");
  }
  loginInput.reportValidity();
  loginInput.value = "";
  loginInput.focus();
};

const handleKeyDownSubmit = () => {
  loginInput.setCustomValidity("");
};

const handleLoad = (e) => {
  let localUsername = localStorage.getItem(USERNAME_KEY);
  if (localUsername) {
    paintUserGreeting(localUsername);
    setInterval(paintUserGreeting, 1000, localUsername);
  } else {
    loginContainer.classList.remove(DELETED_CLASS);
    loginForm.addEventListener("submit", handleLoginSubmit);
    loginForm.addEventListener("keydown", handleKeyDownSubmit);
  }
};

window.addEventListener("load", handleLoad);
