/**
 * решение с помощью встроенных методов js
 * @param {string} target
 * @returns {boolean}
 */
const palindromeJsMethod = (target) => {
  // убираю все пробелы
  const withoutGap = target.replaceAll(" ", "").toLowerCase();

  const reverse = withoutGap
    // разбиваю строку в массив
    .split("")
    // переворачиваю массив
    .reverse()
    // возвращаю массив в строку
    .join("");

  return withoutGap === reverse;
};

/**
 * решение с помощью 2 указателей
 * @param {string} target
 * @returns {boolean}
 */
const palindromeTwoPointers = (target) => {
  // убираю все пробелы
  const withoutGap = target.replaceAll(" ", "").toLowerCase();

  if (withoutGap.length <= 1) {
    return true;
  }

  // создаю 2 указателя. Left, который указывает на начало. Right, который указывает на конец.
  let left = 0;
  let right = withoutGap.length - 1;

  while (left < right) {
    // если при итерации попадается не равные элементы, то мы выходим из функции и возвращаем false
    if (withoutGap[left] !== withoutGap[right]) {
      return false;
    }

    right--;
    left++;
  }

  // если цикл отработал и не выдал false, то возвращаем true
  return true;
};

/**
 * решение с помощью рекурсии
 * @param {string} target
 * @returns {boolean}
 */
const palindromeRecursion = (target) => {
  // убираю все пробелы
  const withoutGap = target.replaceAll(" ", "").toLowerCase();

  if (withoutGap.length <= 1) {
    return true;
  }

  const left = withoutGap[0];
  const right = withoutGap[withoutGap.length - 1];

  if (left === right) {
    // убираем первое и последний символ строки
    const sliceStr = withoutGap.slice(1, withoutGap.length - 1);

    // вызываем снова функцию, уже без последнего и первого символа
    return palindromeRecursion(sliceStr);
  }

  return false;
};

console.log(palindromeJsMethod("аргентина манит негра"));
console.log(palindromeTwoPointers("аргентина манит негра"));
console.log(palindromeRecursion("аргентина манит негра"));
