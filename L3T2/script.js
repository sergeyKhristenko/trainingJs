// L2T1
const A = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
let B = [];
let C = [];

// exclude 0
A.forEach(num => num === 0 || (num > 0 ? B.push(num) : C.push(num)));

console.log(`A: ${A}`);
console.log(`B(n>0): ${B}`);
console.log(`C(n<0): ${C}`);

// tests(kind of)
console.assert(B.length === 5);
console.assert(C.length === 5);
console.assert(B.includes(0) === false);
console.assert(C.includes(0) === false);


// L2T2
const a = [1, 2, 1, 2, 3.14, 4, 2, 1];

const mappedObj = a.reduce((obj, number) => {
  obj[number] ? obj[number] += 1 : obj[number] = 1;

  return obj;
}, {});

for(let [key, value] of Object.entries(mappedObj)) {
  console.log(`${key} - ${value}`);
}

// tests(kind of)
console.assert(Object.keys(mappedObj).length === 4);
console.assert(mappedObj[1] === 3);
console.assert(mappedObj[2] === 3);
console.assert(mappedObj[3.14] === 1);
console.assert(mappedObj[4] === 1);
