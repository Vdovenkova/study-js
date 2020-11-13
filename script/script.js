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
  countTimer('12 november 2020');

  
  function slowScrollBlocks (event, elem){
        event.preventDefault();
        const blockID = elem.getAttribute('href').substr(1);
        document.getElementById(blockID).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
  }
  
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
  slowScrollService();

  // меню
  const toggleMenu = () => {
    // const btnMenu = document.querySelector('.menu'),
    const menu = document.querySelector('menu');

    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };

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
  tabs();

  // Слайдер
  const slider = () => {
    const slider = document.querySelector('.portfolio-content'),
          slide = document.querySelectorAll('.portfolio-item'),
          portfolioDots = document.querySelector('.portfolio-dots');
          // arrowBtn = document.querySelectorAll('.portfolio-btn'),
          // dot = document.querySelectorAll('.dot');
    
    // // пагинация для слайдера
    // const sliderDots = () => {    
    for (let i = 0; i < slide.length; i++) {
      let liDot = document.createElement('li');
      liDot.classList.add('dot');
      portfolioDots.append(liDot);
    }
    const dot = document.querySelectorAll('.dot');
    dot[0].classList.add('dot-active');
    // };
    // sliderDots();

    let currentSlide = 0,
        interval;

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };
    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;
      if (currentSlide >= slide.length){
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };

    const startSlide = (time = 2000) => {
      interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener('click', (event) => {
      event.preventDefault();
      let target = event.target;

      if (!target.matches('.portfolio-btn, .dot')){
        return;
      }
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      if (target.matches('#arrow-right')){
        currentSlide++;
      } else if (target.matches('#arrow-left')){
        currentSlide--;
      } else if (target.matches('.dot')){
        dot.forEach((elem, index) => {
          if (elem === target){
            currentSlide = index;
          }
        });
      }
      if(currentSlide >= slide.length) {
        currentSlide = 0;
      }
      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    });

    slider.addEventListener('mouseover', (event) => {
      if (event.target.matches('.portfolio-btn') ||
      event.target.matches('.dot')){
        stopSlide();
      }
    });

    slider.addEventListener('mouseout', (event) => {
      if (event.target.matches('.portfolio-btn') ||
      event.target.matches('.dot')){
        startSlide();
      }
    });

    startSlide(3000);
  };
  slider();

  // Команда
  const command = () => {
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
  command();
});