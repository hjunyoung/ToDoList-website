const setting = document.querySelector('.setting');
const settingIcon = document.querySelector('.setting__icon');
const settingMenu = setting.querySelector('.setting__menu');

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
