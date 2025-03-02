import {ageClassification, weekFn} from "./main.js";
describe('ageClassification', () => {
    it('Should display age type, depending from age. ', () => {
        expect(ageClassification(-1)).toBe(null);
        expect(ageClassification(0)).toBe(null);
        expect(ageClassification(1)).toBe('Дитинство');
        expect(ageClassification(24)).toBe('Дитинство');
        expect(ageClassification(24.01)).toBe('Молодість');
        expect(ageClassification(44)).toBe('Молодість');
        expect(ageClassification(44.01)).toBe('Зрілість');
        expect(ageClassification(65)).toBe('Зрілість');
        expect(ageClassification(65.1)).toBe('Старість');
        expect(ageClassification(75)).toBe('Старість');
        expect(ageClassification(75.01)).toBe('Довголіття');
        expect(ageClassification(90)).toBe('Довголіття');
        expect(ageClassification(90.01)).toBe('Рекорд');
        expect(ageClassification(122)).toBe('Рекорд');
        expect(ageClassification(122.01)).toBe(null);
        expect(ageClassification(150)).toBe(null);
        expect(ageClassification('asd')).toBe(null);
        expect(ageClassification('')).toBe(null);
        expect(ageClassification([12, 5])).toBe(null);
        expect(ageClassification(true)).toBe(null);
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

