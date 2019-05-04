import { GraphQLScalarType } from 'graphql';
import { GraphQLError } from 'graphql/error';
import { Kind } from 'graphql/language';

export function validateEmail(val) {
  // simple regex for detecting most valid email cases
  // cannot remember who to credit
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
    throw new GraphQLError('Invalid email address');
  }

  return val;
}

export default new GraphQLScalarType({
  name: 'Email',
  description: 'Valid email address',
  serialize: value => value,
  parseValue: value => validateEmail(value),
  parseLiteral: ({ kind: type, value }) => {
    if (type !== Kind.STRING) return null;
    return validateEmail(value);
  },
});
