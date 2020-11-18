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

  const idUpdateClock = () => {
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
  };
  
  idUpdateClock();

  setInterval(idUpdateClock, 1000);
}

export default countTimer;