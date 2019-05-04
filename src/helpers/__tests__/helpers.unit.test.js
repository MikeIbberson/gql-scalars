import prependLeadingZero from '../index';

describe('the default helper function', () => {
  it('should add a leading zero when provided with a single character', () => {
    expect(prependLeadingZero('1'))
      .toMatch('01');
  });

  it('should return the same string when provided with two characters', () => {
    expect(prependLeadingZero('11'))
      .toMatch('11');
  });
});
