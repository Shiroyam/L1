/**
 * Вызов функций с замыканием
 * @param {Array.<Function>} arr
 * @returns {Array}
 */
function closureFunction(arr) {
  return function() {
    let result = [];

    arr.forEach((func) => {
      result.push(func());
    });  

    return result;
  }
}

function func1() {
  return "Конец функции 0";
}

function func2() {
  return "Конец функции 1";
}

function func3() {
  return "Конец функции 2";
}

const functions = [func1, func2, func3];

const closure = new closureFunction(functions);

console.log(closure())