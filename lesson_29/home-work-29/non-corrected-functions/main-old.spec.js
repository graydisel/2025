import {ageClassification, weekFn} from "./main-old.js";
describe('ageClassification function', () => {
    it('Should display null type with negative number.', () => {
        expect(ageClassification(-1)).toBeNull();
    });
    it('Should display null type with 0 number.', () => {
        expect(ageClassification(0)).toBeNull();
    });
    it('Should display "Дитинство" in age period from 0 (not included) to 24. ', () => {
        expect(ageClassification(1)).toBe('Дитинство');
    });
    it('Should display "Дитинство" in age period from 0 (not included) to 24. ', () => {
        expect(ageClassification(24)).toBe('Дитинство');
    });
    it('Should display "Молодість" in age period from 24 (not included) to 44. ', () => {
        expect(ageClassification(24.01)).toBe('Молодість');
    });
    it('Should display "Молодість" in age period from 24 (not included) to 44. ', () => {
        expect(ageClassification(44)).toBe('Молодість');
    });
    it('Should display "Зрілість" in age period from 44 (not included) to 65. ', () => {
        expect(ageClassification(44.01)).toBe('Зрілість');
    });
    it('Should display "Зрілість" in age period from 44 (not included) to 65. ', () => {
        expect(ageClassification(65)).toBe('Зрілість');
    });
    it('Should display "Старість" in age period from 65 (not included) to 75. ', () => {
        expect(ageClassification(65.1)).toBe('Старість');
    });
    it('Should display "Старість" in age period from 65 (not included) to 75. ', () => {
        expect(ageClassification(75)).toBe('Старість');
    });
    it('Should display "Довголіття" in age period from 75 (not included) to 90. ', () => {
        expect(ageClassification(75.01)).toBe('Довголіття');
    });
    it('Should display "Довголіття" in age period from 75 (not included) to 90. ', () => {
        expect(ageClassification(90)).toBe('Довголіття');
    });
    it('Should display "Рекорд" in age period from 90 (not included) to 122. ', () => {
        expect(ageClassification(90.01)).toBe('Рекорд');
    });
    it('Should display "Рекорд" in age period from 90 (not included) to 122. ', () => {
        expect(ageClassification(122)).toBe('Рекорд');
    });
    it('Should display "null" in age period over 122 (not included). ', () => {
        expect(ageClassification(122.01)).toBeNull();
    });
    it('Should display "null" in age period over 122 (not included). ', () => {
        expect(ageClassification(150)).toBeNull();
    });
    it('Should display "null" if entered string type. ', () => {
        expect(ageClassification('asd')).toBeNull();
    });
    it('Should display "null" if parameters are empty. ', () => {
        expect(ageClassification('')).toBeNull();
    });
    it('Should display "null" if entered Array. ', () => {
        expect(ageClassification([12, 5])).toBeNull();
    });
    it('Should display "null" if entered Boolean type. ', () => {
        expect(ageClassification(true)).toBeNull();
    });
    it('Should display "null" if entered Boolean type. ', () => {
        expect(ageClassification(false)).toBeNull();
    });
})

describe('weekFn function', () => {
    it('Should display "Понеділок" when enter number 1.', () => {
        expect(weekFn(1)).toBe('Понеділок');
    });
    it('Should display "Вівторок" when enter number 2.', () => {
        expect(weekFn(2)).toBe('Вівторок');
    });
    it('Should display "Середа" when enter number 3.', () => {
        expect(weekFn(3)).toBe('Середа');
    });
    it('Should display "Четвер" when enter number 4.', () => {
        expect(weekFn(4)).toBe('Четвер');
    });
    it('Should display "П\'ятниця" when enter number 5.', () => {
        expect(weekFn(5)).toBe('П\'ятниця');
    });
    it('Should display "Субота" when enter number 6.', () => {
        expect(weekFn(6)).toBe('Субота');
    });
    it('Should display "Неділя" when enter number 7.', () => {
        expect(weekFn(7)).toBe('Неділя');
    });
    it('Should display "null" when enter numbers of any other diapason.', () => {
        expect(weekFn(10)).toBeNull();
    });
    it('Should display "null" when enter numbers of any other diapason.', () => {
        expect(weekFn(1.5)).toBeNull();
    });
    it('Should display "null" when enter numbers of any other diapason.', () => {
        expect(weekFn(0)).toBeNull();
    });
    it('Should display "null" when enter numbers of any other diapason.', () => {
        expect(weekFn(-1)).toBeNull();
    });
    it('Should display "null" when enter parameters of type "string".', () => {
        expect(weekFn('2')).toBeNull();
    });
    it('Should display "null" when enter parameters of type "array".', () => {
        expect(weekFn([2, 5])).toBeNull();
    });
    it('Should display "null" when enter parameters of type "boolean".', () => {
        expect(weekFn(false)).toBeNull();
    });
    it('Should display "null" when enter parameters of type "boolean".', () => {
        expect(weekFn(true)).toBeNull();
    })
})

