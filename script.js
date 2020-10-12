let money = 30000,
  income = "фриланс",
  addExpenses = "Интернет, Мобильная связь",
  deposit = true,
  mission = 110000,
  period = 12,
  budgetDay = money / 30,
  // далее переменные для урока 3
  expense01,
  expense02,
  amount01,
  amount02,
  budgetMonth,
  periodMission;

// урок 3
money = prompt("Ведите сумму Вашего месячного дохода?");
money = parseFloat(money);
addExpenses = prompt(`Перечислите возможные расходы
за рассчитываемый период через запятую.
Пример: Квартплата, проездной, кредит`);
// урок 2
addExpenses = addExpenses.toLowerCase();
//снова урок 3
deposit = confirm(`Есть ли у вас депозит в банке?
OK - есть, Отмена - нет`);
expense01 = prompt("Введите первую обязательную статью расходов");
amount01 = prompt("Во сколько это обойдется - в месяц?");
amount01 = parseFloat(amount01);
expense02 = prompt("Введите вторую обязательную статью расходов");
amount02 = prompt("Во сколько это обойдется - в месяц?");
amount02 = parseFloat(amount02);
budgetMonth = money - (amount01 + amount02);
periodMission = Math.ceil(mission / budgetMonth);
budgetDay = Math.floor(budgetMonth / 30);
// определение уровня дохода))

// это выводы в консоль из урока 2
console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);
console.log(addExpenses.split(", "));
// далее для урока 3
console.log('Бюджет на месяц: ', budgetMonth);
console.log(`Цель будет достигнута за ${periodMission} месяцев`);
console.log(`Бюджет на день: ${budgetDay}`);
