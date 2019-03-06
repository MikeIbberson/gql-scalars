import { prependLeadingZero, formatDateString } from '../src/date';

describe('date utility functions', () => {

    it('should add a leading zero', () =>
        expect(prependLeadingZero('1'))
            .toMatch('01'));

    it('should return same string if provided with two characters', () =>
        expect(prependLeadingZero('11'))
            .toMatch('11'));

    it('should fail without a valid date string', () =>
        expect(() => formatDateString('heythere'))
            .toThrowError());

    it('should fail without a valid date string', () =>
        expect(() => formatDateString('heythere'))
            .toThrow(TypeError));

    it('should format date to YYYY-MM-DD format', () =>
        expect(formatDateString('03/25/2015'))
            .toMatch(/^(\d{4}-\d{2}-\d{2})$/));

    it('should format date to YYYY-MM-DD format without changing value', () =>
        expect(formatDateString('03/25/2015'))
            .toMatch('2015-03-25'));

});

