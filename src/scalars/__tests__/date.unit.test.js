import { GraphqlError } from 'graphql/error';
import { Kind } from 'graphql/language';
import Date, { validateDateString, formatDateString } from '../date';

beforeEach(() => {
  // for consistency's sake
  process.env.TZ = 'Canada/Eastern';
});

describe('date validation', () => {
  it('should fail without a conventional string', () => {
    expect(() => validateDateString('heythere'))
      .toThrow(GraphqlError);
  });
});

describe('date formatting', () => {
  it('should format date to YYYY-MM-DD', () => {
    expect(formatDateString('2019-03-21T04:00:00.000Z'))
      .toMatch(/^(\d{4}-\d{2}-\d{2})$/);
  });

  it('should format date to YYYY-MM-DD without the changing value', () => {
    expect(formatDateString('03/25/2015'))
      .toMatch('2015-03-25');
  });
});

describe('date scalar integration', () => {
  it('should have name', () => {
    expect(Date)
      .toHaveProperty('name', 'Date');
  });

  it('should return null if provided an integer', () => {
    expect(Date.parseLiteral({ kind: Kind.INT }))
      .toBeNull();
  });

  it('should return date if given date string', () => {
    const ops = {
      kind: Kind.STRING,
      value: '03-21-2019',
    };

    expect(Date.parseLiteral(ops))
      .toHaveProperty('getMonth');
  });
});
