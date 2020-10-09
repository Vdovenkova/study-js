let money = 1515;
let income = "фриланс";
let addExpenses = "Интернет, Мобильная связь";
let deposit = true;
let mission = 15150;
let period = 12;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} долларов`);

addExpenses = addExpenses.toLowerCase();
console.log(addExpenses.split(", "));

let budgetDay = money / 30;
console.log("Бюджет на день: ", budgetDay);
