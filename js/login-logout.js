import { closeModal, escModalClose, handleLogoutModal } from './modal.js';
import { DELETED_CLASS, USERNAME_KEY } from './const-variable.js';
import loadTodo from './todo.js';
import { greeting, greetingSettingMenu } from './greeting.js';

const loginContainer = document.querySelector('.login');
const loginForm = loginContainer.querySelector('.login__form');
const loginInput = loginForm.querySelector('.login__input');
const userGreeting = greeting.querySelector('.greeting__user');
const logoutButton = greeting.querySelector('.logout');

const determineGreeting = () => {
  let greetingMessage;
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    greetingMessage = 'Good morning';
  } else if (hour >= 12 && hour < 18) {
    greetingMessage = 'Good afternoon';
  } else if (hour >= 18 && hour < 24) {
    greetingMessage = 'Good evening';
  } else {
    greetingMessage = 'Sleep tight';
  }
  return greetingMessage;
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
  loginInput.setCustomValidity('');

  if (username) {
    localStorage.setItem(USERNAME_KEY, username);
    paintUserGreeting(username);
    window.location.reload();
  } else {
    loginInput.setCustomValidity('Only spaces are not allowed');
  }
  loginInput.reportValidity();
  loginInput.value = '';
  loginInput.focus();
};

const handleKeyDownSubmit = () => {
  loginInput.setCustomValidity('');
};

const handleLogout = (e) => {
  e.preventDefault();
  const logoutModal = document.querySelector('.modal');
  greetingSettingMenu.classList.add(DELETED_CLASS);
  logoutModal.classList.remove(DELETED_CLASS);

  const modalContent = document.querySelector('.modal__content');
  const buttonArea = document.querySelector('.modal__button');
  const confirmMessage = document.createElement('p');
  const yesButton = document.createElement('input');
  const noButton = document.createElement('input');

  yesButton.type = 'submit';
  yesButton.value = 'Yes';
  noButton.type = 'submit';
  noButton.value = 'No';

  confirmMessage.innerText =
    'Your todolist will be deleted. \n Are you sure you want to logout?';

  modalContent.appendChild(confirmMessage);
  buttonArea.appendChild(yesButton);
  buttonArea.appendChild(noButton);

  yesButton.addEventListener('click', handleLogoutModal);
  noButton.addEventListener('click', closeModal);
  window.addEventListener('keydown', escModalClose);
};

const showContainers = () => {
  const setting = document.querySelector('.setting');
  const weather = document.querySelector('.weather');
  const weatherForecast = document.querySelector('.weather-forecast');
  const todo = document.querySelector('.todo');
  const game = document.querySelector('.game');

  setting.classList.remove(DELETED_CLASS);
  weather.classList.remove(DELETED_CLASS);
  weatherForecast.classList.remove(DELETED_CLASS);
  todo.classList.remove(DELETED_CLASS);
  game.classList.remove(DELETED_CLASS);
  loadTodo();
};

const loadUser = () => {
  const localUsername = localStorage.getItem(USERNAME_KEY);
  const content = document.querySelector('.content');
  const githubIcon = document.querySelector('.github');
  const clock = document.querySelector('.clock');
  const calendar = document.querySelector('.calendar');

  if (localUsername) {
    paintUserGreeting(localUsername);
    setInterval(paintUserGreeting, 1000, localUsername);
    logoutButton.addEventListener('click', handleLogout);
    showContainers();

    // remove logout class
    content.classList.remove('content-logout');
    githubIcon.classList.remove('github-logout');
    clock.classList.remove('clock-logout');
    calendar.classList.remove('calendar-logout');
  } else {
    loginContainer.classList.remove(DELETED_CLASS);
    loginForm.addEventListener('submit', handleLoginSubmit);
    loginForm.addEventListener('keydown', handleKeyDownSubmit);

    //  add logout class
    content.classList.add('content-logout');
    githubIcon.classList.add('github-logout');
    clock.classList.add('clock-logout');
    calendar.classList.add('calendar-logout');
  }
};

export default loadUser;
