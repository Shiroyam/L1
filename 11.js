function counter(number) {
  return function increment() {
    // функция increment имеет доступ к внешней переменой number объявленной в функции counter
    return number++
  }
}

const increment = new counter(0);
const increment1 = new counter(5);

console.log(increment())
console.log(increment1())
console.log(increment())
console.log(increment1())
console.log(increment())
console.log(increment1())
console.log(increment())
console.log(increment1())


