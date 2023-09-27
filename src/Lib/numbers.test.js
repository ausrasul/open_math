import Numbers from "./numbers";

describe("MyCompnent", () => {
  var s;
  beforeEach(() => {
    s = new Numbers();
  });
  afterEach(() => {});

  test("converts array to number", () => {
    expect(s.arr2num([1, 2, 3, 4])).toBe(1234);
    expect(s.arr2num([9, 3, 1])).toBe(931);
    expect(s.arr2num([0, 3, 1])).toBe(31);
    expect(s.arr2num([0, 3, 1, 0])).toBe(310);
  });
  test("converts number to array", () => {
    expect(s.num2arr(1234)).toEqual([1, 2, 3, 4]);
    expect(s.num2arr(345)).toEqual([3, 4, 5]);
    expect(s.num2arr(1000)).toEqual([1, 0, 0, 0]);
    expect(s.num2arr(123, 4)).toEqual([0, 1, 2, 3]);
  });
  test("generates smaller number array", () => {
    for (let i = 0; i < 3000; i++) {
      const num = Math.floor(Math.random() * 100000);
      const num_arr = s.num2arr(num);
      const smaller_num_arr = s.generate_smaller_number_array(num_arr);
      expect(s.arr2num(smaller_num_arr)).toBeLessThan(num);
    }
  });
  test("generates number array longer than 0", () => {
    for (let i = 0; i < 100; i++) {
      const num_arr = s.generate_number_array(0);
      expect(num_arr.length).toBe(1);
    }
  });
  test("generates number array", () => {
    for (let i = 0; i < 1000; i++) {
      const len = Math.max(Math.floor(Math.random() * 10), 1);
      expect(len).toBeGreaterThan(0);
      const num_arr = s.generate_number_array(len);
      expect(num_arr[0]).toBeGreaterThan(0);
    }
  });
  /* test("generates slightly smaller numbers", () => {
    expect(s.generate_smaller_number(1234)).toBeLessThan(1234);
    expect(s.generate_smaller_number(345)).toBeLessThan(345);
    expect(s.generate_smaller_number(1000)).toBeLessThan(1000);
    expect(s.generate_smaller_number(123)).toBeLessThan(123);
    expect(s.generate_smaller_number(1234)).toBeGreaterThan(234);
    expect(s.generate_smaller_number(345)).toBeGreaterThan(45);
    expect(s.generate_smaller_number(1000)).toBeGreaterThan(800);
    expect(s.generate_smaller_number(123)).toBeGreaterThan(23);
  });*/
});
