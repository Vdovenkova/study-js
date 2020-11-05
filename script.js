'use strict';

function infoText (dayX) {
  const textSite = document.querySelector('.text');

  // получаем время суток
  function getTimeDay(){
    let timeDay = new Date().getHours();
    if (timeDay >= 4 && timeDay < 11) {
      return 'Доброе утро';
    } else if (timeDay >= 11 && timeDay < 16) {
      return 'Добрый день';
    } else if (timeDay >= 16 && timeDay < 23) {
      return 'Добрый вечер';
    } else {
      return 'Доброй ночи';
    }
  }

  // получаю название текущего дня недели, с большой буквы
  function getWeekDay(){
    let weekDay = new Date().toLocaleString('ru', {weekday: 'long'});
    weekDay = weekDay[0].toUpperCase() + weekDay.slice(1).toLowerCase();
    return weekDay;
  }
  // считаем кол-во оставшихся дней - ф-ция из видео Максима
  function getTimeRemaining(){
    let dateStop = new Date(dayX).getTime(),
        dateNow = new Date().getTime(),
        // в секундах сколько осталось до датыХ
        timeRemaining = (dateStop - dateNow) / 1000,
        days = Math.floor(timeRemaining / 60 / 60 / 24);
    return {timeRemaining, days};
    }
  // вывод на страницу через секунду, чтобы обновлялась дата
  // остальное тоже поменяется при наступлении условий
  // здесь же получаем тек.дату в заморском формате
  function outputText (){    
    let currentTime = new Date().toLocaleTimeString('en-US');
    let timer = getTimeRemaining();
    
    textSite.innerHTML = `
    ${getTimeDay()}</br>
    Сегодня: ${getWeekDay()}</br>
    Текущее время: ${currentTime}</br>
    До нового года осталось ${timer.days} дней`;
  }
  setInterval(outputText, 1000);
}
infoText('1 january 2021');
