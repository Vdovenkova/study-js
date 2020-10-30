'use strict';

const DomElement = function(selector, height, width, bg, fontSize) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
};

DomElement.prototype.createdElements = function() {
  let elementSite;
  if (this.selector[0] === '.'){
    elementSite = document.createElement('div');
    elementSite.classList.add(this.selector.slice(1));
  } else if (this.selector[0] === '#'){
    elementSite = document.createElement('p');
    elementSite.id = this.selector.slice(1);
  }

  elementSite.style.cssText = `
    height: ${this.height};
    width: ${this.width};
    background-color: ${this.bg};
    font-size: ${this.fontSize};
  `;

  elementSite.textContent = 'Совершенно любой текст';
  document.body.append(elementSite);
};

const text1 = new DomElement('#any-id', '100px', '460px', 'silver', '28px');
const text2 = new DomElement('.any-class', '120px', '460px', 'tomato', '36px');

text1.createdElements();
text2.createdElements();