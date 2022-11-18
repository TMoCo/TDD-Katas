import {
  splitDelimitersFromIntegers,
  convertStringToNumber,
} from './string.js';

const add = (inputString) => {
  if (inputString.length == 0) return 0;

  const { intString, delimiters } = splitDelimitersFromIntegers(inputString);

  const integers = intString.split(delimiters);

  return integers.reduce((sum, integer) => {
    if (integer.length === 0) {
      throw new Error(
        'Invalid string (Delimiters must be preceded by a number)'
      );
    }
    return sum + convertStringToNumber(integer);
  }, 0);
};

export default add;
