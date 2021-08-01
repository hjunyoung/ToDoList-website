/* eslint-disable no-undef */
const content = document.querySelector('.content');

const loginContainer = document.querySelector('.login');
const loginForm = loginContainer.querySelector('.login__form');
const loginInput = loginForm.querySelector('#login__form__input');
const greeting = document.querySelector('.greeting');
const userGreeting = greeting.querySelector('.greeting__user');
const logoutButton = greeting.querySelector('.logout');

const DELETED_CLASS = 'deleted';
const USERNAME_KEY = 'username';

const determineGreeting = () => {
  let greeting;
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    greeting = 'Good morning';
  } else if (hour >= 12 && hour < 18) {
    greeting = 'Good afternoon';
  } else if (hour >= 18 && hour < 24) {
    greeting = 'Good evening';
  } else {
    greeting = 'Sleep tight';
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
  logoutModal.classList.remove('deleted');

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
  window.addEventListener('keydown', ecsModalClose);
};

const handleLoad = (e) => {
  let localUsername = localStorage.getItem(USERNAME_KEY);
  if (localUsername) {
    paintUserGreeting(localUsername);
    setInterval(paintUserGreeting, 1000, localUsername);
    logoutButton.addEventListener('click', handleLogout);
  } else {
    loginContainer.classList.remove(DELETED_CLASS);
    loginForm.addEventListener('submit', handleLoginSubmit);
    loginForm.addEventListener('keydown', handleKeyDownSubmit);
  }
};

window.addEventListener('load', handleLoad);
