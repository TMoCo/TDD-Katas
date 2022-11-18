const add = require("../src/add");

describe("Number cleaning", () => {
  it("returns 0 when given an empty string", () => {
    expect(add("")).toEqual(0);
  });

  it("returns the number if only one is provided", () => {
    expect(add("2")).toEqual(2);
  });

  it("converts floating point numbers into integer values", () => {
    expect(add("3.15")).toEqual(3);
  });

  it("ignores numbers larger than 1000", () => {
    expect(add("1001")).toEqual(0);
  });

  it("only allows positive numbers", () => {
    expect(() => {
      add("-20");
    }).toThrow(new Error("Negative number detected, bad."));
  });
});

describe("Add functionality", () => {
  it("should add two numbers separated by one of the following delimiters: , : \\n ;", () => {
    expect(add("1,1")).toEqual(2);
    expect(add("1:1")).toEqual(2);
    expect(add("1\n1")).toEqual(2);
    expect(add("1;1")).toEqual(2);
  });

  it("should always have delimiters followed by a number", () => {
    expect(() => {
      add("1;");
    }).toThrow(new Error("Delimiters must be followed by a number"));
  });

  fit("Splits the string into numbers using delimiters spedified at the start of the string", () => {
    expect(add("[|{]1{4|2")).toEqual(7);
  });
});

/*

eg: "[:;'\|]12|23"

General Info: 
- The add functions take a string
- Each string contains zero or more integer values
- Separators are used between values
Test Cases:
[x] Floating point numbers should be converted to integers
[x] Separators can be , or ; or : or \n
 -> For example, “1,2” or “3\n4” or “3;4”
[x] These can be added together
[x] An empty string will return zero
[x] A string with a single integer will return that value
[x] Numbers bigger than 1,000 should be ignored,
 -> for example: 2 + 1001 == 2
[x] A Delimiter must be followed by a number
 -> 1\n2 and 1,2 as is 1;2 are all valid
 -> \n or 2; are not valid
[x] Delimiters can be mixed e.g., 1,2;3
[x] Only allow positive numbers,
 -> negative numbers generate an error
 Extension points
n add a list of valid delimiters before the values in brackets
p [,;]1,2;3
*/
