function findRoots(a, b, c) {
  let roots = [];

  const D = b * b - 4 * a * c;

  if (D < 0) {
    return 'No roots!';
  }

  const firstRoot = (-b + Math.sqrt(D)) / 2 * a;
  roots.push(firstRoot);

  if (D > 0) {
    const secondRoot = (-b - Math.sqrt(D)) / 2 * a;
    roots.push(secondRoot);
  }

  return roots;
}

// two roots
const twoRoots = findRoots(1, -2, -3);
console.assert(twoRoots.length === 2 && twoRoots[0] === 3 && twoRoots[1] === -1);
// one root
const oneRoot = findRoots(1, 12, 36);
console.assert(oneRoot.length === 1 && oneRoot[0] === -6);
// no roots
const noRoots = findRoots(5, 3, 7);
console.assert(noRoots === 'No roots!');

const defaultCase = findRoots(-1, -2, 15);
console.log(defaultCase);