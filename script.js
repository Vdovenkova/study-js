'use strict';

const btn = document.getElementById('change'),
      divColor = document.getElementById('color');

let randomColor;

const getRandomColor = () => {
  // randomColor = Math.random().toString(16);
  randomColor = Math.random().toString(16).substring(9);
  
  document.body.style.cssText = `
  background-color: #${randomColor};
  `;
  btn.style.cssText = `
  color: #${randomColor};
  `;
  divColor.textContent = `#${randomColor}`;
};
// getRandomColor();
// console.log(randomColor);

btn.addEventListener('click', getRandomColor);