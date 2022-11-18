const convertStringToNumber = (numberAsString) => {
  const num = parseInt(numberAsString);

  if (num < 0) {
    throw new Error("Negative number detected, bad.");
  }

  return num > 1000 ? 0 : num;
};

const parseDelimiters = (inputString) => {
  if (inputString[0] === "[") {
    const endingIndex = inputString.search("]");

    if (endingIndex === -1) {
      throw new Error("Invalid string: could not find delimiters");
    }

    const delimitersString = "[" + inputString.substring(1, endingIndex) + "]";
    return { deli };
  }
};

const checkIntegersString = (integers, delimiters) => {
  for (let i = 0; i < integers.length; ++i) {
    if (delimiters.includes(integers[i])) {
      if (delimiters.includes(integers[i + 1]) || i + 1 === integers.length) {
        throw new Error("Delimiters must be followed by a number");
      }
    }
  }
};

const splitDelimitersFromIntegers = (inputString) => {
  if (inputString[0] === "[") {
    const endingIndex = inputString.search("]");

    if (endingIndex === -1) {
      throw new Error("Invalid string: could not find delimiters");
    }

    const delimitersString = "[" + inputString.substring(1, endingIndex) + "]";
    const integers = inputString.substring(endingIndex + 1, inputString.length);

    checkIntegersString(integers, delimitersString);

    return {
      string: integers,
      delimiters: new RegExp(delimitersString),
    };
  } else {
    const delimitersString =
      inputString[0] === "[" ? parseDelimiters(inputString) : "[:;,\n]";

    checkIntegersString(inputString, delimitersString);

    return {
      string: inputString,
      delimiters: new RegExp(delimitersString),
    };
  }
};

const add = (inputString) => {
  if (inputString.length == 0) return 0;

  const { string, delimiters } = splitDelimitersFromIntegers(inputString);

  const integers = string.split(delimiters);
  const sum = integers.reduce(
    (total, current) => total + convertStringToNumber(current),
    0
  );

  return sum;
};

module.exports = add;
