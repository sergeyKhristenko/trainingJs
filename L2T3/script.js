const A = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];

function sortNumbers(arr) {
  const B = [];
  const C = [];
  arr.forEach(num => {
    if (num > 0) {
      B.push(num);
    }

    if (num < 0) {
      C.push(num);
    }
  });

  console.log('A:', arr);
  console.log('B:', B);
  console.log('C:', C);
}

function countDublicates(arr) {
  const b = {}; // middleware object to store dublicates
  arr.forEach(num => {
    // if there is no such property - create it
    if (!b[num]) {
      b[num] = 1;
    } else {
      // otherwise increment the value
      b[num] += 1;
    }
  });

  Object.keys(b).forEach(key => {
    console.log(key, '-', b[key]);
  });
}

sortNumbers(A);
countDublicates(A);
