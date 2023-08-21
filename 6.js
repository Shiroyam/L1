/**
 * Быстрая сортировка
 * @param {array} arr
 * @returns {array}
 */
function sortObject(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  //середина массива, с помощью этого объекта будем сравнивать
  const pivot = arr[Math.floor(arr.length / 2)];
  //начало
  const left = [];
  //конец
  const right = [];
  //используется для хранения элементов, равных пивоту, из исходного массива
  const equal = [];

  arr.forEach((obj) => {
    if (obj.age < pivot.age) {
      return left.push(obj);
    }

    if (obj.age > pivot.age) {
      return right.push(obj);
    }

    if (obj.name < pivot.name) {
      return left.push(obj);
    }

    if (obj.name > pivot.name) {
      return right.push(obj);
    }  

    return equal.push(obj);
  });
    
  //рекурсивно сортируем еще массивы по отдельности и соединяем их.
  return [...sortObject(left), ...equal, ...sortObject(right)];
}

/**
 * Встроенные методы
 * @param {array} arr
 * @returns {array}
 */
function sortObjectJsMethod(arr) {
  //без мутаций
  const newArr = arr;

  newArr.sort((a, b) => {
    if (a.age === b.age) {
      return a.name.localeCompare(b.name);
    } 

    return a.age - b.age;
  });

  return newArr;
}

const array = [
  { name: "Semyon", age: 30 },
  { name: "Artem", age: 35 },
  { name: "Dmitry", age: 25 },
  { name: "Max", age: 25 },
];

console.log(sortObject(array));
console.log(sortObjectJsMethod(array));
