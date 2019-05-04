import { GraphqlError } from 'graphql/error';
import { Kind } from 'graphql/language';
import { prependLeadingZero, parseKind } from '../index';

describe('prependLeadingZero function', () => {
  it('should add a leading zero when provided with a single character', () => {
    expect(prependLeadingZero('1'))
      .toMatch('01');
  });

  it('should return the same string when provided with two characters', () => {
    expect(prependLeadingZero('11'))
      .toMatch('11');
  });
});

describe('parseKind function', () => {
  it('should throw an error without callback fn', () => {
    expect(() => parseKind({}))
      .toThrow(GraphqlError);
  });

  it('should return null if kind type mismatches', () => {
    expect(parseKind({ kind: Kind.NUMBER }, 'STRING', () => null))
      .toBeNull();
  });

  it('should call the callback with value', () => {
    const fn = jest.fn();
    const value = 1;
    parseKind({ kind: Kind.NUMBER, value }, 'NUMBER', fn);
    expect(fn).toBeCalledWith(value);
  });
});
