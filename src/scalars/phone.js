import { GraphQLScalarType } from 'graphql';
import { GraphqlError } from 'graphql/error';
import { parseKind } from '../helpers';

export function sanitizePhoneNumber(value) {
  let cleaned = String(value).replace(/\D/g, '');

  // if country code is present, remove it
  if (parseInt(cleaned.charAt(0), 10) === 1) {
    cleaned = cleaned.substr(1);
  }

  // all north american numbers are 10 digits long
  if (cleaned.length !== 10) {
    throw new GraphqlError('Invalid phone number');
  }

  return cleaned;
}

export function formatPhoneNumberWithBraces(value) {
  const groups = value.match(/^(\d{3})(\d{3})(\d{4})$/);
  return groups
    // common phone number prettifying
    // area code in braces
    ? `(${groups[1]}) ${groups[2]}-${groups[3]}`
    : null;
}

export default new GraphQLScalarType({
  name: 'Phone',
  description: 'Valid North American phone number',
  serialize: value => formatPhoneNumberWithBraces(value),
  parseValue: value => sanitizePhoneNumber(value),
  parseLiteral: ast => parseKind(ast, 'STRING', sanitizePhoneNumber),
});
