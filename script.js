"use strict";

let money = prompt("Ведите сумму Вашего месячного дохода:"),
  income = "фриланс",
  addExpenses = prompt(`Перечислите возможные расходы
  за рассчитываемый период через запятую`),
  deposit = confirm(`Есть ли у вас депозит в банке?`),
  mission = 110000,
  period = 12,
  expense01 = prompt("Введите первую обязательную статью расходов:"),
  amount01 = prompt("Во сколько это обойдется - в месяц?"),
  expense02 = prompt("Введите вторую обязательную статью расходов:"),
  amount02 = prompt("Во сколько это обойдется - в месяц?"),
  budgetMonth,
  budgetDay,
  periodMission;

addExpenses = addExpenses.toLowerCase();
money = parseFloat(money);
amount01 = parseFloat(amount01);
amount02 = parseFloat(amount02);
budgetMonth = money - (amount01 + amount02);
budgetDay = Math.floor(budgetMonth / 30);
periodMission = Math.ceil(mission / budgetMonth);
if (budgetDay < 0) {
  console.log('Что то пошло не так');
} else if (budgetDay < 600) {
  console.log('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay >= 600 && budgetDay < 1200) {
  console.log('У вас средний уровень дохода');
} else if (budgetDay >= 1200) {
  console.log('У вас высокий уровень дохода');
}
// для урока 2
console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);
console.log(addExpenses.split(","));
// для урока 3
// console.log('зарплата в месяц: ', money);
console.log('Бюджет на месяц: ', budgetMonth);
console.log(`Цель будет достигнута за ${periodMission} месяцев`);
console.log(`Бюджет на день: ${budgetDay}`);
