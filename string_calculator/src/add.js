const convertStringToNumber = (numberAsString) => {
  let num = Math.round(Number(numberAsString));

  if (num > 1000) {
    num = 0;
  } else if (num < 0) {
    throw new Error("Negative number detected, bad.");
  }

  return num;
};

const workThroughDelimiters = (string) => {
  let delimiters;
  let delimitersString;

  if (string[0] !== "[") delimitersString = "[:;,\n]";
  else {
    const endingIndex = string.search("]");
    delimitersString = "[" + string.substring(1, endingIndex) + "]";
    string = string.substring(endingIndex, string.length);
  }

  delimiters = new RegExp(delimitersString);
  console.log(delimiters);

  /*
  They're working!
  What did you do?

  the regex string needs square brackets around the delimiters:
  [:;,\n] instead of :;,\n

  Oohhh good spot

  The problem now is that the delimiters check starts at the beginning
   of the string, which fails for strings like [;:]1;2:2
I've got an idea
   Grr

   Okay we're not getting the Error now

   String.split shouldnt be from the start of the string, but only split the numbers section
  
  We just need to remove the deliters from the front?

  Yes, maybe return an object containing the modified string and the delimiters?

  Good plan - i like that

  Not splitting -_-
  undefined
   */

  for (let i = 0; i < string.length; ++i) {
    console.log("string under assessment", string[i]);
    if (delimitersString.includes(string[i])) {
      if (delimitersString.includes(string[i + 1]) || i + 1 === string.length) {
        throw new Error("Delimiters must be followed by a number");
      }
    }
  }

  return { string, delimiters };
};

const add = (p) => {
  if (p.length == 0) return 0;

  const { string, d } = workThroughDelimiters(p);
  const numbers = string.split(d);

  console.log("numbers >>> ", numbers);
  console.log(d);

  let sum = 0;
  for (let i = 0; i < numbers.length; ++i) {
    sum += convertStringToNumber(numbers[i]);
  }

  return sum;
};

module.exports = add;
