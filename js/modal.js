/* eslint-disable no-unused-vars */
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
  targetModal.classList.add('deleted');

  clearModal();
};

export const escModalClose = (e) => {
  if (e.key === 'Escape') {
    const targetModal = document.querySelector('.modal');
    targetModal.classList.add('deleted');
    clearModal();
  }
};

export const handleLogoutModal = (e) => {
  e.preventDefault();
  const loginContainer = document.querySelector('.login');
  const greeting = document.querySelector('.greeting');
  const todo = document.querySelector('.todo');

  window.location.reload();
  loginContainer.classList.remove('deleted');
  todo.classList.add('deleted');
  greeting.classList.add('deleted');
  localStorage.clear();
};
