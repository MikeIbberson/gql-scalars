import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

export default new GraphQLScalarType({

    name: 'Date',
    description: 'ISO standard YYYY-MM-DD string',

    serialize: value => value,
    parseValue: value => formatDateString(value),

    parseLiteral: ast =>
        ast.kind === Kind.STRING ?
            formatDateString(ast.value) :
            null

});

export const formatDateString = str => {
    let date = new Date(str);

    if (!(date instanceof Date) || isNaN(date)) {
        throw new TypeError('Invalid date input value');
    }

    return [
        date.getFullYear(),
        prependLeadingZero(date.getMonth() + 1),
        prependLeadingZero(date.getDate())
    ].join('-');
}

export const prependLeadingZero = str =>
    String(str).length <= 1 ?
        `0${str}` :
        str;