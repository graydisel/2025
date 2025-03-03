import {ageClassification, weekFn} from "./main-old.js";
describe('ageClassification function', () => {
    it('Should display null type with negative number.', () => {
        expect(ageClassification(-1)).toBe(null);
    });
    it('Should display null type with 0 number.', () => {
        expect(ageClassification(0)).toBe(null);
    });
    it('Should display Дитинство in age period from 1 to 24. ', () => {
        expect(ageClassification(1)).toBe('Дитинство');
    });
    it('Should display Дитинство in age period from 1 to 24. ', () => {
        expect(ageClassification(24)).toBe('Дитинство');
    });
    it('Should display in age period from 1 to 24. ', () => {
        expect(ageClassification(24.01)).toBe('Молодість');
    });
    it('Should display in age period from 1 to 24. ', () => {
        expect(ageClassification(44)).toBe('Молодість');
    });
    it('Should display in age period from 1 to 24. ', () => {
        expect(ageClassification(44.01)).toBe('Зрілість');
    });
    it('Should display in age period from 1 to 24. ', () => {
        expect(ageClassification(65)).toBe('Зрілість');
    });
    it('Should display in age period from 1 to 24. ', () => {
        expect(ageClassification(65.1)).toBe('Старість');
    });
    it('Should display in age period from 1 to 24. ', () => {
        expect(ageClassification(75)).toBe('Старість');
    });
    it('Should display in age period from 1 to 24. ', () => {
        expect(ageClassification(75.01)).toBe('Довголіття');
    });
    it('Should display in age period from 1 to 24. ', () => {
        expect(ageClassification(90)).toBe('Довголіття');
    });
    it('Should display in age period from 1 to 24. ', () => {
        expect(ageClassification(90.01)).toBe('Рекорд');
    });
    it('Should display in age period from 1 to 24. ', () => {
        expect(ageClassification(122)).toBe('Рекорд');
    });
    it('Should display in age period from 1 to 24. ', () => {
        expect(ageClassification(122.01)).toBe(null);
    });
    it('Should display in age period from 1 to 24. ', () => {
        expect(ageClassification(150)).toBe(null);
    });
    it('Should display in age period from 1 to 24. ', () => {
        expect(ageClassification('asd')).toBe(null);
    });
    it('Should display in age period from 1 to 24. ', () => {
        expect(ageClassification('')).toBe(null);
    });
    it('Should display in age period from 1 to 24. ', () => {
        expect(ageClassification([12, 5])).toBe(null);
    });
    it('Should display in age period from 1 to 24. ', () => {
        expect(ageClassification(true)).toBe(null);
    });
    it('Should display in age period from 1 to 24. ', () => {
        expect(ageClassification(false)).toBe(null);
    });
})

describe('weekFn', () => {
    it('Should display day of the week, depending of number', () => {
        expect(weekFn(1)).toBe('Понеділок');
        expect(weekFn(2)).toBe('Вівторок');
        expect(weekFn(3)).toBe('Середа');
        expect(weekFn(4)).toBe('Четвер');
        expect(weekFn(5)).toBe('П\'ятниця');
        expect(weekFn(6)).toBe('Субота');
        expect(weekFn(7)).toBe('Неділя');
        expect(weekFn(10)).toBe(null);
        expect(weekFn(1.5)).toBe(null);
        expect(weekFn(0)).toBe(null);
        expect(weekFn(-1)).toBe(null);
        expect(weekFn('2')).toBe(null);
        expect(weekFn([2, 5])).toBe(null);
        expect(weekFn(0)).toBe(null);
        expect(weekFn(false)).toBe(null);
        expect(weekFn(true)).toBe(null);
    })
})

