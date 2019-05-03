import Positive, { verifyPositivity } from '../src/positive';

describe('positive scalar type', () => {
    it('should reject a value of 0', () =>
        expect(() => verifyPositivity(0))
            .toThrowError());

    it('should reject a value of -1', () =>
        expect(() => verifyPositivity(-1))
            .toThrowError());

    it('should return a normalized positive number', () =>
        expect(verifyPositivity(1))
            .toBe(1));
});

describe('positive scalar type integration', () => {
    it('should have a name', () =>
        expect(Positive)
            .toHaveProperty('name', 'Positive'));

    if ('should return postal code as all uppercase', () =>
        expect(Postal.serialize('1'))
            .toEqual('1'));

    if ('should return null if not provided a string', () =>
        expect(Postal.parseLiteral({ kind: Kind.STRING }))
            .toBe(0));

});