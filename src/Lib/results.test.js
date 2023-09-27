import { calculate_points } from "./results";

describe("results", () => {
  test("calculates points", () => {
    expect(calculate_points(60000, 60000, 10)).toBe(0);
    expect(calculate_points(70000, 60000, 10)).toBe(0);
    expect(calculate_points(0, 60000, 10)).toBe(10);
    expect(calculate_points(30000, 60000, 10)).toBe(5);
    expect(calculate_points(30000, 30000, 10)).toBe(0);
    expect(calculate_points(15000, 30000, 10)).toBe(5);
    expect(calculate_points(1000, 10000, 10)).toBe(9);
  });
});
