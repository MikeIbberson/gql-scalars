import Scalars from '../src';

describe.each(['Date', 'Email', 'Phone', 'Postal', 'Time'])
    ('verify export', name =>

        it(`should include ${name} scalar`, () =>
            expect(Scalars)
                .toHaveProperty(name)));