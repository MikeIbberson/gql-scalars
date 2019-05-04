import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import { prependLeadingZero } from '../helpers';

export default new GraphQLScalarType({

  name: 'Time',
  description: '24-hour clock',

  serialize: value => formatTimeString(value),
  parseValue: value => validateTimeString(value),

  parseLiteral: ({ kind, value }) =>
    kind === Kind.STRING ?
      validateTimeString(value) :
      null

});

export const validateTimeString = val => {
  if (!/^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/.test(val)) {
    throw new Error('Invalid 24-hour time string');
  }

  return val;
};

export const formatTimeString = val => {
  let time = val.split(':');
  return prependLeadingZero(time[0]) + ':' + prependLeadingZero(time[1]);
};