import Scalars from './index';

const expectedModules = [
  'Date',
  'Email',
  'Phone',
  'PositiveInt',
  'Postal',
  'Time',
];

describe.each(expectedModules)('module exports', (name) => {
  it(`should include ${name} scalar`, () => {
    expect(Scalars).toHaveProperty(name);
  });
});
