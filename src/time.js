import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import { prependLeadingZero } from './date';

export default new GraphQLScalarType({

    name: 'Time',
    description: '24-hour clock',

    serialize: value => value,

    parseValue: value =>
        new TimeBuilder_HHMM(value)
            .build(),

    parseLiteral: ({ kind, value }) =>
        kind === Kind.STRING ?
            new TimeBuilder_HHMM(value).build() :
            null

});

export class TimeBuilder_HHMM {

    constructor(value) {

        let char = ':';
        let time = value.split(char);

        if (!value.includes(char) || time.length > 2) {
            throw new Error('String must contain colons to separate hours and minutes');
        }

        if (!/^.?(\d|:)*$/.test(value)) {
            throw new Error('String must contain only colons and numbers')
        }

        this.hours = time[0];
        this.minutes = time[1];
    }

    build() {
        return this.getHours() + ':' + this.getMinutes();
    }

    getHours() {
        this.validateLength(this.hours);
        if (parseInt(this.hours.charAt(0)) > 2 || parseInt(this.hours.charAt(1)) > 4) {
            throw new Error('Hour value cannot be higher than 24');
        }

        return prependLeadingZero(this.hours);
    }

    getMinutes() {
        this.validateLength(this.minutes);
        if (parseInt(this.minutes.charAt(0)) > 5) {
            throw new Error('Hour value cannot be higher than 59');
        }

        return prependLeadingZero(this.minutes);
    }

    validateLength(str) {
        if (str.length > 2) {
            throw new Error('Time values cannot exceed two characters');
        }

        return true;
    }

}
