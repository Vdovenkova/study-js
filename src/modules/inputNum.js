'use strict';

// в полях калькулятора вводить только цифры
const inputNum = () => {
  const inputsCalc = document.querySelectorAll('input.calc-item');
  // console.log('inputsCalc: ', inputsCalc);

  inputsCalc.forEach((elem) => {
    elem.addEventListener('input', () => {
      elem.value = elem.value.replace(/\D/g, '');
    });
  });
};

export default inputNum;