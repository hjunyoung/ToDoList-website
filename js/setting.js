const { body } = document;
const setting = document.querySelector('.setting');
const settingIcon = document.querySelector('.setting__icon');
const settingMenu = setting.querySelector('.setting__menu');

const fontSetting = settingMenu.querySelector('.setting--font');
const backgroundSetting = settingMenu.querySelector('.setting--background');
const settingSaveButton = settingMenu.querySelector('[type=submit]');

const FONT_COLOR_KEY = 'font-color';
const BACKGROUND_COLOR_KEY = 'background-color';
let fontColor;
let backgroundColor;

const storeFontColor = (e) => {
  fontColor = e.target.value;
  body.style.color = fontColor;
};

const storeBackgroundColor = (e) => {
  backgroundColor = e.target.value;
  body.style.backgroundColor = backgroundColor;
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

const retainSettingMenu = () => {
  if (settingMenu.classList.contains('deleted')) {
    settingIcon.classList.add('hidden');
  } else {
    settingIcon.classList.remove('hidden');
  }
};

const handleSettingMouseEnter = () => {
  settingIcon.classList.remove('hidden');
};
const handleSettingMouseLeave = () => {
  retainSettingMenu();
};

const handleSettingClick = () => {
  settingMenu.classList.toggle('deleted');
};

setting.addEventListener('mouseenter', handleSettingMouseEnter);
setting.addEventListener('mouseleave', handleSettingMouseLeave);
settingIcon.addEventListener('click', handleSettingClick);

window.addEventListener('load', () => {
  const defaultFontColor = localStorage.getItem(FONT_COLOR_KEY);
  const defaultBackgroundColor = localStorage.getItem(BACKGROUND_COLOR_KEY);
  const fontInputArea = fontSetting.querySelector('input');
  const backgroundInputArea = backgroundSetting.querySelector('input');

  body.style.color = defaultFontColor;
  body.style.backgroundColor = defaultBackgroundColor;

  fontInputArea.value = defaultFontColor;
  backgroundInputArea.value = defaultBackgroundColor;
});
