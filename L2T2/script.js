const a = [1, 2, 1, 2, 3.14, 4, 2, 1];

const b = {};
a.forEach(num => !b[num] ? b[num] = 1 : b[num] += 1);

Object.keys(b).forEach(key => console.log(key, '-', b[key]));


console.assert(b[1] === 3);
console.assert(b[2] === 3);
console.assert(b[3.14] === 1);
console.assert(b[4] === 1);
