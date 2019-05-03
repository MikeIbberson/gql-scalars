import { Kind } from 'graphql/language';
import Phone, { sanitizePhoneNumber, formatPhoneNumberWithBraces } from '../phone';

describe('phone validation functions', () => {

    it('should fail without enough numbers', () =>
        expect(() => sanitizePhoneNumber('1928347'))
            .toThrowError());

    it('should fail with too many numbers', () =>
        expect(() => sanitizePhoneNumber('905987345134'))
            .toThrowError());

    it('should pass with country code', () =>
        expect(sanitizePhoneNumber('+14165783241'))
            .toMatch('4165783241'));

    it('should pass without country code', () =>
        expect(sanitizePhoneNumber('6478921345'))
            .toMatch('6478921345'));

    it('should pass with hypens', () =>
        expect(sanitizePhoneNumber('647-892-1345'))
            .toMatch('6478921345'));

    it('should format a valid phone number', () =>
        expect(formatPhoneNumberWithBraces('1234567890'))
            .toMatch('(123) 456-7890'));

    it('should return null if invalid number', () =>
        expect(formatPhoneNumberWithBraces('973247'))
            .toBeNull());

});

describe('phone scalar integration', () => {

    it('should have a name', () =>
        expect(Phone)
            .toHaveProperty('name', 'Phone'));

    it('should fail if not given a string', () =>
        expect(Phone.parseLiteral({ kind: Kind.INT }))
            .toBeNull());

    it('should return cleaned string', () =>
        expect(Phone.parseLiteral({ kind: Kind.STRING, value: '+1 (567) 999-8234' }))
            .toMatch('5679998234'));

});