import { TimeBuilder_HHMM as Time } from '../src/time';

describe('time builder class', () => {

    it('should fail without a colon', () =>
        expect(() => new Time('1212'))
            .toThrowError());

    it('should fail if the string contains non-alpha characters', () =>
        expect(() => new Time('1:12am'))
            .toThrowError());

    it('should add leading 0 to hours and minutes', () =>
        expect(new Time('1:2').build())
            .toMatch('01:02'));

    it('should fail if hours are longer than three digits', () =>
        expect(() => new Time('100:22').build())
            .toThrowError());

    it('should fail if there are two colons', () =>
        expect(() => new Time('01:22:13'))
            .toThrowError());

    it('should fail if hours exceed 24', () =>
        expect(() => new Time('25:20').getHours())
            .toThrowError());

    it('should fail if minutes exceed 59', () =>
        expect(() => new Time('12:60').getMinutes())
            .toThrowError());

    it('should return the same value if formatted correctly', () =>
        expect(new Time('10:20').build())
            .toMatch('10:20'));

    it('should fail without a value provided to the constructor', () =>
        expect(() => new TimeBuilder_HHMM())
            .toThrowError());

    it('should fail if provided with a string over two characters', () =>
        expect(() => new Time('12:12').validateLength('123'))
            .toThrowError());

});
