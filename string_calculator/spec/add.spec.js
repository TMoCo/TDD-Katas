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
    const delimiters = ["1,1", "1:1", "1\n1", "1;1"];
    delimiters.forEach((delimiter) => {
      expect(add(delimiter)).toEqual(2);
    });
  });

  it("should always have delimiters followed by a number", () => {
    expect(() => {
      add("1;");
    }).toThrow(
      new Error("Invalid string (Delimiters must be preceded by a number)")
    );
  });

  it("Splits the string into numbers using delimiters spedified at the start of the string", () => {
    expect(add("[|{]1{4|2")).toEqual(7);
  });
});
