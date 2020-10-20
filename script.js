"use strict";

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    start = function() {
      do{
        money = prompt("Ваш месячный доход:");
      }
      while (!isNumber(money) || +money === 0);
    };
start();

let appData = {
  income: {},
  addIncome: [],
  addExpenses: [], 
  // обязат.раходы-объект, в котором ключ-название расхода, значение-сумма расхода
  expenses: {},
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 110000,
  period: 12,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function(){
    if (confirm('У вас есть дополнительный заработок')){
      let itemIncome, cashIncome;
      do {
        itemIncome = prompt ('Какой у вас дополнительный заработок', 'Фриланс');
      }
      while(itemIncome === null || itemIncome === '' || isNumber(itemIncome));
      do {
        cashIncome = prompt ('Сколько вы на этом зарабатываете в месяц?');
      }
      while(!isNumber(cashIncome) || +cashIncome === 0);
      appData.income[itemIncome] = cashIncome;
    }
    appData.deposit = confirm(`Есть ли у вас депозит в банке?`);

    let addExpenses = prompt("Перечислите возможные расходы за месяц через запятую");
    appData.addExpenses = addExpenses.split(",");

    for (let i = 0; i < 2; i++) {
      let expenseName, expenseAmount;
      do {
        expenseName = prompt("Введите обязательную статью расходов:");
      }
      while(expenseName === null || expenseName === '' || isNumber(expenseName));
      do {
        expenseAmount = prompt('Во сколько это обойдется?');
      }
      while(!isNumber(expenseAmount) || +expenseAmount === 0);
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
  getInfoDeposit: function(){
    if (appData.deposit){
      do {
        appData.moneyDeposit = prompt('Какова сумма депозита?');
      }
      while(!isNumber(appData.moneyDeposit) || +appData.moneyDeposit === 0);
      do {
        appData.percentDeposit = prompt('Каков годовой процент по вкладу?', 10);
      }
      while(!isNumber(appData.percentDeposit) || +appData.moneyDeposit === 0);
    }
  },
  calcSavedMoney: function(){
    return appData.budgetMonth * appData.period;
  }
};
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getInfoDeposit();

// выводы в консоль
// console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSavedMoney());
console.log("Возможные расходы ", appData.addExpenses.join(", "));
console.log("Сумма расходов за месяц:", appData.expensesMonth);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncom());
for (let key in appData) {
  if (typeof(appData[key]) !== 'function') {
    console.log("Наша программа включает в себя данные: " + "свойство: " + key + " значение: " + (appData[key]));
  }
}