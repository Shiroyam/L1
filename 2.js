/**
 * Проверка на странное число
 * @param {number} number
 * @returns {boolean}
 */
function strangeNumber(number) {
  let sum = 0;

  for (let i = 1; i < number; i++) {
    // проверка на деление без остатка, т.к если оно делиться без остатка, то число делиться
    if (number % i === 0) {
      sum += i;
    }
  }

  return sum === number;
}

console.log(strangeNumber(6));
console.log(strangeNumber(12));
console.log(strangeNumber(28)); 