'use strict';

// табы
const tabs = () => {
  const tabHeader = document.querySelector('.service-header'), //весь блок
        tab = tabHeader.querySelectorAll('.service-header-tab'), //заголовки
        tabContent = document.querySelectorAll('.service-tab'); //содержимое
  
  const toggleTabContent = (index) => {
    for (let ind = 0; ind < tabContent.length; ind++){
      if (index === ind){
        tab[ind].classList.add('active');
        tabContent[ind].classList.remove('d-none');
      } else {
        tab[ind].classList.remove('active');
        tabContent[ind].classList.add('d-none');
      }
    }
  };

  tabHeader.addEventListener('click', (event) => {
    let target = event.target;
    target = target.closest('.service-header-tab');

    if(target){
      tab.forEach((item, ind) => {
        if(item === target) {toggleTabContent(ind);}
      });
    }
  });
};

export default tabs;