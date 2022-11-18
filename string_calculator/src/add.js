const convertStringToNumber = (numberAsString) => {
  const num = parseInt(numberAsString);

  if (num < 0) {
    throw new Error("Negative number detected, bad.");
  }

  return num > 1000 ? 0 : num;
};

const extractDelimitersFromString = (string) => {
  let delimiters;
  let delimitersString;

  if (string[0] !== "[") delimitersString = "[:;,\n]";
  else {
    const endingIndex = string.search("]");
    delimitersString = "[" + string.substring(1, endingIndex) + "]";
    string = string.substring(endingIndex + 1, string.length);
  }

  delimiters = new RegExp(delimitersString);

  for (let i = 0; i < string.length; ++i) {
    if (delimitersString.includes(string[i])) {
      if (delimitersString.includes(string[i + 1]) || i + 1 === string.length) {
        throw new Error("Delimiters must be followed by a number");
      }
    }
  }

  return { string, delimiters };
};

const add = (inputString) => {
  if (inputString.length == 0) return 0;

  const { string, delimiters } = extractDelimitersFromString(inputString);
  const numbers = string.split(delimiters);

  let sum = 0;
  for (let i = 0; i < numbers.length; ++i) {
    sum += convertStringToNumber(numbers[i]);
  }

  return sum;
};

module.exports = add;
