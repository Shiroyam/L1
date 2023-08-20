/**
 * @param { number } число для которого нужно окончание
 * @param { Array.<string> } массив строк окончаний
 */

module.exports = function formatter(number, endings) {
  number = Math.abs(number) % 100;

  if (number >= 11 && number <= 19) {
    return endings[2];
  }

  number = number % 10;

  if (number === 1) {
    return endings[0];
  } else if (number >= 2 && number <= 4) {
    return endings[1];
  } else {
    return endings[2];
  }
};
