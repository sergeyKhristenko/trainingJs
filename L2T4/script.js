const isAnagram = (a, b) => a.split('').sort().join('') === b.split('').sort().join('');

console.assert(isAnagram('lemon', 'melon') === true);
console.assert(isAnagram('true', 'false') === false);
console.assert(isAnagram('lab', 'ball') === false);
