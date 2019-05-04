import { GraphQLScalarType } from 'graphql';
import { GraphQLError } from 'graphql/error';
import { parseKind } from '../helpers';

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
  parseLiteral: ast => parseKind(ast, 'STRING', validateEmail),
});
