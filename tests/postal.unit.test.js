import Postal, { validatePostalCode } from '../src/postal';

describe('postal code validation function', () => {

    it('should fail with all numbers', () =>
        expect(() => validatePostalCode('123456'))
            .toThrowError());

    it('should fail with all letters', () =>
        expect(() => validatePostalCode('abcdef'))
            .toThrowError());

    it('should fail with special characters', () =>
        expect(() => validatePostalCode('l!r586'))
            .toThrowError());

    it('should pass with 3 numbers and 3 letters', () =>
        expect(validatePostalCode('l4r 7t7'))
            .toMatch('l4r7t7'));

});

describe('postal scalar integration', () => {

    it('should have a name', () =>
        expect(Postal)
            .toHaveProperty('name', 'Postal'));

    if ('should return postal code as all uppercase', () =>
        expect(Postal.serialize('l9i8u8'))
            .toEqual('L9I8U8'));

    if ('should return null if not provided a string', () =>
        expect(Postal.parseLiteral({ kind: Kind.INT }))
            .toBeNull());

});