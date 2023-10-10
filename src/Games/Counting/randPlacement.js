export default function place(xMax, yMax, objNum, objDimentions, objMargin) {
  const objects = [];
  objMargin = objMargin | 0
  const [objDimX, objDimY] = objDimentions;
  let maxIterations = 10000
  while (objects.length < objNum && maxIterations > 0) {
    maxIterations -= 1
    let x = Math.floor(Math.random() * (xMax - objDimX));
    let y = Math.floor(Math.random() * (yMax - objDimY));
    const foundCollision = objects.reduce((collision, [x_, y_]) => {
      if (
        ((x >= x_ && x <= x_ + objDimX + objMargin) || (x + objDimX >= x_ - objMargin && x + objDimX <= x_ + objDimX)) &&
        ((y >= y_ && y <= y_ + objDimY + objMargin) || (y + objDimY >= y_ - objMargin && y + objDimY <= y_ + objDimY))
      ) {
        return true;
      } else {
        return collision;
      }
    }, false);
    if (!foundCollision) objects.push([x, y]);
  }
  if (maxIterations === 0) return []
  return objects
}
