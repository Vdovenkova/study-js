"use strict";

const isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const calculateButton = document.getElementById('start'), //кнопка рассчитать
      resetButton = document.getElementById('cancel'), //кнопка сбросить
      btnAddIncome = document.getElementsByTagName('button')[0], //кнопка плюс доп.доход
      btnAddExpenses = document.getElementsByTagName('button')[1], //кнп плюс обяз.расход
      depositCheck = document.querySelector('#deposit-check'),
      nameAdditionalIncome = document.querySelectorAll('.additional_income-item'),
      resultBudgetMonth = document.getElementsByClassName('budget_month-value')[0],
      resultBudgetDay = document.getElementsByClassName('budget_day-value')[0],
      resultExpensesMonth = document.getElementsByClassName('expenses_month-value')[0],
      resultAdditionalIncome = document.getElementsByClassName('additional_income-value')[0],
      resultAdditionalExpenses = document.getElementsByClassName('additional_expenses-value')[0],
      resultIncomePeriod = document.getElementsByClassName('income_period-value')[0],
      resultTargetMonth = document.getElementsByClassName('target_month-value')[0],
      salary = document.querySelector('.salary-amount'),
      nameAdditionalExpenses= document.querySelector('.additional_expenses-item'),
      target = document.querySelector('.target-amount'),
      periodSelect = document.querySelector('.period-select'),//ползунок
      periodAmount = document.querySelector('.period-amount'),//цифра под ползунком
      rightInputs = document.querySelectorAll('.result-total'),
      depositBank = document.querySelector('.deposit-bank'),
      depositAmount = document.querySelector('.deposit-amount'),
      depositPercent = document.querySelector('.deposit-percent');

let incomeItems = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items');

class AppData {
  constructor () {
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
  }
  start (){
    if (!isNumber(depositPercent.value) || +depositPercent.value > 100 || +depositPercent.value <= 0) {
      alert('Введите корректное значение в поле проценты');
      return;
    }
    
    this.budget = +salary.value;
    this.getIncome();
    this.getIncomeMonth();
    this.getExpenses();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getInfoDeposit();
    this.getBudget();
    this.showResult();
    //блокируем инпуты слева, убираем кнопку рассчитать, показываем кнопку сбросить
    calculateButton.style.display = 'none';
    resetButton.style.display = 'block';

    document.querySelectorAll('input[type=text]:not(.result-total)').forEach((item) => {
      item.disabled = true;
    });
    //блок кнопок плюс
    btnAddIncome.disabled = true;
    btnAddExpenses.disabled = true;
    //блок чекбокса депозит и выбора банка
    depositCheck.disabled = true;
    depositBank.disabled = true;
  }
  addIncomeBlock (){
    const cloneIncomeItems = incomeItems[0].cloneNode(true);
    btnAddIncome.before(cloneIncomeItems);
    incomeItems = document.querySelectorAll('.income-items');
    if(incomeItems.length === 3){
      btnAddIncome.style.display = 'none';
    }
  }
  //получаем значения наименования и суммы доп.доходов и передаём их в объект
  getIncome (){
    incomeItems.forEach((item) => {
      const itemIncome = item.querySelector('.income-title').value;
      const cashIncome = item.querySelector('.income-amount').value;
      if(itemIncome !== '' && cashIncome !== ''){
        this.income[itemIncome] = +cashIncome;
      }
    });
  }
  // сумма доп.доходов за месяц
  getIncomeMonth (){
    for (let key in this.income){
      this.incomeMonth += +this.income[key];
    }
  }
  //добавляем на странице всего 3 строки с наименованием и суммой обязательных расходов
  addExpensesBlock (){
    const cloneExpensesItems = expensesItems[0].cloneNode(true);
    btnAddExpenses.before(cloneExpensesItems);
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3){
      btnAddExpenses.style.display = 'none';
    }
  }
  //получаем значения наименования и суммы обяз.расходов и передаём их в объект
  getExpenses (){
    expensesItems.forEach((item) => {
      const itemExpenses = item.querySelector('.expenses-title').value;
      const cashExpenses = item.querySelector('.expenses-amount').value;
      if(itemExpenses !== '' && cashExpenses !== ''){
        this.expenses[itemExpenses] = +cashExpenses;
      }
    });
  }
  // сумма расходов за месяц
  getExpensesMonth (){
    for (let key in this.expenses) {
      this.expensesMonth += this.expenses[key];
    }
    return this.expensesMonth;
  }
  getBudget (){
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    this.budgetMonth = (this.budget + this.incomeMonth - this.expensesMonth + monthDeposit);
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }
  // за сколько месяцев будет накоплена сумма
  getTargetMonth (){
    return target.value / this.budgetMonth;
  }
  //перечисление возможных расходов, запись их в массив appData.addExpenses
  getAddExpenses (){
    const addExpenses = nameAdditionalExpenses.value.split(',');
    addExpenses.forEach((item) => {
      item = item.trim();
      if(item !== ''){
        this.addExpenses.push(item);
      }
    });
  }
  // перечисление возможных доп.доходов, получаем и записываем в массив
  getAddIncome (){
    nameAdditionalIncome.forEach((item) => {
      const itemValue = item.value.trim();
      if(itemValue !== ''){
        this.addIncome.push(itemValue);
      }
    });
  }
  //накопленная сумма за выбранный период
  calcSavedMoney (){
    return this.budgetMonth * periodSelect.value;
  }
  //меняется цифра под ползунком при его перемещении
  changePeriodSelect (){
    periodAmount.textContent = periodSelect.value;
  }
  showResult (){
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
  }
  // сброс всех значений и расчетов
  reset (){
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

    depositCheck.checked = false;
    depositCheck.disabled = false;
    depositBank.value = '0';
    depositBank.disabled = false;
    depositPercent.value = '';
    depositBank.style.display = 'none';
    depositAmount.style.display = 'none';
    depositPercent.style.display = 'none';

    resetButton.style.display = 'none';
    calculateButton.style.display = 'block';
    calculateButton.disabled = true;
  }
  getStatusIncom (){
    if (this.budgetDay < 0) {
      return ('Что то пошло не так');
    } else if (this.budgetDay < 600) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
      return ('У вас средний уровень дохода');
    } else if (this.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
    }
  }
  getInfoDeposit (){
    if (this.deposit){
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    }
  }
  changePercent(){
    const valueSelect = this.value;
    if (valueSelect === 'other') {
      //здесь появляется поле ввода процента
      depositPercent.style.display = 'inline-block';
      depositPercent.disabled  = false;
      depositPercent.value = '';
    } else {
      depositPercent.value = valueSelect;
      depositPercent.style.display = 'none';
    }
  }
  //установка снятие флага депозит
  depositHandler(){
    if (depositCheck.checked){
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change', this.changePercent);
    } else {
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositPercent.style.display = 'none';
      depositPercent.disabled  = true;
      depositBank.value = '0';
      depositAmount.value = '';
      depositPercent.value = '';
      this.deposit = false;
      depositBank.removeEventListener('change', this.changePercent);
    }
  }

  eventListeners () {
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
    //флаг депозит не установлен, значения полей очищены
    depositCheck.checked = false;
    depositBank.value = '0';
    depositPercent.value = '';
    //ставим или убираем флаг депозит
    depositCheck.addEventListener('change', this.depositHandler.bind(this));
  }
}

const appData = new AppData();

appData.eventListeners();

// console.log(appData);
