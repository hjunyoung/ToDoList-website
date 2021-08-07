import { toggleMenu } from './clock.js';
import { settingMenu } from './color-setting.js';
import { DELETED_CLASS } from './const-variable.js';
import { greetingSettingMenu } from './greeting.js';

export const retainSettingMenu = (settingTarget, opacityTarget) => {
  if (settingTarget.classList.contains(DELETED_CLASS)) {
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
  if (
    !settingTarget.classList.contains(DELETED_CLASS) &&
    !settingTarget.contains(target)
  ) {
    settingTarget.classList.add(DELETED_CLASS);
    retainSettingMenu(settingTarget, opacityTarget);
  }
};
export const handleSettingMouseLeave = (settingTarget, opacityTarget) => {
  retainSettingMenu(settingTarget, opacityTarget);
};
export const handleSettingClick = (settingTarget) => {
  if (settingTarget === toggleMenu) {
    settingMenu.classList.add(DELETED_CLASS);
    greetingSettingMenu.classList.add(DELETED_CLASS);
  } else if (settingTarget === settingMenu) {
    toggleMenu.classList.add(DELETED_CLASS);
    greetingSettingMenu.classList.add(DELETED_CLASS);
  } else if (settingTarget === greetingSettingMenu) {
    settingMenu.classList.add(DELETED_CLASS);
    toggleMenu.classList.add(DELETED_CLASS);
  }
  settingTarget.classList.toggle(DELETED_CLASS);
};
