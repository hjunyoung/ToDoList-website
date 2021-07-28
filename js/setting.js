const { body } = document;
const setting = document.querySelector('.setting');
const settingIcon = document.querySelector('.setting__icon');
const settingMenu = setting.querySelector('.setting__menu');

const fontSetting = settingMenu.querySelector('.setting--font');
const settingSaveButton = settingMenu.querySelector('[type=submit]');

const FONT_COLOR_KEY = 'font-color';
let fontColor;

const storeFontColor = (e) => {
  fontColor = e.target.value;
  body.style.color = fontColor;
};

const saveSetting = (e) => {
  e.preventDefault();
  const newFontColor = fontColor;
  localStorage.setItem(FONT_COLOR_KEY, newFontColor);

  settingMenu.classList.add('deleted');
};

fontSetting.addEventListener('input', storeFontColor);
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
  const fontColor = localStorage.getItem(FONT_COLOR_KEY);
  body.style.color = fontColor;
});
