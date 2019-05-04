import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

export default new GraphQLScalarType({

    name: 'Email',
    description: 'Valid email address',

    serialize: value => value,

    parseValue: value => validateEmail(value),

    parseLiteral: ast =>
        ast.kind === Kind.STRING ?
            validateEmail(ast.value) :
            null

});

export const validateEmail = val => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        throw new Error('Invalid email address');
    }

    return val;
}
