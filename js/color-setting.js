import changeGithubImage from './github-icon.js';
import {
  handleSettingClick,
  handleSettingMouseEnter,
  handleSettingMouseLeave,
  handleSettingBlur,
} from './setting.js';
import { DELETED_CLASS } from './const-variable.js';

const { body } = document;
const setting = document.querySelector('.setting');
const settingMenu = setting.querySelector('.setting__menu');

const fontSetting = settingMenu.querySelector('.setting--font');
const backgroundSetting = settingMenu.querySelector('.setting--background');
const settingSaveButton = settingMenu.querySelector('.save-button');
const settingResetButton = settingMenu.querySelector('.reset-button');

const FONT_COLOR_KEY = 'font-color';
const BACKGROUND_COLOR_KEY = 'background-color';

const backgroundColorArray = [
  '#9a515c',
  '#3c6844',
  '#ae6d24',
  '#4f6f44',
  '#446f6c',
  '#6a677e',
  '#7d647c',
];
const randomNumber = Math.floor(Math.random() * backgroundColorArray.length);
let fontColor = localStorage.getItem(FONT_COLOR_KEY) || '#DEDEDE';
let backgroundColor =
  localStorage.getItem(BACKGROUND_COLOR_KEY) ||
  backgroundColorArray[randomNumber];

const storeFontColor = (e) => {
  fontColor = e.target.value;
  body.style.color = fontColor;
};

const storeBackgroundColor = (e) => {
  backgroundColor = e.target.value;
  body.style.backgroundColor = backgroundColor;
  changeGithubImage(backgroundColor);
};

const saveSetting = (e) => {
  e.preventDefault();
  localStorage.setItem(FONT_COLOR_KEY, fontColor);
  localStorage.setItem(BACKGROUND_COLOR_KEY, backgroundColor);

  settingMenu.classList.add(DELETED_CLASS);
};

const resetSetting = (e) => {
  e.preventDefault();

  let resetRandomNumber;
  do {
    resetRandomNumber = Math.floor(Math.random() * backgroundColorArray.length);
  } while (resetRandomNumber === randomNumber);

  localStorage.removeItem(FONT_COLOR_KEY);
  localStorage.removeItem(BACKGROUND_COLOR_KEY);

  settingMenu.classList.add(DELETED_CLASS);
  backgroundColor = backgroundColorArray[resetRandomNumber];
  body.style.backgroundColor = backgroundColor;
};

fontSetting.addEventListener('input', storeFontColor);
backgroundSetting.addEventListener('input', storeBackgroundColor);
settingSaveButton.addEventListener('click', saveSetting);
settingResetButton.addEventListener('click', resetSetting);

setting.addEventListener('mouseenter', () => {
  handleSettingMouseEnter(setting);
});
setting.addEventListener('mouseleave', () => {
  handleSettingMouseLeave(settingMenu, setting);
});
setting.addEventListener('click', (e) => {
  e.stopPropagation();
  handleSettingClick(settingMenu);
});

window.addEventListener('click', (e) => {
  handleSettingBlur(e, settingMenu, setting);
});

const loadColor = () => {
  const fontInputArea = fontSetting.querySelector('input');
  const backgroundInputArea = backgroundSetting.querySelector('input');

  body.style.color = fontColor;
  body.style.backgroundColor = backgroundColor;

  fontInputArea.value = fontColor;
  backgroundInputArea.value = backgroundColor;

  changeGithubImage(backgroundColor);
};

export { loadColor, settingMenu };
