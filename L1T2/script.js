const number = 6;

const isPrime = num => {
  if(num === 1 || !Number.isInteger(num)) {
    return false;
  }

  for (let i = 2; i <= Math.sqrt(num); i++) {
    if(num % i === 0) {
      return false;
    }
  }

  return true
};

console.assert(isPrime(5) === true, '5');
console.assert(isPrime(6) === false, '6');
console.assert(isPrime(2) === true, '2');
console.assert(isPrime(3) === true, '3');
console.assert(isPrime(1) === false, '1');
console.assert(isPrime(2.2) === false, '2.2');
console.assert(isPrime(2.22) === false, '2.2');

console.log(isPrime(5));