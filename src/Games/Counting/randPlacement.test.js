import randPlacement from "./randPlacement";

describe("object random placement", () => {
  test("create list of randomly placed objects", () => {
    const testCases = [
      { xMax: 100, yMax: 100, objNum: 10, objDim: [10, 10], margin: 10 },
      { xMax: 500, yMax: 200, objNum: 10, objDim: [5, 5], margin: 50 },
      { xMax: 500, yMax: 200, objNum: 10, objDim: [5, 5] },
    ];
    testCases.forEach((t) => {
      const objects = randPlacement(
        t.xMax,
        t.yMax,
        t.objNum,
        t.objDim,
        t.margin
      );
      expect(objects.length).toBe(t.objNum);
      const [xOffset, yOffset] = t.objDim;
      t.margin ? (t.margin = t.margin) : (t.margin = 0);
      objects.forEach((obj, idx) => {
        objects.forEach((obj_, idx_) => {
          if (idx === idx_) return;
          const [x, y] = obj;
          const [x_, y_] = obj_;
          expect(x >= 0 && x_ >= 0 && y >= 0 && y_ >= 0).toBe(true);
          expect(
            x + xOffset < t.xMax &&
              x_ + xOffset < t.xMax &&
              y + yOffset < t.yMax &&
              y_ + yOffset < t.yMax
          ).toBe(true);
          if (
            (x > x_ - t.margin && x < x_ + xOffset + t.margin) ||
            (x + xOffset > x_ - t.margin &&
              x + xOffset < x_ + xOffset + t.margin)
          ) {
            expect(
              y + yOffset < y_ - t.margin || y > y_ + yOffset + t.margin
            ).toBe(true);
          }
          if (
            (y > y_ - t.margin && y < y_ + yOffset + t.margin) ||
            (y + yOffset > y_ - t.margin &&
              y + yOffset < y_ + yOffset + t.margin)
          ) {
            expect(
              x + xOffset < x_ - t.margin || x > x_ + xOffset + t.margin
            ).toBe(true);
          }
        });
      });
    });
    const objects1 = randPlacement(100, 100, 5, [10, 10]);
    const objects2 = randPlacement(100, 100, 5, [10, 10]);
    objects1.forEach(([x1, y1], i) => {
      const [x2, y2] = objects2[i];
      expect(x1 === x2 && y1 === y2).toBe(false);
    });
  });
  test("limit iterations", () => {
    const testCases = [
      { xMax: 100, yMax: 100, objNum: 1000, objDim: [100, 100], margin: 10 },
      { xMax: 500, yMax: 200, objNum: 1000, objDim: [100, 100], margin: 50 },
      { xMax: 500, yMax: 200, objNum: 1000, objDim: [100, 100] },
    ];
    testCases.forEach((t) => {
      const objs = randPlacement(t.xMax, t.yMax, t.objNum, t.objDim, t.margin);
      expect(objs.length).toBe(0);
    });
  });
});
