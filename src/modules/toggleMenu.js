'use strict';

// меню
const toggleMenu = () => {
  // const btnMenu = document.querySelector('.menu'),
  const menu = document.querySelector('menu');

  const handlerMenu = () => {
    menu.classList.toggle('active-menu');
  };

  function slowScrollBlocks (event, elem){
    event.preventDefault();
    const blockID = elem.getAttribute('href').substr(1);
    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  document.addEventListener('click', (event) => {
    let target = event.target;
    // console.log(target);
    if (target.closest('.menu')) {
      handlerMenu();
      return;
    }

    if (target.classList.contains('close-btn')) {
      handlerMenu();
      // return;
    }

    if (target.matches('li a')) {
      slowScrollBlocks (event, target);
      handlerMenu();
    }
    
    if(!target.closest('menu')) {
      // handlerMenu();
      menu.classList.remove('active-menu');
    }
  });
};

export default toggleMenu;