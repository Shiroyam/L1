/**
 * Вызов функций через массив по очереди
 * @param {Array.<Function>} arr
 * @returns {void}
 */
function callFunctions(arr) {
  arr.forEach((func, index) => {
    console.log(`Вызов функции ${index}`)
    func()
  });  
}

function func1() {
  return console.log("Конец функции 0");
}

function func2() {
  return console.log("Конец функции 1");
}

function func3() {
  return console.log("Конец функции 2");
}

const functions = [func1, func2, func3];


callFunctions(functions);