/* eslint-disable no-unused-vars */
const closeModal = (e) => {
  e.preventDefault();
  const targetModal = e.target.parentNode.parentNode.parentNode;
  targetModal.classList.add('deleted');
};

const ecsModalClose = (e) => {
  if (e.key === 'Escape') {
    const targetModal = document.querySelector('.modal');
    targetModal.classList.add('deleted');
  }
};
