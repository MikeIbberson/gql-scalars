import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

export default new GraphQLScalarType({

    name: 'Phone',
    description: 'Valid North American phone number',

    serialize: value => formatPhoneNumberWithBraces(value),
    parseValue: value => sanitizePhoneNumber(value),

    parseLiteral: ast =>
        ast.kind === Kind.STRING ?
            sanitizePhoneNumber(ast.value) :
            null

});

export const sanitizePhoneNumber = value => {
    let cleaned = ('' + value).replace(/\D/g, '');

    if (parseInt(cleaned.charAt(0)) === 1) {
        cleaned = cleaned.substr(1);
    }

    if (cleaned.length !== 10) {
        throw new Error('Invalid phone number');
    }

    return cleaned;

};

export const formatPhoneNumberWithBraces = value => {
    let groups = value.match(/^(\d{3})(\d{3})(\d{4})$/);

    return groups ?
        '(' + groups[1] + ') ' + groups[2] + '-' + groups[3]
        : null;
};