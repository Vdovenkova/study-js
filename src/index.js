'use strict';

import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);

import countTimer from './modules/countTimer';
import slowScrollService from './modules/slowScrollService';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import changeImg from './modules/changeImg';
import inputNum from './modules/inputNum';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

// таймер
countTimer('25 november 2020');
// плавная прокрутка к блоку сервис
slowScrollService();
// меню
toggleMenu();
// модальные окна
togglePopUp();
// табы
tabs();
// Слайдер
slider();
// смена фоточек команды при наведении
changeImg();
// вводить только цифры
inputNum();
// считаем стоимость работ
calc(100);
// send-ajax-form
sendForm();