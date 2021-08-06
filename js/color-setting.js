import changeGithubImage from './github-icon.js';
import {
  handleSettingClick,
  handleSettingMouseEnter,
  handleSettingMouseLeave,
  handleSettingBlur,
} from './setting.js';

const { body } = document;
const setting = document.querySelector('.setting');
const settingIcon = document.querySelector('.setting__icon');
const settingMenu = setting.querySelector('.setting__menu');

const fontSetting = settingMenu.querySelector('.setting--font');
const backgroundSetting = settingMenu.querySelector('.setting--background');
const settingSaveButton = settingMenu.querySelector('[type=submit]');

const FONT_COLOR_KEY = 'font-color';
const BACKGROUND_COLOR_KEY = 'background-color';
let fontColor = localStorage.getItem(FONT_COLOR_KEY);
let backgroundColor = localStorage.getItem(BACKGROUND_COLOR_KEY);

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

  settingMenu.classList.add('deleted');
};

fontSetting.addEventListener('input', storeFontColor);
backgroundSetting.addEventListener('input', storeBackgroundColor);
settingSaveButton.addEventListener('click', saveSetting);

setting.addEventListener('mouseenter', () => {
  handleSettingMouseEnter(settingIcon);
});
setting.addEventListener('mouseleave', () => {
  handleSettingMouseLeave(settingMenu, settingIcon);
});
settingIcon.addEventListener('click', (e) => {
  handleSettingClick(e, settingMenu);
});

window.addEventListener('click', (e) => {
  handleSettingBlur(e, settingMenu, settingIcon);
});
window.addEventListener('load', () => {
  const defaultFontColor = localStorage.getItem(FONT_COLOR_KEY) || '#DEDEDE';
  const defaultBackgroundColor =
    localStorage.getItem(BACKGROUND_COLOR_KEY) || '#3c6844';
  const fontInputArea = fontSetting.querySelector('input');
  const backgroundInputArea = backgroundSetting.querySelector('input');

  body.style.color = defaultFontColor;
  body.style.backgroundColor = defaultBackgroundColor;

  fontInputArea.value = defaultFontColor;
  backgroundInputArea.value = defaultBackgroundColor;

  changeGithubImage(defaultBackgroundColor);
});
