let money = 1515,
  income = "фриланс",
  addExpenses = "Интернет, Мобильная связь",
  deposit = true,
  mission = 15150,
  period = 12,
  budgetDay = money / 30;

addExpenses = addExpenses.toLowerCase();

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} долларов`);
console.log(addExpenses.split(", "));
console.log("Бюджет на день: ", budgetDay);
