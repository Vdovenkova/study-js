"use strict";

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let calculateButton = document.getElementById('start'), //кнопка рассчитать
    resetButton = document.getElementById('cancel'), //кнопка сбросить
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
    periodAmount = document.querySelector('.period-amount'),//цифра под ползунком
    rightInputs = document.querySelectorAll('.result-total');

const AppData = function() {
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.expensesMonth = 0;
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
};

AppData.prototype.start = function(){
  this.budget = +salary.value;
  this.getIncome();
  this.getIncomeMonth();
  this.getExpenses();
  this.getExpensesMonth();
  this.getAddExpenses();
  this.getAddIncome();
  this.getBudget();
  this.showResult();
  //блокируем инпуты слева, убираем кнопку рассчитать, показываем кнопку сбросить
  calculateButton.style.display = 'none';
  resetButton.style.display = 'block';

  document.querySelectorAll('input[type=text]:not(.result-total)').forEach((item) => {
    item.disabled = true;
  });
  btnAddIncome.disabled = true;
  btnAddExpenses.disabled = true;
};

AppData.prototype.addIncomeBlock = function(){
  let cloneIncomeItems = incomeItems[0].cloneNode(true);
  btnAddIncome.before(cloneIncomeItems);
  incomeItems = document.querySelectorAll('.income-items');
  if(incomeItems.length === 3){
    btnAddIncome.style.display = 'none';
  }
};
//получаем значения наименования и суммы доп.доходов и передаём их в объект
//пробую стрелочную функции, так как у неё нет this, чтобы во вложенной ф-ии остался контекст appData
AppData.prototype.getIncome = function(){
  incomeItems.forEach((item) => {
    let itemIncome = item.querySelector('.income-title').value;
    let cashIncome = item.querySelector('.income-amount').value;
    if(itemIncome !== '' && cashIncome !== ''){
      this.income[itemIncome] = +cashIncome;
    }
  });
};
// сумма доп.доходов за месяц
AppData.prototype.getIncomeMonth = function(){
  for (let key in this.income){
    this.incomeMonth += +this.income[key];
  }
};
//добавляем на странице всего 3 строки с наименованием и суммой обязательных расходов
AppData.prototype.addExpensesBlock = function(){
  let cloneExpensesItems = expensesItems[0].cloneNode(true);
  btnAddExpenses.before(cloneExpensesItems);
  expensesItems = document.querySelectorAll('.expenses-items');
  if(expensesItems.length === 3){
    btnAddExpenses.style.display = 'none';
  }
};
//получаем значения наименования и суммы обяз.расходов и передаём их в объект
AppData.prototype.getExpenses = function(){
  // const _this = this;
  expensesItems.forEach((item) => {
    let itemExpenses = item.querySelector('.expenses-title').value;
    let cashExpenses = item.querySelector('.expenses-amount').value;
    if(itemExpenses !== '' && cashExpenses !== ''){
      this.expenses[itemExpenses] = +cashExpenses;
    }
  });
};
// сумма расходов за месяц
AppData.prototype.getExpensesMonth = function(){
  for (let key in this.expenses) {
    this.expensesMonth += this.expenses[key];
  }
  return this.expensesMonth;
};
AppData.prototype.getBudget = function(){
  this.budgetMonth = (this.budget + this.incomeMonth - this.expensesMonth);
  this.budgetDay = Math.floor(this.budgetMonth / 30);
};
// за сколько месяцев будет накоплена сумма
AppData.prototype.getTargetMonth = function (){
  return target.value / this.budgetMonth;
};
//перечисление возможных расходов, запись их в массив appData.addExpenses
AppData.prototype.getAddExpenses = function(){
  // const _this = this;
  let addExpenses = nameAdditionalExpenses.value.split(',');
  addExpenses.forEach((item) => {
    item = item.trim();
    if(item !== ''){
      this.addExpenses.push(item);
    }
  });
};
// перечисление возможных доп.доходов, получаем и записываем в массив
AppData.prototype.getAddIncome = function(){
  // const _this = this;
  nameAdditionalIncome.forEach((item) => {
    let itemValue = item.value.trim();
    if(itemValue !== ''){
      this.addIncome.push(itemValue);
    }
  });
};
//накопленная сумма за выбранный период
AppData.prototype.calcSavedMoney = function(){
  return this.budgetMonth * periodSelect.value;
};
//меняется цифра под ползунком при его перемещении
AppData.prototype.changePeriodSelect = function(){
  periodAmount.textContent = periodSelect.value;
};

