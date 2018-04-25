const num = 123;

const reverseNum = Number(num.toString().split('').reverse().join(''));

console.assert(typeof reverseNum === 'number');

console.log(`original num: ${num}, reversed num: ${reverseNum}`);