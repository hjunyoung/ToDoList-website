import {
  handleSettingClick,
  handleSettingMouseEnter,
  handleSettingMouseLeave,
  handleSettingBlur,
} from './setting.js';

const greeting = document.querySelector('.greeting');
const greetingSettingIcon = greeting.querySelector('.greeting__setting p');
const greetingSettingMenu = greeting.querySelector('.greeting__setting-menu');

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

export { greeting, greetingSettingMenu };
