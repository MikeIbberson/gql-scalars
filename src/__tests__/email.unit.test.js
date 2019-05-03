import { Kind } from 'graphql/language';
import Email, { validateEmail } from '../email';

const validTLDWithOneDecimal = 'hello@domain.com';
const validTLDWithTwoDecimals = 'hello@domain.com.ca.ru';
const validIDWithNoDecimal = 'mike@domain.com';
const validIDWithOneDecimal = 'mike.ibberson@domain.com';

describe('email validation function', () => {

    it('should fail without domain', () =>
        expect(() => validateEmail('hello'))
            .toThrowError());

    it('should fail with TLD', () =>
        expect(() => validateEmail('hello@domain'))
            .toThrowError());

    it('should accept decimals in TLDs', () =>
        expect(validateEmail(validTLDWithOneDecimal))
            .toMatch(validTLDWithOneDecimal));

    it('should accept multiplle decimals in TLDs', () =>
        expect(validateEmail(validTLDWithTwoDecimals))
            .toMatch(validTLDWithTwoDecimals));

    it('should accept no decimals in identifier', () =>
        expect(validateEmail(validIDWithNoDecimal))
            .toMatch(validIDWithNoDecimal));

    it('should accept decimals in identifier', () =>
        expect(validateEmail(validIDWithOneDecimal))
            .toMatch(validIDWithOneDecimal));

});

describe('email scalar integration', () => {

    it('should have name a name', () =>
        expect(Email)
            .toHaveProperty('name', 'Email'));

    it('should return null if AST is not a string', () =>
        expect(Email.parseLiteral({ kind: Kind.INT }))
            .toBeNull());

    it('should return self if AST is a valid email string', () =>
        expect(Email.parseLiteral({ kind: Kind.STRING, value: validIDWithOneDecimal }))
            .toMatch(validIDWithOneDecimal));

    it('should fail if invalid email', () =>
        expect(() => Email.parseValue('notanemaiL@hello'))
            .toThrowError());

    it('should return self', () =>
        expect(Email.serialize('wow'))
            .toMatch('wow'));

});