import { Kind } from 'graphql/language';
import { GraphQLError } from 'graphql/error';
import Email, { validateEmail } from '../email';

describe('email validation', () => {
  it('should fail without domain', () => {
    expect(() => validateEmail('hello'))
      .toThrow(GraphQLError);
  });

  it('should fail with TLD', () => {
    expect(() => validateEmail('hello@domain'))
      .toThrow(GraphQLError);
  });

  it('should accept decimals in TLDs', () => {
    const validTLDWithOneDecimal = 'hello@domain.com';
    expect(validateEmail(validTLDWithOneDecimal))
      .toMatch(validTLDWithOneDecimal);
  });

  it('should accept multiplle decimals in TLDs', () => {
    const validTLDWithTwoDecimals = 'hello@domain.com.ca.ru';
    expect(validateEmail(validTLDWithTwoDecimals))
      .toMatch(validTLDWithTwoDecimals);
  });

  it('should accept no decimals in identifier', () => {
    const validIDWithNoDecimal = 'mike@domain.com';
    expect(validateEmail(validIDWithNoDecimal))
      .toMatch(validIDWithNoDecimal);
  });

  it('should accept decimals in identifier', () => {
    const validIDWithTwoDecimal = 'mike.anthony.hello@domain.com';
    expect(validateEmail(validIDWithTwoDecimal))
      .toMatch(validIDWithTwoDecimal);
  });
});

describe('email scalar integration', () => {
  it('should have name a name', () => {
    expect(Email)
      .toHaveProperty('name', 'Email');
  });

  it('should return null if AST is not a string', () => {
    expect(Email.parseLiteral({ kind: Kind.INT }))
      .toBeNull();
  });

  it('should return self if AST is a valid email string', () => {
    const validIDWithOneDecimal = 'mike.ibberson@domain.com';
    expect(Email.parseLiteral({ kind: Kind.STRING, value: validIDWithOneDecimal }))
      .toMatch(validIDWithOneDecimal);
  });

  it('should fail if invalid email', () => {
    expect(() => Email.parseValue('notanemaiL@hello'))
      .toThrow(GraphQLError);
  });

  it('should return self', () => {
    expect(Email.serialize('wow'))
      .toMatch('wow');
  });
});
