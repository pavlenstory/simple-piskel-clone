export function findDistance(coord1, coord2) {
  const exp1 = ((coord2.x - coord1.x) ** 2);
  const exp2 = ((coord2.y - coord1.y) ** 2);
  const distance = Math.sqrt(exp1 + exp2);
  return distance;
}
