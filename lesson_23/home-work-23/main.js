'use strict';

/*
#1

a) Створити клас Людина.
  Властивості:
    імʼя;
    стать.
  Методи:
    конструктор, який приймає два параметри: імʼя та стать.*/

class Human {
    constructor(name, gender) {
        this.name = name;
        this.gender = gender;
    }
}
const andrew = new Human('Andrew', 'male');
const natasha = new Human('Natasha', 'female');
 console.log(andrew);
 console.log(natasha);
/*b) Створити клас Квартира.
  Властивості:
    конструктор не потрібен;
    масив жителів, який при створенні пустий.
  Методи:
    додати жителя - метод повинен приймати екземпляр класу Людина, та додавати до масиву жителів.*/
class Apartment {
    residents = [];
    addResident(name) {
        this.residents.push(name);
    }
}
const apartment228 = new Apartment();
apartment228.addResident('Luke Skywalker');
apartment228.addResident('Rick Deckard');
console.log(apartment228);
const apartment222 = new Apartment();
apartment222.addResident(andrew);
apartment222.addResident(natasha);
console.log(apartment222);
/*
c) Створити клас Будинок.

  Властивості:
    масив квартир, який при створенні пустий;
    максимальна кількість квартир.
  Методи:
    конструктор, який приймає один параметр: максимальну кількість квартир;
    додати квартиру - метод повинен приймати екземпляр класу Квартира, перевіряти, чи не буде кількість перевищувати максимальну кількість квартир, і якщо це так, додати квартиру, в іншому випадку виводить у консоль відповідне повідомлення.
*/
class Block {
    apartments = [];
    constructor(maxApartments) {
        this.maxApartments = maxApartments;
    }
    #number = 0;
    addApartment(number) {
        if (this.#number < this.maxApartments) {
            this.apartments.push(number);
            this.#number++;
        }
        else {
            console.log('Sorry, you reached maximum amount of apartments');
        }
    }
}
const blockSix = new Block(5);
blockSix.addApartment(102);
blockSix.addApartment(103);
blockSix.addApartment(202);
blockSix.addApartment(203);
blockSix.addApartment(302);
console.log(blockSix);
blockSix.addApartment(302);

const blockNine = new Block(4);
blockNine.addApartment(apartment222);
blockNine.addApartment(apartment228);
console.log(blockNine);
/*
d) В якості демонстраціїї створити:
  декілька екземплярів класу Людина;
  декілька екземплярів класу Квартира;
  додадити екземпляри класу Людина до екземплярів класу Квартира;
  екземпляр класу Будинок;
  додадити екземпляри класу Квартира до екземплярів класу Будинок.
*/





