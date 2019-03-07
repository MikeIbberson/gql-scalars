import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

export default new GraphQLScalarType({
    name: 'Postal',
    description: 'Valid North American postal code',

    serialize: value => value.toUpperCase(),
    parseValue: value => validatePostalCode(value),

    parseLiteral: ast =>
        ast.kind === Kind.STRING ?
            validatePostalCode(ast.value) :
            null

});

const validatePostalCode = val => {
    let trimmed = val.replace(/ /g, '');

    if (!/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(trimmed)) {
        throw new Error('Invalid postal code');
    }

    return trimmed;
};