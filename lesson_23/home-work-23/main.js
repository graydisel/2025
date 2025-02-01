'use strict';

/*
#1

a) Створити клас Людина.
  Властивості:
    імʼя;
    стать.
  Методи:
    конструктор, який приймає два параметри: імʼя та стать.*/

import {Human} from "./human.js";

const andrew = new Human('Andrew', 'male');
const natasha = new Human('Natasha', 'female');
const ted = new Human('Ted', 'male');
const mathew = new Human('Mathew', 'male');
const eva = new Human('Eva', 'female');
 console.log(andrew);
 console.log(natasha);
 console.log(ted);
 console.log(mathew);
 console.log(eva);
/*b) Створити клас Квартира.
  Властивості:
    конструктор не потрібен;
    масив жителів, який при створенні пустий.
  Методи:
    додати жителя - метод повинен приймати екземпляр класу Людина, та додавати до масиву жителів.*/
import {Apartment} from "./apartments.js";

const apartment222 = new Apartment();
apartment222.addResident(andrew);
apartment222.addResident(natasha);

const apartment228 = new Apartment();
apartment228.addResident(ted);

const apartment301 = new Apartment();
apartment301.addResident(mathew);

const apartment302 = new Apartment();
apartment302.addResident(eva);

console.log(apartment222);
console.log(apartment228);
console.log(apartment301);
console.log(apartment302);
/*
c) Створити клас Будинок.

  Властивості:
    масив квартир, який при створенні пустий;
    максимальна кількість квартир.
  Методи:
    конструктор, який приймає один параметр: максимальну кількість квартир;
    додати квартиру - метод повинен приймати екземпляр класу Квартира, перевіряти, чи не буде кількість перевищувати максимальну кількість квартир, і якщо це так, додати квартиру, в іншому випадку виводить у консоль відповідне повідомлення.
*/
import {Block} from "./block.js";

const blockNine = new Block(3);
blockNine.addApartment(apartment222);
blockNine.addApartment(apartment228);
blockNine.addApartment(apartment301);
blockNine.addApartment(apartment302);

console.log(blockNine);
/*
d) В якості демонстраціїї створити:
  декілька екземплярів класу Людина;
  декілька екземплярів класу Квартира;
  додадити екземпляри класу Людина до екземплярів класу Квартира;
  екземпляр класу Будинок;
  додадити екземпляри класу Квартира до екземплярів класу Будинок.
*/





