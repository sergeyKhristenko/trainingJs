// L2T1
const A = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
let B = [];
let C = [];

// exclude 0
A.forEach(num => num === 0 || (num > 0 ? B.push(num) : C.push(num)));

console.log('A:', A);
console.log('B(n>0):', B);
console.log('C(n<0):', C);

// tests(kind of)
console.assert(B.length === 5);
console.assert(C.length === 5);

console.assert(B.includes(0) === false);
console.assert(C.includes(0) === false);


// L2T2
const a = [1, 2, 1, 2, 3.14, 4, 2, 1];

const b = a.reduce((accum, curr, i, arr) => {
  !accum[curr] ? accum[curr] = 1 : accum[curr] += 1;

  return accum;
}, {});

Object.keys(b).forEach(key => console.log(key, '-', b[key]));

// tests(kind of)
console.assert(Object.keys(b).length === 4);
console.assert(b[1] === 3);
console.assert(b[2] === 3);
console.assert(b[3.14] === 1);
console.assert(b[4] === 1);
