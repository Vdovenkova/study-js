"use strict";

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
  income = "фриланс",
  addExpenses = prompt(`Перечислите возможные расходы
  за рассчитываемый период через запятую`),
  deposit = confirm(`Есть ли у вас депозит в банке?`),
  mission = 110000,
  period = 12,
  expenses = [];

// let start = function() {
//   money = prompt("Ваш месячный доход:");
//   while (!isNumber(money)) {
//     money = prompt("Ваш месячный доход:");
//   }
// };
let start = function() {
  do{
    money = prompt("Ваш месячный доход:");
  }
  while (!isNumber(money));
};
start();

addExpenses = addExpenses.toLowerCase();

let showTypeOf = function(data) {
  console.log(data, typeof(data));
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

// сумма расходов за месяц
function getExpensesMonth(){
  let sum = 0;
  for (let i = 0; i < 3; i++) {
    expenses[i] = prompt("Введите обязательную статью расходов:");
    sum += +prompt('Во сколько это обойдется - в месяц?');
  } 
  return sum;
}
let expensesMonth = getExpensesMonth();

// накопления за месяц функцией доход минус сумма расходов 
function getAccumulatedMonth(c, d){
  return (c - d);
}
let accumulatedMonth = getAccumulatedMonth(money, expensesMonth),
  budgetDay = Math.floor(accumulatedMonth / 30);

// за сколько месяцев будет накоплена сумма в переменной mission
function getTargetMonth(m, n){
  return (m / n);
}
let targetMonth = getTargetMonth(mission, accumulatedMonth);

// пока уберу, будут другие переменные
let getStatusIncom = function(){
  if (budgetDay < 0) {
    return ('Что то пошло не так');
  } else if (budgetDay < 600) {
    return ('К сожалению у вас уровень дохода ниже среднего');
  } else if (budgetDay >= 600 && budgetDay < 1200) {
    return ('У вас средний уровень дохода');
  } else if (budgetDay >= 1200) {
    return ('У вас высокий уровень дохода');
  }
};

// выводы в консоль
console.log(`Цель заработать ${mission} рублей`);
console.log("Возможные расходы ", addExpenses.split(","));
console.log("Обязательные расходы ", expenses);
console.log("Сумма расходов за месяц:", expensesMonth);
console.log(`Бюджет на день: ${budgetDay}`);
console.log(`Цель будет достигнута за ${Math.ceil(targetMonth)} месяцев`);
console.log(getStatusIncom());
