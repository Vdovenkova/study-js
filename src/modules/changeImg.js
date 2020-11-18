'use strict';

// смена фоточек команды при наведении
const changeImg = () => {
  const photo = document.querySelectorAll('.command__photo');

  photo.forEach((elem) => {
    let imgDefault = elem.src;
    elem.addEventListener('mouseenter', (event) => {
      event.target.src = event.target.dataset.img;
    });
    elem.addEventListener('mouseleave', (event) => {
      event.target.src = imgDefault;
    });
  });
};

export default changeImg;