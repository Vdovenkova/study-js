"use strict";

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let calculateButton = document.getElementById('start'), //кнопка рассчитать
    btnAddIncome = document.getElementsByTagName('button')[0], //кнопка плюс доп.доход
    btnAddExpenses = document.getElementsByTagName('button')[1], //кнп плюс обяз.расход
    checkmarkDeposit = document.querySelector('#deposit-check'),
    nameAdditionalIncome = document.querySelectorAll('.additional_income-item'),
    resultBudgetMonth = document.getElementsByClassName('budget_month-value')[0],
    resultBudgetDay = document.getElementsByClassName('budget_day-value')[0],
    resultExpensesMonth = document.getElementsByClassName('expenses_month-value')[0],
    resultAdditionalIncome = document.getElementsByClassName('additional_income-value')[0],
    resultAdditionalExpenses = document.getElementsByClassName('additional_expenses-value')[0],
    resultIncomePeriod = document.getElementsByClassName('income_period-value')[0],
    resultTargetMonth = document.getElementsByClassName('target_month-value')[0],
    salary = document.querySelector('.salary-amount'),
    nameIncome = document.querySelector('input.income-title'),
    incomeItems = document.querySelectorAll('.income-items'),
    nameExpenses = document.querySelector('input.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    nameAdditionalExpenses= document.querySelector('.additional_expenses-item'),
    target = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),//ползунок
    periodAmount = document.querySelector('.period-amount');//цифра под ползунком

calculateButton.disabled = true;

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
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  start: function(){
    appData.budget = +salary.value;
    appData.getIncome();
    appData.getIncomeMonth();
    appData.getExpenses();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();
    appData.showResult();
  },
  //добавляем на странице строки с наименованием и суммой доп.доходов
  addIncomeBlock: function(){
    let cloneIncomeItems = incomeItems[0].cloneNode(true);
    btnAddIncome.before(cloneIncomeItems);
    incomeItems = document.querySelectorAll('.income-items');
    if(incomeItems.length === 3){
      btnAddIncome.style.display = 'none';
    }
  },
  //получаем значения наименования и суммы доп.доходов и передаём их в объект
  getIncome: function(){
    incomeItems.forEach(function(item){
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if(itemIncome !== '' && cashIncome !== ''){
        appData.income[itemIncome] = +cashIncome;
      }
    });
  },
  // сумма доп.доходов за месяц
  getIncomeMonth: function(){
    for (let key in appData.income){
      appData.incomeMonth += +appData.income[key];
    }
  },
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
  },
  //перечисление возможных расходов, запись их в массив appData.addExpenses
  getAddExpenses: function(){
    let addExpenses = nameAdditionalExpenses.value.split(',');
    addExpenses.forEach(function(item){
      item = item.trim();
      if(item !== ''){
        appData.addExpenses.push(item);
      }
    });
  },
  // перечисление возможных доп.доходов, получаем и записываем в массив
  getAddIncome: function(){
    nameAdditionalIncome.forEach(function(item){
      let itemValue = item.value.trim();
      if(itemValue !== ''){
        appData.addIncome.push(itemValue);
      }
    });
  },
  //накопленная сумма за выбранный период
  calcSavedMoney: function(){
    return appData.budgetMonth * periodSelect.value;
  },
  //меняется цифра под ползунком при его перемещении
  changePeriodSelect: function(){
    periodAmount.textContent = periodSelect.value;
  },
  showResult: function(){
    resultBudgetMonth.value = appData.budgetMonth;
    resultBudgetDay.value = appData.budgetDay;
    resultExpensesMonth.value = appData.expensesMonth;
    resultAdditionalExpenses.value = appData.addExpenses.join(', ');
    resultAdditionalIncome.value = appData.addIncome.join(', ');
    resultTargetMonth.value = Math.ceil(appData.getTargetMonth());
    resultIncomePeriod.value = appData.calcSavedMoney();
    periodSelect.addEventListener('input', function(){
      resultIncomePeriod.value = appData.budgetMonth * periodSelect.value;
    });
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
};

salary.addEventListener('keyup', function(){
  if (salary.value === '') {
    calculateButton.disabled = true;
  } else {
    calculateButton.disabled = false;
  }
});

// жмем кнопку "рассчитать"
calculateButton.addEventListener('click', appData.start);

// жмем плюс для добавления строки с полями наименования и суммы доп.доходов
btnAddIncome.addEventListener('click', appData.addIncomeBlock);
// жмем плюс для добавления строки с полями наименования и суммы обязат.расходов
btnAddExpenses.addEventListener('click', appData.addExpensesBlock);
//двигаем ползунок, и выводим значение на страницу (в ф-ии changePeriodSelect) 
periodSelect.addEventListener('input', appData.changePeriodSelect);