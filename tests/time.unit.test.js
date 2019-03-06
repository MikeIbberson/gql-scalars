import time, { TimeBuilder_HHMM } from '../src/time';

describe('time scalar', () => {

    it('should fail without a colon', () =>
        expect(() => time.parseValue('1212'))
            .toThrowError());

    it('should fail if the string contains non-alpha characters', () =>
        expect(() => time.parseValue('1:12am'))
            .toThrowError());

    it('should add leading 0 to hours and minutes', () =>
        expect(time.parseValue('1:2'))
            .toMatch('01:02'));

    it('should fail if hours are longer than three digits', () =>
        expect(() => time.parseValue('100:22'))
            .toThrowError());

    it('should fail if there are two colons', () =>
        expect(() => time.parseValue('01:22:13'))
            .toThrowError());

    it('should fail if hours exceed 24', () =>
        expect(() => time.parseValue('25:20'))
            .toThrowError());

    it('should fail if minutes exceed 59', () =>
        expect(() => time.parseValue('12:60'))
            .toThrowError());

    it('should return the same value if formatted correctly', () =>
        expect(time.parseValue('10:20'))
            .toMatch('10:20'));

});

describe('time builder class', () => {

    const util = new TimeBuilder_HHMM('12:12');

    it('should fail without a value provided to the constructor', () =>
        expect(() => new TimeBuilder_HHMM())
            .toThrowError());

    it('should add a leading zero', () =>
        expect(util.prependLeadingZero('1'))
            .toMatch('01'));

    it('should return same string if provided with two characters', () =>
        expect(util.prependLeadingZero('11'))
            .toMatch('11'));

    it('should fail if provided with a string over two characters', () =>
        expect(() => util.validateLength('123'))
            .toThrowError());

});
