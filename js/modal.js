import { DELETED_CLASS } from './const-variable.js';

const clearModal = () => {
  const modalMessage = document.querySelector('.modal p');
  modalMessage.remove();

  const modalButtons = document.querySelectorAll('.modal input');
  for (let i = 0; i < modalButtons.length; i++) {
    modalButtons[i].remove();
  }
};

export const closeModal = (e) => {
  e.preventDefault();
  const targetModal = e.target.parentNode.parentNode.parentNode;
  targetModal.classList.add(DELETED_CLASS);

  clearModal();
};

export const escModalClose = (e) => {
  if (e.key === 'Escape') {
    const targetModal = document.querySelector('.modal');
    targetModal.classList.add(DELETED_CLASS);
    clearModal();
  }
};

export const handleLogoutModal = (e) => {
  e.preventDefault();
  const loginContainer = document.querySelector('.login');
  const greeting = document.querySelector('.greeting');
  const todo = document.querySelector('.todo');

  window.location.reload();
  loginContainer.classList.remove(DELETED_CLASS);
  todo.classList.add(DELETED_CLASS);
  greeting.classList.add(DELETED_CLASS);
  localStorage.clear();
};
