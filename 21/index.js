function calculateCallStackSize() {
  let callCount = 0;

  function callFunction() {
    callCount++;
    callFunction();
  }

  try {
    callFunction();
  } catch (error) {
    console.log(error);
    console.log(`${callCount} раз calculateCallStackSize2`);
  }
}

function calculateCallStackSize2() {
  let callCount = 0;

  function callFunction() {
    callCount++;
    let i = 1;
    callFunction();
  }

  try {
    callFunction();
  } catch (error) {
    console.log(error);
    console.log(`${callCount} раз calculateCallStackSize2`);
  }
}

calculateCallStackSize2();
calculateCallStackSize();

// За основу была взята это статья: https://habr.com/ru/articles/550534/
// calculateCallStackSize
// Goggle - 13935 вызовов
// Opera - 13935 вызовов
// Firefox - 31241 вызовов

// calculateCallStackSize2
// Goggle - 12541 вызовов
// Opera - 12541 вызовов
// Firefox - 27865 вызовов

// На переполнение стека влияет затраченная память, а не просто количество вызванных функций.
// Эти слова доказывает пример calculateCallStackSize2() calculateCallStackSize() у них разный максимум 
// вызовов,так как в calculateCallStackSize2() мы объявляем переменную и памяти используется больше, следовательно
// вызовов меньше.

// Теперь можно понять, что размер функции зависит от размера переменных:
// varCount * varSize

// Но также функция при вызови создает Execution Context, который тоже весит. Получаем следующие:
// FunctionSize = varCount * varSize + ExecutionContextSize

// Теперь чтобы вычислить объем стека нужно еще умножить на количество вызовов:
// CallStackSize = FunctionSize * CallCount

// Так как размер ExecutionContextSize не известен, можно попробовать вычислить его из этого равенства:
// FunctionSize * CallCount = FunctionSize2 * CallCount или varCount * varSize + ExecutionContextSize = varCount1 * varSize + ExecutionContextSize
// (0 + ExecutionContextSize) * 13935 = (8 + ExecutionContextSize) * 12541
// ExecutionContextSize * 13935 = ExecutionContextSize * 12541 + 8 * 12541
// ExecutionContextSize * 13935 = ExecutionContextSize * 12541 + 8 * 12541
// ExecutionContextSize * 13935 = ExecutionContextSize * 12541 + 100328
// ExecutionContextSize * 13935 - ExecutionContextSize * 12541 = 100328
// 1394ExecutionContextSize = 100328
// ExecutionContextSize = 100328 / 1394 => 71.97...

// Теперь высчитаем сам размер первой функции:
// FunctionSize = 0 + 71.97 => 71.97 
// И тогда можно вычислить общий объем:
// CallStackSize = 71.9 * 13935 => 1001926,5byte ≈ 1mb для Goggle и Opera
// CallStackSizeFireFox = 71.9 * 31241 => 2246227,9byte ≈ 2.2mb для FireFox

//Итог:
// Call Stack Size для Google и Opera ≈ 1mb 
// Call Stack Size для FireFox ≈ 2.2mb