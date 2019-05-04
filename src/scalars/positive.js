import { GraphQLScalarType } from 'graphql';
import { GraphqlError } from 'graphql/error';
import { parseKind } from '../helpers';

export function verifyPositivity(num = 0) {
  const int = Math.floor((Number(num)));
  if (int === Infinity || int <= 0) {
    throw new GraphqlError('Must be a positive whole number');
  }

  return int;
}

export default new GraphQLScalarType({
  name: 'Positive',
  description: 'Position whole number',
  serialize: value => value,
  parseValue: value => verifyPositivity(value),
  parseLiteral: ast => parseKind(ast, 'NUMBER', verifyPositivity),
});
