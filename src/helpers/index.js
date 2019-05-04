import { GraphqlError } from 'graphql/error';
import { Kind } from 'graphql/language';

export function prependLeadingZero(str) {
  // only lead single-character strings
  return String(str).length <= 1
    ? `0${str}`
    : str;
}

// all scalars perform the same check
// so might as well abstract it
export function parseKind(
  { kind: type, value },
  kindType = 'STRING',
  fn,
) {
  if (!fn) {
    throw new GraphqlError('Requires a function to parseKind');
  } else if (type !== Kind[kindType]) {
    return null;
  }

  return fn(value);
}
