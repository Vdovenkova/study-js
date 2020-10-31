'use strict';

class First {
  constructor () {}

  hello () {
    console.log(`Привет я метод родителя!`);
  }
}

class Second extends First {
  constructor () {
    super ();
  }

  hello () {
    super.hello();
    console.log(`А я наследуемый метод!`);
  }
}

const test1 = new First();
const test2 = new Second();

// test1.hello();
test2.hello();