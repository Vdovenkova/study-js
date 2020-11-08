window.addEventListener('DOMContentLoaded', function(){
  'use strict';

  // таймер
  function countTimer(deadline){
    const timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');
        // count = 0;

    function getTimeRemaining(){
      const dateStop = new Date(deadline).getTime(),
          dateNow = new Date().getTime(),
          // в секундах сколько осталось до даты Х
          timeRemaining = (dateStop - dateNow) / 1000,
          // выделяем из общего кол-ва секунд - часы минуты и секунды в формате времени чч:мм:сс
          seconds = Math.floor(timeRemaining % 60),
          minutes = Math.floor((timeRemaining / 60) % 60),
          hours = Math.floor(timeRemaining / 60 / 60);
      return {timeRemaining, hours, minutes, seconds};
    }

    const idUpdateClock = setInterval(function() {
      // count++;
      const timer = getTimeRemaining();

      if (timer.hours < 10 && timer.hours >= 0) {
        timerHours.textContent = `0${timer.hours}`;
      } else {
        timerHours.textContent = timer.hours;
      }

      if (timer.minutes < 10 && timer.minutes >= 0) {
        timerMinutes.textContent = `0${timer.minutes}`;
      } else {
        timerMinutes.textContent = timer.minutes;
      }

      if (timer.seconds < 10 && timer.seconds >= 0) {
        timerSeconds.textContent = `0${timer.seconds}`;
      } else {
        timerSeconds.textContent = timer.seconds;
      }

      if (timer.timeRemaining < 0) {
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
        clearInterval(idUpdateClock);
      }
      // console.log(count);
    }, 1000);
  }
  countTimer('7 november 2020');

  // меню
  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
          menu = document.querySelector('menu'),
          closeBtn = document.querySelector('.close-btn'),
          menuItems = menu.querySelectorAll('ul>li');

    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };

    btnMenu.addEventListener('click', handlerMenu);
    closeBtn.addEventListener('click', handlerMenu);
    menuItems.forEach((element) => element.addEventListener('click', handlerMenu));

  };
  toggleMenu();

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

    popup.addEventListener('click', (event) => {
      let target = event.target;
      if (target.classList.contains('popup-close')) {
        popup.style.display = 'none';
      } else {
          target = target.closest('.popup-content');
          if(!target) {
            popup.style.display = 'none';
          }
        }
    });
  };
  togglePopUp();
 
  function slowScrollBlocks (){
    const anchors = document.querySelectorAll('ul > li > a[href*="#"]');
    anchors.forEach((elem) => {
      elem.addEventListener('click', (event) => {
        event.preventDefault();
        const blockID = elem.getAttribute('href').substr(1);
        document.getElementById(blockID).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      });
     });
  }
  slowScrollBlocks();
  
  function slowScrollService (){
    const anchor = document.querySelector('a[href*="#service-block"]');
    const block = document.getElementById('service-block');
    anchor.addEventListener('click', (event) => {
      event.preventDefault();
      block.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
      });
    });
  }
  slowScrollService();

});