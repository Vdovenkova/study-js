'use strict';

// плавная прокрутка к блоку сервис
const slowScrollService = () => {
  const anchor = document.querySelector('a[href*="#service-block"]');
  const block = document.getElementById('service-block');
  anchor.addEventListener('click', (event) => {
    event.preventDefault();
    block.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
  });
};

export default slowScrollService;