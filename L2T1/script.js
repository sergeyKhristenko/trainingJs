const A = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
const B = [];
const C = [];

A.forEach(num => {
  if (num > 0) {
    B.push(num);
  }

  if (num < 0) {
    C.push(num);
  }
});

console.assert(B.length === 5);
console.assert(C.length === 5);

console.assert(B.includes(0) === false);
console.assert(C.includes(0) === false);

console.log('A:', A);
console.log('B:', B);
console.log('C:', C);
