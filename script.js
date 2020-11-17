'use strict';

const divElem = document.createElement('div');
let num = 266219;
let multNums = 1;

document.body.style.cssText = `
padding: 40px 0 0 50px;
font-family: sans-serif;
font-size: 22px;
line-height: 1.5;
`;

document.body.prepend(divElem);

divElem.insertAdjacentHTML('beforeend', `
<div>Заданное число: ${num}</div>`);

num = String(num);
// console.log(typeof num);
let arr = num.split('');
// console.log(arr);

arr.forEach((elem) => {
  multNums *= elem;
});
divElem.insertAdjacentHTML('beforeend', `
<div>Произведение цифр заданного числа multNums: ${multNums}</div>`);

let multNums2 = multNums ** 3;
divElem.insertAdjacentHTML('beforeend', `
<div>multNums возведённое в 3ю степень: ${multNums2}</div>`);

multNums2 = String(multNums2);
// console.log(typeof multNums);
divElem.insertAdjacentHTML('beforeend', `
<div>Первые две цифры последнего числа: ${multNums2[0]} ${multNums2[1]}</div>`);