const number = 6;

const isPrime = num => {
  for (let i = 2; i <= Math.sqrt(num); i++) {
    return !!(num % i)
  }
};

console.assert(isPrime(5) === true);
console.assert(isPrime(6) === false);

console.log(isPrime(number));