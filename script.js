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
  // это возможные расходы, которые просты выводились в виде массива
  addExpenses: [], 
  // это обязат.раходы-это объект, в котором ключ-название расхода: значение-сумма расхода
  expenses: {},
  deposit: false,
  mission: 110000,
  period: 12,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function(){
    let addExpenses = prompt("Перечислите возможные расходы за месяц через запятую");
        appData.addExpenses = addExpenses.toLowerCase().split(",");
        appData.deposit = confirm(`Есть ли у вас депозит в банке?`);
    for (let i = 0; i < 2; i++) {
      let expenseName, expenseAmount;
      expenseName = prompt("Введите обязательную статью расходов:");
      do {
        expenseAmount = prompt('Во сколько это обойдется?');
      }
      while(!isNumber(expenseAmount));
      appData.expenses[expenseName] = +expenseAmount;
    }
  },
  // сумма расходов за месяц
  getExpensesMonth: function(){
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
    return appData.expensesMonth;
  },
  getBudget: function(){
    appData.budgetMonth = (appData.budget - appData.expensesMonth);
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
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
appData.getBudget();

// выводы в консоль
console.log("Сумма расходов за месяц:", appData.expensesMonth);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncom());
for (let key in appData) {
  if (typeof(appData[key]) !== 'function') {
    console.log("Наша программа включает в себя данные: " + "свойство: " + key + " значение: " + (appData[key]));
  }
}