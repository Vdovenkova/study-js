'use strict';

// модальные окна
const togglePopUp = () => {
  const popup = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn');

  const animation = () => {
    const popupContent = document.querySelector('.popup-content');
    let count = 0;
    const popupAnimate = () => {
      count++;
      const animate = requestAnimationFrame(popupAnimate);
      if (count < 30) {
      popupContent.style.top = `${count * 2}px`;
      } else {
        cancelAnimationFrame(animate);
      }
    };
    popupAnimate();
  };

  popupBtn.forEach((elem) => {
    elem.addEventListener('click', () => {
      popup.style.display = 'block';
      if (window.innerWidth > 768) {
        animation();
      }
    });
  });

  const clearInp = () => {
    popup.querySelectorAll('input').forEach((item) => {
      item.value = '';
    });
  };

  popup.addEventListener('click', (event) => {
    let target = event.target;
    if (target.classList.contains('popup-close')) {
      popup.style.display = 'none';
      clearInp();
    } else {
        target = target.closest('.popup-content');
        if(!target) {
          popup.style.display = 'none';
          clearInp();
        }
      }
  });
};

export default togglePopUp;