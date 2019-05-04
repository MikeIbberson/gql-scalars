import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

export default new GraphQLScalarType({
    name: 'Positive',
    description: 'Position whole number',

    serialize: value => value,
    parseValue: value => verifyPositivity(value),

    parseLiteral: ast =>
        ast.kind === Kind.NUMBER
            ? verifyPositivity(ast.value)
            : 0
});

export const verifyPositivity = (num = 0) => {
    const int = Math.floor((Number(num)));
    if (int === Infinity || int <= 0) {
        throw new Error('Must be a positive whole number');
    }

    return int;
};


