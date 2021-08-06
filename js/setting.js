export const retainSettingMenu = (settingTarget, opacityTarget) => {
  if (settingTarget.classList.contains('deleted')) {
    opacityTarget.style.opacity = 0.4;
  } else {
    opacityTarget.style.opacity = 1;
  }
};
export const handleSettingMouseEnter = (opacityTarget) => {
  opacityTarget.style.opacity = 1;
};
export const handleSettingBlur = (e, settingTarget, opacityTarget) => {
  const { target } = e;
  if (!settingTarget.contains(target)) {
    settingTarget.classList.add('deleted');
    retainSettingMenu(settingTarget, opacityTarget);
  }
};
export const handleSettingMouseLeave = (settingTarget, opacityTarget) => {
  retainSettingMenu(settingTarget, opacityTarget);
};
export const handleSettingClick = (e, settingTarget) => {
  e.stopPropagation();
  settingTarget.classList.toggle('deleted');
};
