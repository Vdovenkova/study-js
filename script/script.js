"use strict";

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let calculateButton = document.getElementById('start'), //кнопка рассчитать
    btnAddIncome = document.getElementsByTagName('button')[0], //кнопка плюс доп.доход
    btnAddExpenses = document.getElementsByTagName('button')[1], //кнп плюс обяз.расход
    checkmarkDeposit = document.querySelector('#deposit-check'), //флаг депозита
    nameAdditionalIncome = document.querySelectorAll('.additional_income-item'),
    resultBudgetMonth = document.getElementsByClassName('budget_month-value')[0],
    resultBudgetDay = document.getElementsByClassName('budget_day-value')[0],
    resultExpensesMonth = document.getElementsByClassName('expenses_month-value')[0],
    resultAdditionalIncome = document.getElementsByClassName('additional_income-value')[0],
    resultAdditionalExpenses = document.getElementsByClassName('additional_expenses-value')[0],
    resultIncomePeriod = document.getElementsByClassName('income_period-value')[0],
    resultTargetMonth = document.getElementsByClassName('target_month-value')[0],
    salary = document.querySelector('.salary-amount'), // инпут месячный доход
    nameIncome = document.querySelector('input.income-title'),
    // sumIncome = document.querySelector('.income-amount'),
    //ниже вся строка с полями наименование и сумма дополнительных доходов
    // incomeItems = document.querySelectorAll('.income-items'), //
    nameExpenses = document.querySelector('input.expenses-title'), //поле наимен. обяз.расходов
    // sumExpenses= document.querySelector('.expenses-amount'), //поле сумма обяз.расходов
    //ниже вся строка с полями наименование и сумма обяз.расходов
    expensesItems = document.querySelectorAll('.expenses-items'), 
    nameAdditionalExpenses= document.querySelector('.additional_expenses-item'),
    target = document.querySelector('.target-amount'),
    periodAmount = document.querySelector('.period-select');

// let money;
let appData = {
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  expensesMonth: 0,
  addExpenses: [],
  // newAddExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  // mission: 110000,
  // period: 12,
  start: function(){
    if (salary.value === '') {
      alert ('Ошибка! Поле "Месячный доход" должно быть заполнено!');
      return;
    }
    appData.budget = +salary.value;

    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();

    appData.showResult();
  },
  // addIncomeBlock: function(){},
  //добавляем на странице всего 3 строки с наименованием и суммой обязательных расходов
  addExpensesBlock: function(){
    let cloneExpensesItems = expensesItems[0].cloneNode(true);
    btnAddExpenses.before(cloneExpensesItems);
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3){
      btnAddExpenses.style.display = 'none';
    }
  },
  //получаем значения наименования и суммы обяз.расходов и передаём их в объект
  getExpenses: function(){
    expensesItems.forEach(function(item){
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if(itemExpenses !== '' && cashExpenses !== ''){
        appData.expenses[itemExpenses] = +cashExpenses;
      }
    });
  },
  getIncome: function(){
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
    for (let key in appData.income){
      appData.incomeMonth += +appData.income[key];
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
    appData.budgetMonth = (appData.budget + appData.incomeMonth - appData.expensesMonth);
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  // за сколько месяцев будет накоплена сумма
  getTargetMonth: function (){
    return target.value / appData.budgetMonth;
    // let targetMonth = 0;
    // targetMonth = appData.mission / appData.budgetMonth;
    // if (targetMonth <= 0) {
    //   return ('Цель не будет достигнута');
    // } else {
    //   return (`Цель будет достигнута за ${Math.ceil(targetMonth)} месяцев`);
    // }
  },
  //перечисление возможных расходов, запись их в массив appData.addExpenses
  //тоже, что и в asking записывали с пом.нового массива newAddExpenses
  getAddExpenses: function(){
    let addExpenses = nameAdditionalExpenses.value.split(',');
    addExpenses.forEach(function(item){
      item = item.trim();
      if(item !== ''){
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function(){
    nameAdditionalIncome.forEach(function(item){
      let itemValue = item.value.trim();
      if(itemValue !== ''){
        appData.addIncome.push(itemValue);
      }
  });
  },
  calcSavedMoney: function(){
    return appData.budgetMonth * periodAmount.value;
    // return appData.budgetMonth * appData.period;
  },
  showResult: function(){
    resultBudgetMonth.value = appData.budgetMonth;
    resultBudgetDay.value = appData.budgetDay;
    resultExpensesMonth.value = appData.expensesMonth;
    resultAdditionalExpenses.value = appData.addExpenses.join(', ');
    resultAdditionalIncome.value = appData.addIncome.join(', ');
    resultTargetMonth.value = Math.ceil(appData.getTargetMonth());
    resultIncomePeriod.value = appData.calcSavedMoney();
  },
  // asking: function(){
  //   // if (confirm('У вас есть дополнительный заработок')){
  //   //   let itemIncome, cashIncome;
  //   //   do {
  //   //     itemIncome = prompt ('Какой у вас дополнительный заработок', 'Фриланс');
  //   //   }
  //   //   while(itemIncome === null || itemIncome === '' || isNumber(itemIncome));
  //   //   do {
  //   //     cashIncome = prompt ('Сколько вы на этом зарабатываете в месяц?');
  //   //   }
  //   //   while(!isNumber(cashIncome) || +cashIncome === 0);
  //   //   appData.income[itemIncome] = cashIncome;
  //   // }

  //   // appData.deposit = confirm(`Есть ли у вас депозит в банке?`);

  //   // let addExpenses = prompt("Перечислите возможные расходы за месяц через запятую");
  //   // appData.addExpenses = addExpenses.split(",");
  //   // for (let item of appData.addExpenses) {
  //   //   let str = item.trim();
  //   //   appData.newAddExpenses.push(str[0].toUpperCase() + str.slice(1).toLowerCase());
  //   // } Заменили методом getAddExpenses - он получает строку с возм.расходов со страницы.
    
  //   // for (let i = 0; i < 2; i++) {
  //   //   let expenseName, expenseAmount;
  //   //   do {
  //   //     expenseName = prompt("Введите обязательную статью расходов:");
  //   //   }
  //   //   while(expenseName === null || expenseName === '' || isNumber(expenseName));
  //   //   do {
  //   //     expenseAmount = prompt('Во сколько это обойдется?');
  //   //   }
  //   //   while(!isNumber(expenseAmount) || +expenseAmount === 0);
  //   //   appData.expenses[expenseName] = +expenseAmount;
  //   // } Заменили методом getExpenses - он получает значения расходов со страницы.
  // },
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
};
// жмем кнопку "рассчитать"
calculateButton.addEventListener('click', appData.start);

// жмем плюс для добавления строки с полями наименования и суммы обязат.расходов
btnAddExpenses.addEventListener('click', appData.addExpensesBlock);

// выводы в консоль
// console.log("Возможные расходы ", appData.newAddExpenses.join(", "));
// console.log("Сумма расходов за месяц:", appData.expensesMonth);
// console.log(appData.getTargetMonth());
// console.log(appData.getStatusIncom());
// for (let key in appData) {
//   if (typeof(appData[key]) !== 'function') {
//     console.log("Наша программа включает в себя данные: " + "свойство: " + key + " значение: " + (appData[key]));
//   }
// }