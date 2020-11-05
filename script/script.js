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
          popupContent = document.querySelector('.popup-content'),
          popupBtn = document.querySelectorAll('.popup-btn'),
          popupClose = document.querySelector('.popup-close');
    
    const popupAnimate = () => {
      let start = Date.now();
      let timer = setInterval(function() {
      let timePassed = Date.now() - start;
        popup.style.display = 'block';
        popupContent.style.top = `${timePassed / 40}px`;
        if (timePassed > 2000) {
          clearInterval(timer);
        }
      }, 40);
    };

    popupBtn.forEach((elem) => {
      elem.addEventListener('click', () => {
        if (window.innerWidth > 768) {
          popupAnimate();
        } else {
          popup.style.display = 'block';
        }
      });
    });

    popupClose.addEventListener('click', () => {
      popup.style.display = 'none';
    });
  };
  togglePopUp();
});