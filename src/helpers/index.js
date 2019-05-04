/**
 * Converts any parameter into a string,
 * then adds a leading 0 if it's a single character.
 * @param {string} str
 */

export default function prependLeadingZero(str) {
  return String(str).length <= 1
    ? `0${str}`
    : str;
}
