import { DELETED_CLASS, USERNAME_KEY } from './const-variable.js';
import {
  handleSettingClick,
  handleSettingMouseEnter,
  handleSettingMouseLeave,
  handleSettingBlur,
} from './setting.js';

const greeting = document.querySelector('.greeting');
const greetingSettingIcon = greeting.querySelector('.greeting__setting p');
const greetingSettingMenu = greeting.querySelector('.greeting__setting-menu');
const changeNameButton = greeting.querySelector('.change-name');

greeting.addEventListener('mouseenter', () => {
  handleSettingMouseEnter(greetingSettingIcon);
});

greeting.addEventListener('mouseleave', () => {
  handleSettingMouseLeave(greetingSettingMenu, greetingSettingIcon);
});

greetingSettingIcon.addEventListener('click', (e) => {
  e.stopPropagation();
  handleSettingClick(greetingSettingMenu);
});

window.addEventListener('click', (e) => {
  handleSettingBlur(e, greetingSettingMenu, greetingSettingIcon);
});

const saveNewUsername = (e, username) => {
  const originalName = localStorage.getItem(USERNAME_KEY);
  if (e.key === 'Escape') {
    username.innerText = originalName;
    username.setAttribute('contenteditable', false);
  } else if (e.key === 'Enter') {
    if (username.innerText.trim()) {
      localStorage.setItem(USERNAME_KEY, username.innerText);
    } else {
      localStorage.setItem(USERNAME_KEY, originalName);
      username.innerText = originalName;
    }
    username.setAttribute('contenteditable', false);
  }
};

const unfocusName = (username) => {
  const originalName = localStorage.getItem(USERNAME_KEY);
  username.innerText = originalName;
  username.setAttribute('contenteditable', false);
};

const changeName = (e) => {
  greetingSettingMenu.classList.add(DELETED_CLASS);
  const name = greeting.querySelector('span');
  name.setAttribute('contenteditable', true);
  name.setAttribute('spellcheck', false);

  const range = document.createRange();
  const selection = window.getSelection();

  range.setStart(name, 1);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
  name.focus();

  window.addEventListener('keydown', (event) => {
    saveNewUsername(event, name);
  });
  name.addEventListener('blur', () => {
    unfocusName(name);
  });
};

changeNameButton.addEventListener('click', changeName);

export { greeting, greetingSettingMenu };