AppData.prototype.showResult = function(){
  // const _this = this;
  resultBudgetMonth.value = this.budgetMonth;
  resultBudgetDay.value = this.budgetDay;
  resultExpensesMonth.value = this.expensesMonth;
  resultAdditionalExpenses.value = this.addExpenses.join(', ');
  resultAdditionalIncome.value = this.addIncome.join(', ');
  resultTargetMonth.value = Math.ceil(this.getTargetMonth());
  resultIncomePeriod.value = this.calcSavedMoney();
  periodSelect.addEventListener('input', () => {
    resultIncomePeriod.value = this.budgetMonth * periodSelect.value;
  });
};
// сброс всех значений и расчетов
AppData.prototype.reset = function(){

  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.expensesMonth = 0;
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;

  document.querySelectorAll('input[type=text]:not(.result-total)').forEach((item) => {
    item.disabled = false;
    item.value = '';
  });

  expensesItems.forEach((item, index) => {
    if (index !== 0) {
      item.remove();
    }
  });
  btnAddExpenses.style.display = 'block';
  btnAddExpenses.disabled = false;

  incomeItems.forEach((item, index) => {
      if (index !== 0) {
        item.remove();
      }
  });
  btnAddIncome.style.display = 'block';
  btnAddIncome.disabled = false;

  periodSelect.value = 1;
  periodAmount.textContent = periodSelect.value;

  rightInputs.forEach((item) => {
    item.value = '';
  });

  resetButton.style.display = 'none';
  calculateButton.style.display = 'block';
  calculateButton.disabled = true;

};

AppData.prototype.getStatusIncom = function(){
  if (this.budgetDay < 0) {
    return ('Что то пошло не так');
  } else if (this.budgetDay < 600) {
    return ('К сожалению у вас уровень дохода ниже среднего');
  } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
    return ('У вас средний уровень дохода');
  } else if (this.budgetDay >= 1200) {
    return ('У вас высокий уровень дохода');
  }
};
AppData.prototype.getInfoDeposit = function(){
  if (this.deposit){
    do {
      this.moneyDeposit = prompt('Какова сумма депозита?');
    }
    while(!isNumber(this.moneyDeposit) || +this.moneyDeposit === 0);
    do {
      this.percentDeposit = prompt('Каков годовой процент по вкладу?', 10);
    }
    while(!isNumber(this.percentDeposit) || +this.moneyDeposit === 0);
  }
};

AppData.prototype.eventListeners = function () {
  // let _this = this;
  calculateButton.disabled = true;
  salary.addEventListener('keyup', () => {
    if (salary.value === '') {
    calculateButton.disabled = true;
    } else {
    calculateButton.disabled = false;
    }
  });
  // жмем кнопку "рассчитать"
  calculateButton.addEventListener('click', this.start.bind(this));
  // жмём кнопку сбросить
  resetButton.addEventListener('click', this.reset.bind(this));
  // жмем плюс для добавления строки с полями наименования и суммы доп.доходов
  btnAddIncome.addEventListener('click', this.addIncomeBlock);
  // жмем плюс для добавления строки с полями наименования и суммы обязат.расходов
  btnAddExpenses.addEventListener('click', this.addExpensesBlock);
  //двигаем ползунок, и выводим значение на страницу (в ф-ии changePeriodSelect) 
  periodSelect.addEventListener('input', this.changePeriodSelect);
};

const appData = new AppData();

appData.eventListeners();

// console.log(appData);
