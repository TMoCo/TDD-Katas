const convertStringToNumber = (numberAsString) => {
  const num = parseInt(numberAsString);

  if (num < 0) {
    throw new Error('Negative number detected, bad.');
  }

  return num > 1000 ? 0 : num;
};

const splitDelimitersFromIntegers = (inputString) => {
  if (inputString[0] === '[') {
    const endingIndex = inputString.search(']');

    if (endingIndex === -1) {
      throw new Error('Invalid string: could not find delimiters');
    }

    const delimiters = new RegExp(
      '[' + inputString.substring(1, endingIndex) + ']'
    );

    const intString = inputString.substring(
      endingIndex + 1,
      inputString.length
    );

    return {
      intString,
      delimiters,
    };
  }
  return {
    intString: inputString,
    delimiters: new RegExp('[:;,\n]'),
  };
};

export { convertStringToNumber, splitDelimitersFromIntegers };
