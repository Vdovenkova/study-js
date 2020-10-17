"use strict";

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    start = function() {
      do{
        money = prompt("Ваш месячный доход:");
      }
      while (!isNumber(money));
    };
start();

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 110000,
  period: 12,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function(){
    let addExpenses = prompt(`Перечислите возможные расходы
  за рассчитываемый период через запятую`);
        appData.addExpenses = addExpenses.toLowerCase().split(",");
        appData.deposit = confirm(`Есть ли у вас депозит в банке?`);
  },
  // сумма расходов за месяц
  getExpensesMonth: function(){
    let expense01, expense02, expenseAmount;
    for (let i = 0; i < 2; i++) {
      if (i === 0) {
        expense01 = prompt("Введите обязательную статью расходов:");
      } else if (i === 1) {
        expense02 = prompt("Введите обязательную статью расходов:");
      }
      do {
        expenseAmount = prompt('Во сколько это обойдется?');
      }
      while(!isNumber(expenseAmount));
    // expenseAmount = Number(expenseAmount);
    appData.expensesMonth += +expenseAmount;
    }
    return appData.expensesMonth;
  },
  // накопления за месяц функцией доход минус сумма расходов 
  getAccumulatedMonth: function(){
    appData.budgetMonth = (appData.budget - appData.expensesMonth);
    return appData.budgetMonth;
  },
  // за сколько месяцев будет накоплена сумма в переменной mission
  getTargetMonth: function (){
    let targetMonth = 0;
    targetMonth = appData.mission / appData.budgetMonth;
    if (targetMonth < 0) {
      return ('Цель не будет достигнута');
    } else {
      return (`Цель будет достигнута за ${Math.ceil(targetMonth)} месяцев`);
    }
  },
    getStatusIncom: function(){
    if (appData.budgetDay < 0) {
      return ('Что то пошло не так');
    } else if (appData.budgetDay < 600) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
      return ('У вас средний уровень дохода');
    } else if (appData.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
    }
  },
};
appData.asking();
appData.getExpensesMonth();
appData.getAccumulatedMonth();

// выводы в консоль
console.log(`Цель заработать ${appData.mission} рублей`);
console.log("Возможные расходы ", appData.addExpenses);
console.log("Сумма расходов за месяц:", appData.expensesMonth);
console.log(`Бюджет на день: ${Math.floor(appData.budgetMonth / 30)}`);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncom());

// была до 7-го урока - вывод в консоль типов данных
// let showTypeOf = function(item) {
//   console.log(item, typeof(item));
// };
// showTypeOf(money);
// showTypeOf(appData.income);
// showTypeOf(appData.deposit);