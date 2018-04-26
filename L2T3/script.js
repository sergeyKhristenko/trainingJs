const A = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];

function sortNumbers(arr) {
  const B = [];
  const C = [];
  arr.forEach(num => num === 0 || (num > 0 ? B.push(num) : C.push(num)));

  console.log('A:', arr);
  console.log('B:', B);
  console.log('C:', C);
}

function countDublicates(arr) {
  const b = {};
  arr.forEach(num => (!b[num] ? (b[num] = 1) : (b[num] += 1)));

  Object.keys(b).forEach(key => console.log(key, '-', b[key]));
}

sortNumbers(A);
countDublicates(A);
