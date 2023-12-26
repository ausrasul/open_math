import numberGenerator from "./numberGenerator";

describe("Number generator", () => {
  test("generates array of unique numbers", () => {
    let mayBeUniqueNumbers = numberGenerator.generateNumbers(10, 1, 20);
    expect(mayBeUniqueNumbers.length).toBe(10);
    expect([...new Set(mayBeUniqueNumbers)].length).toEqual(mayBeUniqueNumbers.length);
    
    mayBeUniqueNumbers = numberGenerator.generateNumbers(20, 1, 50);
    expect(mayBeUniqueNumbers.length).toBe(20);
    expect([...new Set(mayBeUniqueNumbers)].length).toEqual(mayBeUniqueNumbers.length);
  });
});
