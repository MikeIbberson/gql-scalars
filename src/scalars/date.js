import { GraphQLScalarType } from 'graphql';
import { GraphQLError } from 'graphql/error';
import { Kind } from 'graphql/language';
import prependLeadingZero from '../helpers';

/**
 * Converts string into a Date object.
 * @param {string} dateString
 * @return {object}
 */

export function validateDateString(dateString) {
  const date = new Date(dateString);
  if (!(date instanceof Date) || String(date).localeCompare('Invalid Date') === 0) {
    throw new GraphQLError('Invalid date input value');
  }

  return date;
}

/**
 * Formats a Date object to YYYY-MM-DD.
 * @param {string} dateString
 * @return {string}
 */

export function formatDateString(dateString) {
  const date = new Date(dateString);
  const dateParts = [
    date.getFullYear(),
    prependLeadingZero(date.getMonth() + 1),
    prependLeadingZero(date.getDate()),
  ];
  return dateParts.join('-');
}

export default new GraphQLScalarType({
  name: 'Date',
  description: 'ISO standard YYYY-MM-DD string',
  serialize: value => formatDateString(value),
  parseValue: value => validateDateString(value),
  parseLiteral: ({ kind: type, value }) => {
    if (type !== Kind.STRING) return null;
    return validateDateString(value);
  },
});
