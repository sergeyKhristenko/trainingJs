function isAnagram(a, b) {
  return sortString(a) === sortString(b);

  function sortString(str) {
    return str
      .split('')
      .sort()
      .join('');
  }
};

console.assert(isAnagram('lemon', 'melon') === true);
console.assert(isAnagram('true', 'false') === false);
console.assert(isAnagram('lab', 'ball') === false);
