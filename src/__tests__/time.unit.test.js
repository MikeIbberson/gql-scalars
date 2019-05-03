import { Kind } from 'graphql/language';
import Time, { validateTimeString, formatTimeString } from '../time';

const validTimeString = '10:20';

describe('time validation functions', () => {

    it('should fail without a colon', () =>
        expect(() => validateTimeString('1212'))
            .toThrowError());

    it('should fail if the string contains non-alpha characters', () =>
        expect(() => validateTimeString('1:12am'))
            .toThrowError());

    it('should fail if hours are longer than three digits', () =>
        expect(() => validateTimeString('100:22'))
            .toThrowError());

    it('should fail if there are two colons', () =>
        expect(() => validateTimeString('01:22:13'))
            .toThrowError());

    it('should fail if hours exceed 24', () =>
        expect(() => validateTimeString('25:20'))
            .toThrowError());

    it('should fail if minutes exceed 59', () =>
        expect(() => validateTimeString('12:60'))
            .toThrowError());

    it('should return the same value if formatted correctly', () =>
        expect(validateTimeString(validTimeString))
            .toMatch(validTimeString));

    it('should add leading 0 to hours and minutes', () =>
        expect(formatTimeString('1:2'))
            .toMatch('01:02'));

});

describe('time scalar integration', () => {

    it('should have a name', () =>
        expect(Time)
            .toHaveProperty('name', 'Time'));

    it('should fail if provided something other than a string', () =>
        expect(Time.parseLiteral({ kind: Kind.ID }))
            .toBeNull());

    it('should return self if a string', () =>
        expect(Time.parseLiteral({ kind: Kind.STRING, value: validTimeString }))
            .toMatch(validTimeString));

    it('should return padded time to the client', () =>
        expect(Time.serialize('1:11'))
            .toMatch('01:11'));

});